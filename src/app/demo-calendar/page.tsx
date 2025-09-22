'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LINE_PRICING_PLANS,
  calculateMonthlyCost,
  suggestOptimalPlan,
  calculateMessageCount,
  type LinePricingPlan
} from '@/lib/line-pricing'

interface DeliveryEvent {
  id: string
  title: string
  date: string
  time: string
  type: 'promotion' | 'reminder' | 'announcement' | 'follow-up'
  status: 'scheduled' | 'sent' | 'cancelled'
  recipients: number
  messageCount: number // 実際のLINE配信通数
}

interface MonthlyStats {
  totalDeliveries: number
  totalCost: number
  totalRecipients: number
  avgOpenRate: number
}

export default function DemoCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentPlan, setCurrentPlan] = useState<LinePricingPlan>(LINE_PRICING_PLANS[1]) // ライトプラン
  const [friendsCount, setFriendsCount] = useState(1200) // 友だち数
  const [frequencyLimit, setFrequencyLimit] = useState({ weekly: 3, monthly: 12 }) // 頻度制限

  // デモ用配信データ
  const [deliveryEvents] = useState<DeliveryEvent[]>([
    {
      id: '1',
      title: '新商品キャンペーン',
      date: '2024-01-15',
      time: '10:00',
      type: 'promotion',
      status: 'sent',
      recipients: 800,
      messageCount: calculateMessageCount(800, 1)
    },
    {
      id: '2',
      title: 'メンテナンス通知',
      date: '2024-01-18',
      time: '18:00',
      type: 'reminder',
      status: 'sent',
      recipients: 300,
      messageCount: calculateMessageCount(300, 1)
    },
    {
      id: '3',
      title: '月末セール告知',
      date: '2024-01-25',
      time: '09:00',
      type: 'announcement',
      status: 'scheduled',
      recipients: 1200,
      messageCount: calculateMessageCount(1200, 1)
    },
    {
      id: '4',
      title: 'フォローアップメッセージ',
      date: '2024-01-22',
      time: '15:00',
      type: 'follow-up',
      status: 'scheduled',
      recipients: 500,
      messageCount: calculateMessageCount(500, 1)
    },
    {
      id: '5',
      title: 'バレンタインフェア',
      date: '2024-01-30',
      time: '11:00',
      type: 'promotion',
      status: 'scheduled',
      recipients: 1500,
      messageCount: calculateMessageCount(1500, 1)
    }
  ])

  // 月間統計計算
  const calculateMonthlyStats = (): MonthlyStats => {
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const monthlyEvents = deliveryEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
    })

    const sentEvents = monthlyEvents.filter(event => event.status === 'sent')
    const totalMessages = monthlyEvents.reduce((sum, event) => sum + event.messageCount, 0)

    // LINE料金計算
    const costCalculation = calculateMonthlyCost(totalMessages, currentPlan)

    return {
      totalDeliveries: monthlyEvents.length,
      totalCost: costCalculation.totalCost,
      totalRecipients: monthlyEvents.reduce((sum, event) => sum + event.recipients, 0),
      avgOpenRate: sentEvents.length > 0 ? 67.5 : 0 // 仮の開封率
    }
  }

  // カレンダー生成
  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDateStr = new Date()

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const dateStr = date.toISOString().split('T')[0]
      const dayEvents = deliveryEvents.filter(event => event.date === dateStr)
      const isCurrentMonth = date.getMonth() === month
      const isToday = date.toDateString() === currentDateStr.toDateString()

      days.push({
        date: date.getDate(),
        dateStr,
        isCurrentMonth,
        isToday,
        events: dayEvents
      })
    }

    return days
  }

  const monthlyStats = calculateMonthlyStats()
  const totalMessages = deliveryEvents.reduce((sum, event) => sum + event.messageCount, 0)
  const optimalPlanSuggestion = suggestOptimalPlan(totalMessages)
  const currentCostCalculation = calculateMonthlyCost(totalMessages, currentPlan)
  const weeklyDeliveryCount = 2 // 今週の配信数（仮）

  const getEventTypeColor = (type: string) => {
    const colors = {
      promotion: 'bg-blue-500',
      reminder: 'bg-orange-500',
      announcement: 'bg-purple-500',
      'follow-up': 'bg-pink-500'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-500'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'border-blue-300 bg-blue-50',
      sent: 'border-green-300 bg-green-50',
      cancelled: 'border-red-300 bg-red-50'
    }
    return colors[status as keyof typeof colors] || 'border-gray-300 bg-gray-50'
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <span className="font-bold text-xl">L</span>
            </div>
            <div className="ml-3">
              <h1 className="text-3xl font-bold text-gray-900">L-CORE</h1>
              <p className="text-gray-600">LINE Marketing Automation Platform</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            📅 配信カレンダー & 制限管理
          </h2>
          <p className="text-gray-600">配信スケジュール、頻度制限、予算管理を一元管理</p>
        </div>

        {/* ナビゲーションリンク */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Link href="/demo-schedule" className="text-blue-600 hover:text-blue-800">📅 スケジュール管理</Link>
          <Link href="/demo-editable" className="text-blue-600 hover:text-blue-800">📝 ペルソナ編集</Link>
          <Link href="/demo" className="text-blue-600 hover:text-blue-800">← 基本デモに戻る</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* メインカレンダー */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">

              {/* カレンダーヘッダー */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ←
                </button>
                <h3 className="text-xl font-semibold">
                  {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  →
                </button>
              </div>

              {/* 曜日ヘッダー */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* カレンダー本体 */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendar().map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      !day.isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''
                    } ${day.isToday ? 'bg-blue-50 border-blue-300' : ''}`}
                    onClick={() => setSelectedDate(day.dateStr)}
                  >
                    <div className="text-sm font-medium mb-1">{day.date}</div>
                    <div className="space-y-1">
                      {day.events.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate ${getStatusColor(event.status)}`}
                          title={event.title}
                        >
                          <div className={`w-2 h-2 rounded-full inline-block mr-1 ${getEventTypeColor(event.type)}`}></div>
                          {event.title}
                        </div>
                      ))}
                      {day.events.length > 3 && (
                        <div className="text-xs text-gray-500">+{day.events.length - 3}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* サイドバー：統計と制限 */}
          <div className="space-y-6">

            {/* 月間統計 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">📊 今月の統計</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">配信回数</span>
                  <span className="font-medium">{monthlyStats.totalDeliveries}回</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">LINE配信通数</span>
                  <span className="font-medium">{totalMessages.toLocaleString()}通</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">配信コスト</span>
                  <span className="font-medium">¥{monthlyStats.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">総受信者数</span>
                  <span className="font-medium">{monthlyStats.totalRecipients.toLocaleString()}人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">平均開封率</span>
                  <span className="font-medium">{monthlyStats.avgOpenRate}%</span>
                </div>
              </div>
            </div>

            {/* LINE料金プラン管理 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">💰 LINE料金プラン</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    現在のプラン
                  </label>
                  <select
                    value={currentPlan.id}
                    onChange={(e) => {
                      const plan = LINE_PRICING_PLANS.find(p => p.id === e.target.value)
                      if (plan) setCurrentPlan(plan)
                    }}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    {LINE_PRICING_PLANS.map(plan => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} (¥{plan.monthlyFee.toLocaleString()}/月)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <div><strong>基本料金:</strong> ¥{currentCostCalculation.baseCost.toLocaleString()}</div>
                    <div><strong>追加料金:</strong> ¥{currentCostCalculation.additionalCost.toLocaleString()}</div>
                    <div className="font-bold"><strong>月額合計:</strong> ¥{currentCostCalculation.totalCost.toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>メッセージ使用量</span>
                    <span className={currentCostCalculation.messagesUsed > currentCostCalculation.messagesIncluded ? 'text-red-600 font-bold' : 'text-gray-600'}>
                      {currentCostCalculation.messagesUsed.toLocaleString()}/{currentCostCalculation.messagesIncluded.toLocaleString()}通
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        currentCostCalculation.messagesUsed > currentCostCalculation.messagesIncluded ? 'bg-red-500' :
                        (currentCostCalculation.messagesUsed / currentCostCalculation.messagesIncluded) > 0.8 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((currentCostCalculation.messagesUsed / currentCostCalculation.messagesIncluded) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {currentCostCalculation.warning && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm text-yellow-800">
                      ⚠️ {currentCostCalculation.warning}
                    </div>
                  </div>
                )}

                {optimalPlanSuggestion.suggested.id !== currentPlan.id && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      💡 <strong>プラン提案:</strong> {optimalPlanSuggestion.suggested.name}がおすすめです<br />
                      {optimalPlanSuggestion.reasoning}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 頻度制限 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🔄 頻度制限</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>今週の配信</span>
                    <span className={weeklyDeliveryCount >= frequencyLimit.weekly ? 'text-red-600 font-bold' : 'text-gray-600'}>
                      {weeklyDeliveryCount}/{frequencyLimit.weekly}通
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        weeklyDeliveryCount >= frequencyLimit.weekly ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(weeklyDeliveryCount / frequencyLimit.weekly) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>今月の配信</span>
                    <span className={monthlyStats.totalDeliveries >= frequencyLimit.monthly ? 'text-red-600 font-bold' : 'text-gray-600'}>
                      {monthlyStats.totalDeliveries}/{frequencyLimit.monthly}通
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        monthlyStats.totalDeliveries >= frequencyLimit.monthly ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(monthlyStats.totalDeliveries / frequencyLimit.monthly) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {(weeklyDeliveryCount >= frequencyLimit.weekly || monthlyStats.totalDeliveries >= frequencyLimit.monthly) && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-sm text-red-800">
                      🚫 配信頻度制限に達しています
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* アカウント設定 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">⚙️ アカウント設定</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    友だち数
                  </label>
                  <input
                    type="number"
                    value={friendsCount}
                    onChange={(e) => setFriendsCount(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    配信コストに直接影響します
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    週間配信上限
                  </label>
                  <input
                    type="number"
                    value={frequencyLimit.weekly}
                    onChange={(e) => setFrequencyLimit({...frequencyLimit, weekly: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    月間配信上限
                  </label>
                  <input
                    type="number"
                    value={frequencyLimit.monthly}
                    onChange={(e) => setFrequencyLimit({...frequencyLimit, monthly: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 選択日の詳細 */}
        {selectedDate && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              📅 {selectedDate} の配信予定
            </h3>
            <div className="space-y-3">
              {deliveryEvents
                .filter(event => event.date === selectedDate)
                .map(event => (
                  <div key={event.id} className={`p-4 rounded-lg border-2 ${getStatusColor(event.status)}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600">
                          {event.time} | {event.recipients}人に配信 | {event.messageCount}通
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)} text-white`}>
                          {event.type === 'promotion' ? 'プロモーション' :
                           event.type === 'reminder' ? 'リマインド' :
                           event.type === 'announcement' ? 'お知らせ' : 'フォローアップ'}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded border ${
                          event.status === 'sent' ? 'bg-green-100 text-green-800 border-green-300' :
                          event.status === 'scheduled' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          'bg-red-100 text-red-800 border-red-300'
                        }`}>
                          {event.status === 'sent' ? '配信済み' :
                           event.status === 'scheduled' ? '配信予定' : 'キャンセル'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              }
              {deliveryEvents.filter(event => event.date === selectedDate).length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  この日の配信予定はありません
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}