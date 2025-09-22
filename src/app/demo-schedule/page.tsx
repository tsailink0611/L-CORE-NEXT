'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ScheduledMessage {
  id: string
  title: string
  content: string
  scheduledTime: string
  frequency: 'once' | 'daily' | 'weekly' | 'monthly'
  status: 'active' | 'paused' | 'completed'
  targetAudience: string
  messageType: 'promotion' | 'reminder' | 'announcement' | 'follow-up'
  createdAt: string
}

export default function DemoSchedulePage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'reminder' | 'history'>('schedule')
  const [newMessage, setNewMessage] = useState({
    title: '',
    content: '',
    scheduledDate: '',
    scheduledTime: '',
    frequency: 'once' as const,
    targetAudience: 'all',
    messageType: 'promotion' as const
  })

  // デモ用のサンプルデータ
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([
    {
      id: '1',
      title: '新商品キャンペーンのお知らせ',
      content: '🎉 新商品が登場しました！期間限定で20%OFFキャンペーン実施中です。',
      scheduledTime: '2024-01-20 10:00',
      frequency: 'once',
      status: 'active',
      targetAudience: '全顧客',
      messageType: 'promotion',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: '定期メンテナンスのリマインド',
      content: '⚠️ 明日はメンテナンスのためお休みです。ご了承ください。',
      scheduledTime: '2024-01-18 18:00',
      frequency: 'weekly',
      status: 'active',
      targetAudience: 'VIP顧客',
      messageType: 'reminder',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: '月末セール告知',
      content: '🛍️ 月末セール開催！お見逃しなく！',
      scheduledTime: '2024-01-25 09:00',
      frequency: 'monthly',
      status: 'paused',
      targetAudience: '全顧客',
      messageType: 'announcement',
      createdAt: '2024-01-12'
    }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.title || !newMessage.content || !newMessage.scheduledDate || !newMessage.scheduledTime) {
      alert('すべての必須項目を入力してください。')
      return
    }

    const scheduledMessage: ScheduledMessage = {
      id: Date.now().toString(),
      title: newMessage.title,
      content: newMessage.content,
      scheduledTime: `${newMessage.scheduledDate} ${newMessage.scheduledTime}`,
      frequency: newMessage.frequency,
      status: 'active',
      targetAudience: newMessage.targetAudience,
      messageType: newMessage.messageType,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setScheduledMessages([...scheduledMessages, scheduledMessage])

    // フォームリセット
    setNewMessage({
      title: '',
      content: '',
      scheduledDate: '',
      scheduledTime: '',
      frequency: 'once',
      targetAudience: 'all',
      messageType: 'promotion'
    })

    alert('✅ メッセージをスケジュールしました！')
  }

  const toggleMessageStatus = (id: string) => {
    setScheduledMessages(messages =>
      messages.map(msg =>
        msg.id === id
          ? { ...msg, status: msg.status === 'active' ? 'paused' : 'active' }
          : msg
      )
    )
  }

  const deleteMessage = (id: string) => {
    if (confirm('このスケジュールメッセージを削除しますか？')) {
      setScheduledMessages(messages => messages.filter(msg => msg.id !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800'
    }
    return styles[status as keyof typeof styles] || styles.active
  }

  const getTypeBadge = (type: string) => {
    const styles = {
      promotion: 'bg-blue-100 text-blue-800',
      reminder: 'bg-orange-100 text-orange-800',
      announcement: 'bg-purple-100 text-purple-800',
      'follow-up': 'bg-pink-100 text-pink-800'
    }
    return styles[type as keyof typeof styles] || styles.promotion
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
            📅 メッセージスケジュール & リマインド管理
          </h2>
          <p className="text-gray-600">配信タイミングとリマインド設定を管理</p>
        </div>

        {/* ナビゲーションリンク */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Link href="/demo" className="text-blue-600 hover:text-blue-800">← 基本デモに戻る</Link>
          <Link href="/demo-editable" className="text-blue-600 hover:text-blue-800">📝 ペルソナ編集</Link>
          <Link href="/dashboard/messages" className="text-blue-600 hover:text-blue-800">💼 本格版メッセージ管理</Link>
        </div>

        {/* タブナビゲーション */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'schedule'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📅 新規スケジュール
              </button>
              <button
                onClick={() => setActiveTab('reminder')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reminder'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🔔 スケジュール一覧
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 配信履歴
              </button>
            </nav>
          </div>
        </div>

        {/* 新規スケジュール作成 */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6">📅 新規メッセージスケジュール</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メッセージタイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newMessage.title}
                    onChange={(e) => setNewMessage({...newMessage, title: e.target.value})}
                    placeholder="例: 新商品キャンペーンのお知らせ"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メッセージタイプ
                  </label>
                  <select
                    value={newMessage.messageType}
                    onChange={(e) => setNewMessage({...newMessage, messageType: e.target.value as any})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="promotion">🎉 プロモーション</option>
                    <option value="reminder">⚠️ リマインド</option>
                    <option value="announcement">📢 お知らせ</option>
                    <option value="follow-up">💌 フォローアップ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メッセージ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  rows={4}
                  placeholder="例: 🎉 新商品が登場しました！期間限定で20%OFFキャンペーン実施中です。"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配信日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newMessage.scheduledDate}
                    onChange={(e) => setNewMessage({...newMessage, scheduledDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配信時刻 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={newMessage.scheduledTime}
                    onChange={(e) => setNewMessage({...newMessage, scheduledTime: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配信頻度
                  </label>
                  <select
                    value={newMessage.frequency}
                    onChange={(e) => setNewMessage({...newMessage, frequency: e.target.value as any})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="once">一回のみ</option>
                    <option value="daily">毎日</option>
                    <option value="weekly">毎週</option>
                    <option value="monthly">毎月</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  配信対象
                </label>
                <select
                  value={newMessage.targetAudience}
                  onChange={(e) => setNewMessage({...newMessage, targetAudience: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全顧客</option>
                  <option value="vip">VIP顧客</option>
                  <option value="new">新規顧客</option>
                  <option value="returning">リピーター</option>
                  <option value="inactive">休眠顧客</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📅 スケジュール設定
                </button>
              </div>
            </form>
          </div>
        )}

        {/* スケジュール一覧 */}
        {activeTab === 'reminder' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">🔔 スケジュール済みメッセージ</h3>
              <div className="text-sm text-gray-600">
                アクティブ: {scheduledMessages.filter(m => m.status === 'active').length}件 |
                停止中: {scheduledMessages.filter(m => m.status === 'paused').length}件
              </div>
            </div>

            <div className="space-y-4">
              {scheduledMessages.map((message) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{message.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(message.status)}`}>
                        {message.status === 'active' ? '有効' : message.status === 'paused' ? '停止' : '完了'}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeBadge(message.messageType)}`}>
                        {message.messageType === 'promotion' ? 'プロモーション' :
                         message.messageType === 'reminder' ? 'リマインド' :
                         message.messageType === 'announcement' ? 'お知らせ' : 'フォローアップ'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">配信日時:</span><br />
                      {message.scheduledTime}
                    </div>
                    <div>
                      <span className="font-medium">頻度:</span><br />
                      {message.frequency === 'once' ? '一回のみ' :
                       message.frequency === 'daily' ? '毎日' :
                       message.frequency === 'weekly' ? '毎週' : '毎月'}
                    </div>
                    <div>
                      <span className="font-medium">対象:</span><br />
                      {message.targetAudience}
                    </div>
                    <div>
                      <span className="font-medium">作成日:</span><br />
                      {message.createdAt}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleMessageStatus(message.id)}
                      className={`px-3 py-1 text-sm rounded ${
                        message.status === 'active'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {message.status === 'active' ? '⏸️ 停止' : '▶️ 再開'}
                    </button>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      🗑️ 削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 配信履歴 */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6">📊 配信履歴</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">今月の配信数</h4>
                <p className="text-2xl font-bold text-blue-600">127件</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">開封率</h4>
                <p className="text-2xl font-bold text-green-600">68.5%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900">クリック率</h4>
                <p className="text-2xl font-bold text-purple-600">12.3%</p>
              </div>
            </div>

            <div className="text-center text-gray-500 py-8">
              📈 詳細な配信履歴とアナリティクスは開発中です
            </div>
          </div>
        )}

      </div>
    </div>
  )
}