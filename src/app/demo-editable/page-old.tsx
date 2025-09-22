'use client'

import { useState } from 'react'
import Link from 'next/link'
import PersonaSelector from '../demo-advanced/components/PersonaSelector'
import { PersonaTemplate } from '@/lib/persona-templates'

interface EditablePersona {
  businessType: string
  businessName: string
  location: string
  priceRange: string
  atmosphere: string
  capacity: string
  targetCustomer: string
  specialFeatures: string
  sourceTemplate?: string
}

export default function DemoEditablePage() {
  const [demoMessage, setDemoMessage] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [persona, setPersona] = useState<EditablePersona>({
    businessType: '',
    businessName: '',
    location: '',
    priceRange: '',
    atmosphere: '',
    capacity: '',
    targetCustomer: '',
    specialFeatures: '',
    sourceTemplate: ''
  })
  const [isTemplateSelected, setIsTemplateSelected] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(true)

  const loadTemplate = (template: PersonaTemplate) => {
    setPersona({
      businessType: template.businessType,
      businessName: template.businessName,
      location: template.location,
      priceRange: template.priceRange,
      atmosphere: template.atmosphere,
      capacity: template.capacity,
      targetCustomer: template.targetCustomer,
      specialFeatures: template.specialFeatures,
      sourceTemplate: `${template.businessType} (${template.businessSubType})`
    })
    setIsTemplateSelected(true)
    setShowTemplateSelector(false)
  }

  const resetPersona = () => {
    setPersona({
      businessType: '',
      businessName: '',
      location: '',
      priceRange: '',
      atmosphere: '',
      capacity: '',
      targetCustomer: '',
      specialFeatures: '',
      sourceTemplate: ''
    })
    setIsTemplateSelected(false)
    setShowTemplateSelector(true)
    setDemoMessage('')
  }

  const generatePersonaPrompt = () => {
    const personaContext = `
【ビジネス情報】
業種: ${persona.businessType}
店舗名: ${persona.businessName || '当店'}
立地: ${persona.location}
価格帯: ${persona.priceRange}
雰囲気: ${persona.atmosphere}
規模: ${persona.capacity}
ターゲット顧客: ${persona.targetCustomer}
特徴・強み: ${persona.specialFeatures}

あなたは上記の${persona.businessType}の専門マーケティングディレクターです。
この店舗の特徴を活かし、ターゲット顧客に響くLINEマーケティングメッセージを作成してください。

お客様のリクエスト: ${prompt}
`
    return personaContext
  }

  const generateAIMessage = async () => {
    if (!prompt.trim()) {
      alert('プロンプトを入力してください')
      return
    }

    if (!persona.businessType.trim()) {
      alert('業種を入力してください')
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
              L-Core カスタマイズ可能ペルソナ
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            🎯 テンプレート選択後、全項目を自由にカスタマイズ可能
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            💡 <strong>階層選択でテンプレート取得</strong> → <strong>各項目を自由編集</strong> → <strong>専用AI生成</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 左カラム: テンプレート選択または編集済みペルソナ表示 */}
          <div className="lg:col-span-1">
            {showTemplateSelector ? (
              <PersonaSelector
                onSelectTemplate={loadTemplate}
              />
            ) : (
              /* 編集済みペルソナ表示 */
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">🎭 選択ペルソナ</h2>
                  <button
                    onClick={() => setShowTemplateSelector(true)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    🔄 他を選択
                  </button>
                </div>

                {persona.sourceTemplate && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
                    <div className="text-sm text-green-800">
                      📋 ベーステンプレート: <strong>{persona.sourceTemplate}</strong>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      以下の項目をカスタマイズできます ↓
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div><strong>業種:</strong> {persona.businessType}</div>
                    <div><strong>店舗名:</strong> {persona.businessName || '未設定'}</div>
                    <div><strong>立地:</strong> {persona.location}</div>
                    <div><strong>価格帯:</strong> {persona.priceRange}</div>
                    <div><strong>規模:</strong> {persona.capacity}</div>
                    <div><strong>客層:</strong> {persona.targetCustomer}</div>
                    <div><strong>雰囲気:</strong> {persona.atmosphere}</div>
                    <div><strong>特徴:</strong> {persona.specialFeatures}</div>
                  </div>
                </div>

                <button
                  onClick={resetPersona}
                  className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800"
                >
                  🗑️ ペルソナをリセット
                </button>
              </div>
            )}
          </div>

          {/* 中央・右カラム: ペルソナ編集とメッセージ生成 */}
          <div className="lg:col-span-2 space-y-6">

            {/* ペルソナ編集フォーム */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  ✏️ ペルソナ編集
                  {isTemplateSelected && (
                    <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      テンプレート適用済み
                    </span>
                  )}
                </h2>
                {!showTemplateSelector && (
                  <button
                    onClick={() => setShowTemplateSelector(true)}
                    className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
                  >
                    📋 別のテンプレートを選択
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    業種 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={persona.businessType}
                    onChange={(e) => setPersona({...persona, businessType: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="例: 焼肉居酒屋"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">店舗名</label>
                  <input
                    type="text"
                    value={persona.businessName}
                    onChange={(e) => setPersona({...persona, businessName: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="例: 肉バル YAMATO"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">立地</label>
                  <input
                    type="text"
                    value={persona.location}
                    onChange={(e) => setPersona({...persona, location: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="例: 都心、住宅街、駅前"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">価格帯</label>
                  <input
                    type="text"
                    value={persona.priceRange}
                    onChange={(e) => setPersona({...persona, priceRange: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="例: 客単価4000円"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">規模・キャパシティ</label>
                  <input
                    type="text"
                    value={persona.capacity}
                    onChange={(e) => setPersona({...persona, capacity: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="例: 55席、24時間営業"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ターゲット顧客</label>
                  <input
                    type="text"
                    value={persona.targetCustomer}
                    onChange={(e) => setPersona({...persona, targetCustomer: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="例: 20-40代のサラリーマン・OL"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">雰囲気・コンセプト</label>
                  <input
                    type="text"
                    value={persona.atmosphere}
                    onChange={(e) => setPersona({...persona, atmosphere: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="例: モダンで家庭的な雰囲気"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">特徴・強み</label>
                  <textarea
                    value={persona.specialFeatures}
                    onChange={(e) => setPersona({...persona, specialFeatures: e.target.value})}
                    rows={2}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="例: A5ランクの国産牛、手作りタレ、カウンター席あり"
                  />
                </div>
              </div>
            </div>

            {/* AIメッセージ生成フォーム */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                ✨ カスタムペルソナAIメッセージ生成
                {persona.businessType && (
                  <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {persona.businessType}専用
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
                  placeholder={persona.businessType
                    ? `${persona.businessType}向けのマーケティングメッセージをリクエストしてください`
                    : "業種を入力してからリクエストしてください"
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* サンプルプロンプト */}
              {persona.businessType && (
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
                disabled={loading || !persona.businessType.trim() || !prompt.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? '🤖 AI生成中...' :
                  persona.businessType ? '🚀 カスタムペルソナAIメッセージを生成' : '⚠️ 業種を入力してください'
                }
              </button>
            </div>

            {/* 生成結果 */}
            {demoMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  ✅ 生成されたカスタムメッセージ
                  <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {persona.businessType}専用AI
                  </span>
                </h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-800 whitespace-pre-wrap">{demoMessage}</p>
                </div>
                <div className="mt-3 text-sm text-green-600">
                  💡 このメッセージは
                  {persona.sourceTemplate ? ` ${persona.sourceTemplate}をベースにカスタマイズした` : 'カスタマイズした'}
                  ペルソナを適用したChatGPT-5 miniによって生成されました
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
            href="/demo-hierarchical"
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            階層選択版
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