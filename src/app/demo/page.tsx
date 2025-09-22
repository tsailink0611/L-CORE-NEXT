'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [demoMessage, setDemoMessage] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const generateAIMessage = async () => {
    if (!prompt.trim()) {
      alert('プロンプトを入力してください')
      return
    }

    try {
      setLoading(true)

      const response = await fetch('/api/test-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()

      if (data.success) {
        setDemoMessage(data.message)
      } else {
        alert('AIメッセージ生成に失敗しました: ' + data.error)
      }
    } catch (error) {
      console.error('AI API Error:', error)
      alert('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const samplePrompts = [
    '新商品キャンペーンのお知らせ',
    'お客様への感謝メッセージ',
    'L-Coreの新機能紹介',
    'セール情報のお知らせ',
    '友達紹介キャンペーン'
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <span className="font-bold text-xl">L</span>
            </div>
            <h1 className="ml-3 text-3xl font-bold text-gray-900">L-Core AI Demo</h1>
          </div>
          <p className="text-lg text-gray-600">
            🤖 ChatGPT-5 mini でAIマーケティングメッセージ生成デモ
          </p>
          <p className="text-sm text-blue-600 mt-2">
            認証なしでAI機能をテストできます
          </p>
        </div>

        {/* AI生成フォーム */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">✨ AIメッセージ生成</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              プロンプト（どんなメッセージを作りたいですか？）
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例：新商品のキャンペーンをお知らせする親しみやすいLINEメッセージを作成してください"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* サンプルプロンプト */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">サンプルプロンプト：</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(sample + 'の親しみやすいLINEメッセージを作成してください')}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateAIMessage}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? '🤖 AI生成中...' : '🚀 AIメッセージを生成'}
          </button>
        </div>

        {/* 生成結果 */}
        {demoMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              ✅ 生成されたメッセージ
            </h3>
            <div className="bg-white p-4 rounded border">
              <p className="text-gray-800 whitespace-pre-wrap">{demoMessage}</p>
            </div>
            <div className="mt-3 text-sm text-green-600">
              💡 このメッセージはChatGPT-5 miniによって生成されました
            </div>
          </div>
        )}

        {/* ナビゲーション */}
        <div className="text-center space-x-4">
          <Link
            href="/"
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← ホームに戻る
          </Link>
          <Link
            href="/auth/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            完全版にログイン →
          </Link>
        </div>

      </div>
    </div>
  )
}