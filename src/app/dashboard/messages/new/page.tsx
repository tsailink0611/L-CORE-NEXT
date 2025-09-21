'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NewMessagePage() {
  const [messageType, setMessageType] = useState('text')
  const [recipient, setRecipient] = useState('all')
  const [content, setContent] = useState('')
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [scheduleType, setScheduleType] = useState('now')

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return
    
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `AI生成メッセージ（プロンプト：「${aiPrompt}」）

こんにちは！このメッセージがお客様にとって有益であることを願っています。

お客様のプロンプトに基づいて、効果的なエンゲージメントを目指したパーソナライズされたメッセージを作成しました。このコンテンツはLINEメッセージ形式に最適化されており、明確なコールトゥアクション要素が含まれています。

このメッセージの主な特徴：
• パーソナライズされた挨拶
• 明確な価値提案
• 魅力的なコールトゥアクション
• プロフェッショナルなトーン

L-CoreのAIメッセージ生成機能をご利用いただき、ありがとうございます！`
      
      setContent(generatedContent)
      setIsGenerating(false)
    }, 2000)
  }

  const handlePreview = () => {
    // Preview functionality
    console.log('メッセージプレビュー:', { messageType, recipient, content, scheduleType })
  }

  const handleSend = () => {
    // Send functionality
    console.log('メッセージ送信:', { messageType, recipient, content, scheduleType })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <Link href="/dashboard" className="hover:text-gray-700">ダッシュボード</Link>
              <span>/</span>
              <Link href="/dashboard/messages" className="hover:text-gray-700">メッセージ</Link>
              <span>/</span>
              <span>新規メッセージ</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">新規メッセージ作成</h1>
            <p className="text-gray-600 mt-2">AI支援で魅力的なLINEメッセージを作成</p>
          </div>
          <Link
            href="/dashboard/messages"
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">メッセージ詳細</h2>
              
              {/* Message Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">メッセージタイプ</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setMessageType('text')}
                    className={`px-4 py-2 rounded-lg border ${messageType === 'text' 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      テキストメッセージ
                    </div>
                  </button>
                  <button
                    onClick={() => setMessageType('rich')}
                    className={`px-4 py-2 rounded-lg border ${messageType === 'rich' 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      リッチメッセージ
                    </div>
                  </button>
                </div>
              </div>

              {/* Recipients */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">受信者</label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">全ユーザー (8,942名)</option>
                  <option value="active">アクティブユーザー (6,234名)</option>
                  <option value="premium">プレミアムユーザー (1,456名)</option>
                  <option value="new">新規ユーザー (892名)</option>
                  <option value="custom">カスタムセグメント</option>
                </select>
              </div>

              {/* AI Generation Section */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-medium text-blue-900 mb-3">
                  🤖 AIメッセージ生成
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">
                      メッセージの目的を説明してください
                    </label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="例：新規ユーザー向けのウェルカムメッセージで、プレミアム機能について説明する..."
                      className="w-full border border-blue-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleAIGenerate}
                    disabled={!aiPrompt.trim() || isGenerating}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed inline-flex items-center"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        生成中...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        AIで生成
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">メッセージ内容</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="ここにメッセージ内容を入力してください..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-40 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{content.length} 文字</span>
                  <span>最大: 5000文字</span>
                </div>
              </div>

              {/* Scheduling */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">配信</label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="now"
                      value="now"
                      checked={scheduleType === 'now'}
                      onChange={(e) => setScheduleType(e.target.value)}
                      className="mr-3"
                    />
                    <label htmlFor="now" className="text-gray-700">すぐに送信</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="schedule"
                      value="schedule"
                      checked={scheduleType === 'schedule'}
                      onChange={(e) => setScheduleType(e.target.value)}
                      className="mr-3"
                    />
                    <label htmlFor="schedule" className="text-gray-700">後で送信</label>
                  </div>
                  {scheduleType === 'schedule' && (
                    <div className="ml-6 grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="time"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handlePreview}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700"
                >
                  プレビュー
                </button>
                <button
                  onClick={handleSend}
                  disabled={!content.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {scheduleType === 'now' ? 'メッセージ送信' : 'メッセージをスケジュール'}
                </button>
                <Link
                  href="/dashboard/messages"
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50"
                >
                  キャンセル
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Message Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ライブプレビュー</h3>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                {content ? (
                  <div className="space-y-3">
                    <div className="bg-green-500 text-white p-3 rounded-lg max-w-xs">
                      <p className="text-sm whitespace-pre-wrap">{content}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date().toLocaleTimeString('ja-JP')} に配信
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">メッセージプレビューがここに表示されます...</p>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 メッセージのコツ</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  メッセージは簡潔で魅力的に
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  明確なコールトゥアクションを含める
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  絵文字は強調のため控えめに使用
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  異なるユーザーセグメントでテスト
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  スケジュール時はタイムゾーンを考慮
                </li>
              </ul>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI提案</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="font-medium text-blue-900 text-sm">ウェルカムメッセージ</p>
                  <p className="text-blue-700 text-xs">オンボーディングコンテンツを生成</p>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <p className="font-medium text-purple-900 text-sm">プロモーションキャンペーン</p>
                  <p className="text-purple-700 text-xs">マーケティングコンテンツを作成</p>
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <p className="font-medium text-green-900 text-sm">サポート応答</p>
                  <p className="text-green-700 text-xs">ヘルプコンテンツを生成</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}