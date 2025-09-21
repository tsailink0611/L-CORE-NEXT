'use client'

import { useState } from 'react'

export default function SetupPage() {
  const [activeTab, setActiveTab] = useState('firebase')
  const [testResults, setTestResults] = useState<{[key: string]: 'pending' | 'success' | 'error'}>({})
  const [isTestingConnection, setIsTestingConnection] = useState(false)

  const handleTestConnection = async (service: string) => {
    setIsTestingConnection(true)
    setTestResults(prev => ({ ...prev, [service]: 'pending' }))
    
    // Simulate connection test
    setTimeout(() => {
      // Randomly succeed or fail for demo
      const success = Math.random() > 0.3
      setTestResults(prev => ({ 
        ...prev, 
        [service]: success ? 'success' : 'error' 
      }))
      setIsTestingConnection(false)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      case 'pending':
        return (
          <svg className="w-5 h-5 text-yellow-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">連携設定</h1>
          <p className="text-gray-600 mt-2">FirebaseとLINE連携を設定します</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('firebase')}
                className={`py-4 font-medium border-b-2 ${
                  activeTab === 'firebase'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Firebase設定
              </button>
              <button
                onClick={() => setActiveTab('line')}
                className={`py-4 font-medium border-b-2 ${
                  activeTab === 'line'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                LINE Bot設定
              </button>
              <button
                onClick={() => setActiveTab('testing')}
                className={`py-4 font-medium border-b-2 ${
                  activeTab === 'testing'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                接続テスト
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Firebase Configuration */}
          {activeTab === 'firebase' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Firebaseプロジェクト設定</h3>
                <p className="text-gray-600">Firebaseプロジェクトの認証情報とデータベース設定を構成します。</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">プロジェクトID</label>
                  <input
                    type="text"
                    placeholder="your-firebase-project-id"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">Firebaseプロジェクト設定に記載されています</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">APIキー</label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">Firebase Web APIキー</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">認証ドメイン</label>
                  <input
                    type="text"
                    placeholder="your-project.firebaseapp.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ストレージバケット</label>
                  <input
                    type="text"
                    placeholder="your-project.appspot.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">サービスアカウント設定</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">サービスアカウントJSON</label>
                      <textarea
                        placeholder="サービスアカウントJSONをここに貼り付けてください..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-sm"
                      />
                      <p className="text-sm text-gray-500 mt-1">Firebaseコンソール → プロジェクト設定 → サービスアカウントからダウンロード</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleTestConnection('firebase')}
                    disabled={isTestingConnection}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    Firebase接続テスト
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700">
                    設定を保存
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LINE Bot Setup */}
          {activeTab === 'line' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">LINE Bot設定</h3>
                <p className="text-gray-600">LINE Botの認証情報とWebhook設定を構成します。</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">チャネルアクセストークン</label>
                  <input
                    type="password"
                    placeholder="LINEチャネルアクセストークン"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">LINE Developers Console → Messaging API → チャネルアクセストークンに記載</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">チャネルシークレット</label>
                  <input
                    type="password"
                    placeholder="LINEチャネルシークレット"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">LINE Developers Console → Messaging API → チャネルシークレットに記載</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                  <div className="flex">
                    <input
                      type="text"
                      value="https://your-domain.com/api/line/webhook"
                      className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 bg-gray-50 focus:outline-none"
                      readOnly
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md font-medium hover:bg-blue-700">
                      コピー
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">このURLをLINE Developers ConsoleのWebhook設定で使用してください</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Bot設定</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">自動応答メッセージ</h5>
                        <p className="text-sm text-gray-500">ユーザーメッセージに自動で応答</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">あいさつメッセージ</h5>
                        <p className="text-sm text-gray-500">新しいフォロワーにウェルカムメッセージを送信</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">リッチメニュー</h5>
                        <p className="text-sm text-gray-500">チャットでインタラクティブメニューを表示</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleTestConnection('line')}
                    disabled={isTestingConnection}
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
                  >
                    LINE Botテスト
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700">
                    設定を保存
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Connection Testing */}
          {activeTab === 'testing' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">接続テスト</h3>
                <p className="text-gray-600">連携が正しく動作していることを確認するためのテストを実行します。</p>
              </div>

              <div className="space-y-6">
                {/* Firebase Tests */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Firebaseテスト</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(testResults.firebaseAuth)}
                        <div>
                          <p className="font-medium text-gray-900">認証</p>
                          <p className="text-sm text-gray-500">Firebase認証接続をテスト</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTestConnection('firebaseAuth')}
                        disabled={isTestingConnection}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-blue-300"
                      >
                        テスト
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(testResults.firestore)}
                        <div>
                          <p className="font-medium text-gray-900">Firestoreデータベース</p>
                          <p className="text-sm text-gray-500">データベース読み書き操作をテスト</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTestConnection('firestore')}
                        disabled={isTestingConnection}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-blue-300"
                      >
                        テスト
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(testResults.storage)}
                        <div>
                          <p className="font-medium text-gray-900">クラウドストレージ</p>
                          <p className="text-sm text-gray-500">ファイルアップロード・ダウンロード機能をテスト</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTestConnection('storage')}
                        disabled={isTestingConnection}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-blue-300"
                      >
                        テスト
                      </button>
                    </div>
                  </div>
                </div>

                {/* LINE Bot Tests */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">LINE Botテスト</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(testResults.lineWebhook)}
                        <div>
                          <p className="font-medium text-gray-900">Webhook接続</p>
                          <p className="text-sm text-gray-500">Webhookエンドポイントのアクセス可能性をテスト</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTestConnection('lineWebhook')}
                        disabled={isTestingConnection}
                        className="text-green-600 hover:text-green-700 font-medium text-sm disabled:text-green-300"
                      >
                        テスト
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(testResults.lineMessaging)}
                        <div>
                          <p className="font-medium text-gray-900">メッセージAPI</p>
                          <p className="text-sm text-gray-500">メッセージ送信機能をテスト</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTestConnection('lineMessaging')}
                        disabled={isTestingConnection}
                        className="text-green-600 hover:text-green-700 font-medium text-sm disabled:text-green-300"
                      >
                        テスト
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(testResults.lineProfile)}
                        <div>
                          <p className="font-medium text-gray-900">プロフィールAPI</p>
                          <p className="text-sm text-gray-500">ユーザープロフィール取得をテスト</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTestConnection('lineProfile')}
                        disabled={isTestingConnection}
                        className="text-green-600 hover:text-green-700 font-medium text-sm disabled:text-green-300"
                      >
                        テスト
                      </button>
                    </div>
                  </div>
                </div>

                {/* Integration Test */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">統合テスト</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(testResults.fullIntegration)}
                      <div>
                        <p className="font-medium text-blue-900">エンドツーエンドテスト</p>
                        <p className="text-sm text-blue-700">完全なメッセージフローをテスト：受信 → 処理 → 保存 → 応答</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTestConnection('fullIntegration')}
                      disabled={isTestingConnection}
                      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                      統合テスト実行
                    </button>
                  </div>
                </div>

                {/* Test All Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      ['firebaseAuth', 'firestore', 'storage', 'lineWebhook', 'lineMessaging', 'lineProfile'].forEach(service => {
                        setTimeout(() => handleTestConnection(service), Math.random() * 1000)
                      })
                    }}
                    disabled={isTestingConnection}
                    className="bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed"
                  >
                    すべての接続をテスト
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}