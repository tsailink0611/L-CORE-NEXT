'use client'

import { useState } from 'react'
import Link from 'next/link'
import PersonaSelector from '../demo-advanced/components/PersonaSelector'
import { PersonaTemplate } from '@/lib/persona-templates'

export default function DemoHierarchicalPage() {
  const [demoMessage, setDemoMessage] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<PersonaTemplate | null>(null)

  const generatePersonaPrompt = () => {
    if (!selectedTemplate) return prompt

    const personaContext = `
【ビジネス情報】
業種: ${selectedTemplate.businessType}
業態: ${selectedTemplate.businessSubType}
店舗名: ${selectedTemplate.businessName || '当店'}
立地: ${selectedTemplate.location}
価格帯: ${selectedTemplate.priceRange}
雰囲気: ${selectedTemplate.atmosphere}
規模: ${selectedTemplate.capacity}
ターゲット顧客: ${selectedTemplate.targetCustomer}
特徴・強み: ${selectedTemplate.specialFeatures}
タグ: ${selectedTemplate.tags.join(', ')}

あなたは上記の${selectedTemplate.businessType}の専門マーケティングディレクターです。
この店舗の特徴を活かし、ターゲット顧客に響くLINEマーケティングメッセージを作成してください。
業態（${selectedTemplate.businessSubType}）の特性を活かした具体的で効果的な提案をしてください。

お客様のリクエスト: ${prompt}
`
    return personaContext
  }

  const generateAIMessage = async () => {
    if (!prompt.trim()) {
      alert('プロンプトを入力してください')
      return
    }

    if (!selectedTemplate) {
      alert('ペルソナテンプレートを選択してください')
      return
    }

    try {
      setLoading(true)

      const finalPrompt = generatePersonaPrompt()

      const response = await fetch('/api/test-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt })
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
    '季節限定メニューの紹介',
    'セール情報のお知らせ',
    '友達紹介キャンペーン',
    '予約促進メッセージ',
    'リピーター向け特典案内',
    '新規開店のお知らせ',
    'イベント・企画の告知',
    'お客様の声・レビュー紹介'
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <span className="font-bold text-xl">L</span>
            </div>
            <h1 className="ml-3 text-3xl font-bold text-gray-900">
              L-Core 階層的ペルソナシステム
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            🎯 業種→業態→規模の3段階選択で最適なペルソナを見つけよう
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            💡 <strong>数百のテンプレート</strong>から最適なビジネスペルソナを階層的に選択できます
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 左カラム: ペルソナ選択 */}
          <div className="lg:col-span-1">
            <PersonaSelector
              onSelectTemplate={(template) => setSelectedTemplate(template)}
            />
          </div>

          {/* 中央・右カラム: 選択されたペルソナとメッセージ生成 */}
          <div className="lg:col-span-2 space-y-6">

            {/* 選択されたペルソナ表示 */}
            {selectedTemplate && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">
                  ✅ 選択されたペルソナ
                </h2>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {selectedTemplate.businessType}
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {selectedTemplate.category}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {selectedTemplate.priceRange}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div><strong>業態:</strong> {selectedTemplate.businessSubType}</div>
                    <div><strong>立地:</strong> {selectedTemplate.location}</div>
                    <div><strong>規模:</strong> {selectedTemplate.capacity}</div>
                    <div><strong>客層:</strong> {selectedTemplate.targetCustomer}</div>
                  </div>

                  <div className="text-sm mb-3">
                    <strong>雰囲気:</strong> {selectedTemplate.atmosphere}
                  </div>

                  <div className="text-sm mb-3">
                    <strong>特徴:</strong> {selectedTemplate.specialFeatures}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {selectedTemplate.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  🔄 他のペルソナを選択
                </button>
              </div>
            )}

            {/* AIメッセージ生成フォーム */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                ✨ 専用AIメッセージ生成
                {selectedTemplate && (
                  <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {selectedTemplate.businessType}専用
                  </span>
                )}
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  マーケティングメッセージのリクエスト
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={selectedTemplate
                    ? `${selectedTemplate.businessType}向けのマーケティングメッセージをリクエストしてください`
                    : "まずペルソナを選択してください"
                  }
                  rows={3}
                  disabled={!selectedTemplate}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              {/* サンプルプロンプト */}
              {selectedTemplate && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">サンプルリクエスト：</p>
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
              )}

              <button
                onClick={generateAIMessage}
                disabled={loading || !selectedTemplate || !prompt.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? '🤖 AI生成中...' :
                  selectedTemplate ? '🚀 専用AIメッセージを生成' : '⚠️ ペルソナを選択してください'
                }
              </button>
            </div>

            {/* 生成結果 */}
            {demoMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  ✅ 生成された専用メッセージ
                  <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {selectedTemplate?.businessType}専用AI
                  </span>
                </h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-800 whitespace-pre-wrap">{demoMessage}</p>
                </div>
                <div className="mt-3 text-sm text-green-600">
                  💡 このメッセージは{selectedTemplate?.businessType}（{selectedTemplate?.businessSubType}）の特性を活かしたChatGPT-5 miniによって生成されました
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="text-center space-x-4 mt-12">
          <Link
            href="/demo"
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← シンプル版
          </Link>
          <Link
            href="/demo-advanced"
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            カスタム版
          </Link>
          <Link
            href="/"
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ホームに戻る
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