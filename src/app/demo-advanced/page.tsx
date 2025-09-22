'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DemoAdvancedPage() {
  const [demoMessage, setDemoMessage] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [usePersona, setUsePersona] = useState(false)

  const [persona, setPersona] = useState({
    businessType: '焼肉居酒屋',
    businessName: '',
    location: '都心',
    priceRange: '客単価4000円',
    atmosphere: 'モダンで家庭的な雰囲気',
    capacity: '55席',
    targetCustomer: '20-40代のサラリーマン・OL',
    specialFeatures: 'A5ランクの国産牛、手作りタレ、カウンター席あり'
  })

  // 業種別テンプレート
  const businessTemplates = {
    '焼肉居酒屋': {
      businessType: '焼肉居酒屋',
      location: '都心',
      priceRange: '客単価4000円',
      atmosphere: 'モダンで家庭的な雰囲気',
      capacity: '55席',
      targetCustomer: '20-40代のサラリーマン・OL',
      specialFeatures: 'A5ランクの国産牛、手作りタレ、カウンター席あり'
    },
    'カフェ': {
      businessType: 'カフェ',
      location: '住宅街',
      priceRange: '客単価800円',
      atmosphere: 'おしゃれで落ち着いた空間',
      capacity: '30席',
      targetCustomer: '20-30代の女性、学生',
      specialFeatures: '自家焙煎コーヒー、手作りスイーツ、Wi-Fi完備'
    },
    '美容院': {
      businessType: '美容院',
      location: '駅前',
      priceRange: '平均単価8000円',
      atmosphere: 'スタイリッシュで清潔感のある空間',
      capacity: 'スタイリスト5名',
      targetCustomer: '20-50代の女性',
      specialFeatures: 'カット・カラー・トリートメント、完全予約制'
    },
    'フィットネスジム': {
      businessType: 'フィットネスジム',
      location: '駅近',
      priceRange: '月額9800円',
      atmosphere: '清潔で開放感のある環境',
      capacity: '24時間営業',
      targetCustomer: '20-40代の健康意識の高い方',
      specialFeatures: '最新マシン完備、パーソナルトレーニング、シャワー室完備'
    }
  }

  const generatePersonaPrompt = () => {
    if (!usePersona) return prompt

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

  const loadTemplate = (templateKey: string) => {
    const template = businessTemplates[templateKey as keyof typeof businessTemplates]
    if (template) {
      setPersona(template)
      setUsePersona(true)
    }
  }

  const samplePrompts = [
    '新商品キャンペーンのお知らせ',
    'お客様への感謝メッセージ',
    '季節限定メニューの紹介',
    'セール情報のお知らせ',
    '友達紹介キャンペーン',
    '予約促進メッセージ',
    'リピーター向け特典案内'
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <span className="font-bold text-xl">L</span>
            </div>
            <h1 className="ml-3 text-3xl font-bold text-gray-900">L-Core AI ペルソナ設定</h1>
          </div>
          <p className="text-lg text-gray-600">
            🎯 ビジネス専用ペルソナでパーソナライズされたマーケティングメッセージを生成
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 左カラム: ペルソナ設定 */}
          <div className="space-y-6">

            {/* ペルソナ設定切り替え */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">🎭 ペルソナ設定</h2>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={usePersona}
                    onChange={(e) => setUsePersona(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">ペルソナを使用</span>
                </label>
              </div>

              {usePersona && (
                <>
                  {/* 業種テンプレート */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      業種テンプレート（クイック設定）
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(businessTemplates).map((key) => (
                        <button
                          key={key}
                          onClick={() => loadTemplate(key)}
                          className="px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 詳細設定 */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">業種</label>
                      <input
                        type="text"
                        value={persona.businessType}
                        onChange={(e) => setPersona({...persona, businessType: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="例: 焼肉居酒屋"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">店舗名（任意）</label>
                      <input
                        type="text"
                        value={persona.businessName}
                        onChange={(e) => setPersona({...persona, businessName: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="例: 肉バル YAMATO"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">立地</label>
                      <input
                        type="text"
                        value={persona.location}
                        onChange={(e) => setPersona({...persona, location: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="例: 都心、住宅街、駅前"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">価格帯</label>
                      <input
                        type="text"
                        value={persona.priceRange}
                        onChange={(e) => setPersona({...persona, priceRange: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="例: 客単価4000円"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">雰囲気・コンセプト</label>
                      <input
                        type="text"
                        value={persona.atmosphere}
                        onChange={(e) => setPersona({...persona, atmosphere: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="例: モダンで家庭的な雰囲気"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">規模・キャパシティ</label>
                      <input
                        type="text"
                        value={persona.capacity}
                        onChange={(e) => setPersona({...persona, capacity: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="例: 55席、24時間営業"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ターゲット顧客</label>
                      <input
                        type="text"
                        value={persona.targetCustomer}
                        onChange={(e) => setPersona({...persona, targetCustomer: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="例: 20-40代のサラリーマン・OL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">特徴・強み</label>
                      <textarea
                        value={persona.specialFeatures}
                        onChange={(e) => setPersona({...persona, specialFeatures: e.target.value})}
                        rows={2}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="例: A5ランクの国産牛、手作りタレ、カウンター席あり"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 右カラム: メッセージ生成 */}
          <div className="space-y-6">

            {/* AI生成フォーム */}
            <div className="bg-white rounded-lg shadow-lg p-6">
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
                {loading ? '🤖 AI生成中...' : '🚀 ペルソナAIメッセージを生成'}
              </button>
            </div>

            {/* 生成結果 */}
            {demoMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  ✅ 生成されたメッセージ
                  {usePersona && (
                    <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      ペルソナ適用済み
                    </span>
                  )}
                </h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-800 whitespace-pre-wrap">{demoMessage}</p>
                </div>
                <div className="mt-3 text-sm text-green-600">
                  💡 このメッセージは
                  {usePersona
                    ? `${persona.businessType}のペルソナを適用したChatGPT-5 mini`
                    : 'ChatGPT-5 mini'
                  }によって生成されました
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="text-center space-x-4 mt-8">
          <Link
            href="/demo"
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← シンプル版
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