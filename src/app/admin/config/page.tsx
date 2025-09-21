'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

interface ConfigStatus {
  openai_configured: boolean
  line_configured: boolean
  firebase_configured: boolean
}

export default function ConfigPage() {
  const { user } = useAuth()
  const [config, setConfig] = useState<ConfigStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    openai_api_key: '',
    line_access_token: '',
    line_channel_secret: ''
  })
  const [showKeys, setShowKeys] = useState({
    openai: false,
    line_token: false,
    line_secret: false
  })

  useEffect(() => {
    if (user) {
      loadConfig()
    }
  }, [user])

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/config')
      if (response.ok) {
        const configData = await response.json()
        setConfig(configData)
      }
    } catch (error) {
      console.error('Error loading config:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Config updated:', result)
        alert('設定が正常に保存されました！\n\n注意：変更を反映するためにアプリケーションを再起動してください。')
        
        // Reload config status
        await loadConfig()
        
        // Clear form
        setFormData({
          openai_api_key: '',
          line_access_token: '',
          line_channel_secret: ''
        })
      } else {
        const error = await response.json()
        alert(`設定の保存に失敗しました: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving config:', error)
      alert('設定の保存中にエラーが発生しました。')
    } finally {
      setSaving(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <Link href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            ログイン
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API設定</h1>
            <p className="text-gray-600 mt-2">ChatGPT-5 miniとLINE APIの設定を管理</p>
          </div>
          <Link
            href="/admin"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            管理画面に戻る
          </Link>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">現在の設定状況</h2>
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">設定状況を確認中...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${config?.firebase_configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">Firebase</span>
                <span className={`text-xs px-2 py-1 rounded-full ${config?.firebase_configured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {config?.firebase_configured ? '設定済み' : '未設定'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${config?.openai_configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">OpenAI API</span>
                <span className={`text-xs px-2 py-1 rounded-full ${config?.openai_configured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {config?.openai_configured ? '設定済み' : '未設定'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${config?.line_configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">LINE API</span>
                <span className={`text-xs px-2 py-1 rounded-full ${config?.line_configured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {config?.line_configured ? '設定済み' : '未設定'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Forms */}
        <div className="space-y-8">
          {/* OpenAI Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ChatGPT-5 mini API設定</h3>
                <p className="text-sm text-gray-600">OpenAI APIキーを設定してAI機能を有効化</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OpenAI API Key
                </label>
                <div className="relative">
                  <input
                    type={showKeys.openai ? 'text' : 'password'}
                    value={formData.openai_api_key}
                    onChange={(e) => setFormData(prev => ({ ...prev, openai_api_key: e.target.value }))}
                    placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeys(prev => ({ ...prev, openai: !prev.openai }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showKeys.openai ? '🙈' : '👁️'}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  OpenAI Platform（platform.openai.com）で取得したAPIキーを入力してください
                </p>
              </div>
            </div>
          </div>

          {/* LINE Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">LINE Messaging API設定</h3>
                <p className="text-sm text-gray-600">LINE Developer Consoleで取得したAPIキーを設定</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel Access Token
                </label>
                <div className="relative">
                  <input
                    type={showKeys.line_token ? 'text' : 'password'}
                    value={formData.line_access_token}
                    onChange={(e) => setFormData(prev => ({ ...prev, line_access_token: e.target.value }))}
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeys(prev => ({ ...prev, line_token: !prev.line_token }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showKeys.line_token ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel Secret
                </label>
                <div className="relative">
                  <input
                    type={showKeys.line_secret ? 'text' : 'password'}
                    value={formData.line_channel_secret}
                    onChange={(e) => setFormData(prev => ({ ...prev, line_channel_secret: e.target.value }))}
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeys(prev => ({ ...prev, line_secret: !prev.line_secret }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showKeys.line_secret ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={saveConfig}
            disabled={saving || (!formData.openai_api_key && !formData.line_access_token && !formData.line_channel_secret)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '保存中...' : '設定を保存'}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">📝 設定手順</h3>
          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium">1. OpenAI API キーの取得</h4>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• <a href="https://platform.openai.com/api-keys" target="_blank" className="underline">OpenAI Platform</a> にログイン</li>
                <li>• 「Create new secret key」でAPIキーを作成</li>
                <li>• 「sk-」で始まるキーをコピーして上記フォームに入力</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">2. LINE API の設定</h4>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• <a href="https://developers.line.biz/console/" target="_blank" className="underline">LINE Developers Console</a> にログイン</li>
                <li>• Messaging APIチャネルを作成</li>
                <li>• Channel Access Token と Channel Secret を取得</li>
                <li>• Webhook URL に <code className="bg-blue-100 px-1 rounded">https://your-domain.vercel.app/api/line/webhook</code> を設定</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}