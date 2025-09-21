'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [systemStatus, setSystemStatus] = useState({
    server: 'operational',
    database: 'operational', 
    queue: 'warning',
    storage: 'operational'
  })

  const toggleSystemStatus = (service: string) => {
    const statuses = ['operational', 'warning', 'error']
    const currentIndex = statuses.indexOf(systemStatus[service as keyof typeof systemStatus])
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]
    
    setSystemStatus(prev => ({
      ...prev,
      [service]: nextStatus
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return '稼働中'
      case 'warning': return '警告'
      case 'error': return 'エラー'
      default: return '不明'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">システム管理</h1>
          <p className="text-gray-600 mt-2">L-Coreプラットフォームの監視と管理</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'システム概要' },
                { id: 'users', name: 'ユーザー管理' },
                { id: 'settings', name: '設定' },
                { id: 'logs', name: 'システムログ' },
                { id: 'security', name: 'セキュリティ' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-4 font-medium border-b-2 ${
                    activeSection === tab.id
                      ? 'text-red-600 border-red-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* System Overview */}
          {activeSection === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">システム概要</h2>
              
              {/* System Status Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {Object.entries(systemStatus).map(([service, status]) => (
                  <div key={service} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700 capitalize">
                        {service === 'server' ? 'サーバー' : 
                         service === 'database' ? 'データベース' :
                         service === 'queue' ? 'キュー' :
                         service === 'storage' ? 'ストレージ' : service}
                      </h3>
                      <button
                        onClick={() => toggleSystemStatus(service)}
                        className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}
                      />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{getStatusText(status)}</p>
                    <p className="text-sm text-gray-500">ステータスをクリックして切り替え</p>
                  </div>
                ))}
              </div>

              {/* Resource Usage */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">リソース使用率</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU使用率</span>
                        <span>34%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '34%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>メモリ使用率</span>
                        <span>67%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '67%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>ストレージ使用率</span>
                        <span>23%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '23%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>ネットワークI/O</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '12%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">アクティブサービス</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'LINE Webhookハンドラー', status: 'running', uptime: '2日 14時間' },
                      { name: 'メッセージキューワーカー', status: 'running', uptime: '2日 14時間' },
                      { name: '分析エンジン', status: 'running', uptime: '1日 8時間' },
                      { name: 'Firebase同期', status: 'running', uptime: '2日 14時間' },
                      { name: 'AIメッセージ生成', status: 'running', uptime: '6時間 23分' }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="font-medium text-gray-900">{service.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{service.uptime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">最近のシステム活動</h3>
                <div className="space-y-3">
                  {[
                    { time: '2分前', event: 'メッセージバッチ処理完了', details: '1,247件のメッセージが正常に配信されました' },
                    { time: '15分前', event: 'データベースバックアップ完了', details: '自動日次バックアップが完了しました' },
                    { time: '1時間前', event: 'セキュリティスキャン完了', details: '脆弱性は検出されませんでした' },
                    { time: '2時間前', event: 'システムパフォーマンス警告', details: 'CPU使用率スパイクが自動的に解決されました' },
                    { time: '3時間前', event: 'ユーザー認証スパイク', details: '2,456件のログイン試行が処理されました' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{activity.event}</h4>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeSection === 'users' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">ユーザー管理</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700">
                  新規ユーザー追加
                </button>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-700">総ユーザー数</h3>
                  <p className="text-2xl font-bold text-blue-900">8,942</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-700">本日のアクティブ</h3>
                  <p className="text-2xl font-bold text-green-900">2,456</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-700">プレミアムユーザー</h3>
                  <p className="text-2xl font-bold text-purple-900">1,234</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-700">今週の新規</h3>
                  <p className="text-2xl font-bold text-orange-900">156</p>
                </div>
              </div>

              {/* User Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ユーザー</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">役割</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終アクセス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: '山田太郎', email: 'yamada@example.com', status: 'active', role: '管理者', lastActive: '2時間前' },
                      { name: '佐藤花子', email: 'sato@example.com', status: 'active', role: 'ユーザー', lastActive: '5分前' },
                      { name: '田中一郎', email: 'tanaka@example.com', status: 'inactive', role: 'ユーザー', lastActive: '2日前' },
                      { name: '鈴木美香', email: 'suzuki@example.com', status: 'active', role: 'マネージャー', lastActive: '1時間前' }
                    ].map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">{user.name.charAt(0)}</span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status === 'active' ? 'アクティブ' : '非アクティブ'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastActive}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-red-600 hover:text-red-900 mr-3">編集</button>
                          <button className="text-red-600 hover:text-red-900">削除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Configuration */}
          {activeSection === 'settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">システム設定</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">一般設定</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">プラットフォーム名</label>
                      <input
                        type="text"
                        defaultValue="L-Core プラットフォーム"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">管理者メール</label>
                      <input
                        type="email"
                        defaultValue="admin@l-core.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">セキュリティ設定</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">二要素認証</h4>
                        <p className="text-sm text-gray-500">管理者アカウントに2FAを要求</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">セッションタイムアウト</h4>
                        <p className="text-sm text-gray-500">非アクティブユーザーの自動ログアウト</p>
                      </div>
                      <select className="border border-gray-300 rounded-md px-3 py-2">
                        <option>30分</option>
                        <option>1時間</option>
                        <option>2時間</option>
                        <option>無制限</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">メッセージ制限</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">日次メッセージ制限</label>
                      <input
                        type="number"
                        defaultValue="10000"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">レート制限（分あたり）</label>
                      <input
                        type="number"
                        defaultValue="100"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700">
                  変更を保存
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50">
                  デフォルトにリセット
                </button>
              </div>
            </div>
          )}

          {/* System Logs */}
          {activeSection === 'logs' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">システムログ</h2>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>すべてのレベル</option>
                    <option>エラー</option>
                    <option>警告</option>
                    <option>情報</option>
                  </select>
                  <button className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                    ログエクスポート
                  </button>
                </div>
              </div>

              <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto">
                <div className="space-y-1">
                  <div>[2024-09-21 10:30:15] INFO: メッセージバッチ処理開始 - 1,247件のメッセージがキューに追加されました</div>
                  <div>[2024-09-21 10:30:16] INFO: LINE API接続が正常に確立されました</div>
                  <div>[2024-09-21 10:30:17] INFO: Firebaseデータベース同期完了</div>
                  <div>[2024-09-21 10:30:18] <span className="text-yellow-400">WARN</span>: 高メモリ使用率を検出 - 78%利用率</div>
                  <div>[2024-09-21 10:30:19] INFO: ユーザーバッチ #3421 のAIメッセージ生成完了</div>
                  <div>[2024-09-21 10:30:20] INFO: 分析データ処理完了 - 8,942件のユーザーインタラクション</div>
                  <div>[2024-09-21 10:30:21] <span className="text-red-400">ERROR</span>: メッセージID #89471 の送信失敗 - 受信者制限を超過</div>
                  <div>[2024-09-21 10:30:22] INFO: 失敗したメッセージの自動再試行を開始</div>
                  <div>[2024-09-21 10:30:23] INFO: メッセージID #89471 が再試行で正常に配信されました</div>
                  <div>[2024-09-21 10:30:24] INFO: 日次バックアッププロセス開始</div>
                  <div>[2024-09-21 10:30:25] INFO: セキュリティスキャン完了 - 脅威は検出されませんでした</div>
                  <div>[2024-09-21 10:30:26] INFO: パフォーマンス最適化ルーチン開始</div>
                  <div>[2024-09-21 10:30:27] <span className="text-yellow-400">WARN</span>: Webhook応答時間増加 - 平均2.1秒</div>
                  <div>[2024-09-21 10:30:28] INFO: キャッシュクリーンアップ完了 - 2.3GB解放</div>
                  <div>[2024-09-21 10:30:29] INFO: 234人のユーザー認証トークンを更新しました</div>
                  <div>[2024-09-21 10:30:30] INFO: システムヘルスチェック合格 - すべてのサービスが稼働中</div>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">セキュリティダッシュボード</h2>
              
              {/* Security Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-700">セキュリティスコア</h3>
                  <p className="text-2xl font-bold text-green-900">94/100</p>
                  <p className="text-sm text-green-600">優秀</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-700">最終スキャン</h3>
                  <p className="text-lg font-semibold text-blue-900">2時間前</p>
                  <p className="text-sm text-blue-600">問題なし</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-yellow-700">保留中の更新</h3>
                  <p className="text-2xl font-bold text-yellow-900">3</p>
                  <p className="text-sm text-yellow-600">セキュリティパッチ</p>
                </div>
              </div>

              {/* Recent Security Events */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">最近のセキュリティイベント</h3>
                <div className="space-y-3">
                  {[
                    { time: '5分前', event: 'ログイン失敗試行をブロック', severity: 'warning', details: 'IP: 192.168.1.100 - 複数回の試行' },
                    { time: '1時間前', event: 'セキュリティスキャン完了', severity: 'info', details: 'すべてのシステムが安全 - 脆弱性は検出されませんでした' },
                    { time: '3時間前', event: 'API レート制限を超過', severity: 'warning', details: 'クライアント: app-client-123 一時的にブロック' },
                    { time: '6時間前', event: 'SSL証明書更新', severity: 'info', details: '証明書は2025-09-21まで有効です' },
                    { time: '12時間前', event: '管理者パスワード変更', severity: 'info', details: 'ユーザー: admin@l-core.com 安全な場所から' }
                  ].map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        event.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{event.event}</h4>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{event.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">クイックアクション</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 text-left">
                      <h4 className="font-medium">セキュリティスキャン実行</h4>
                      <p className="text-sm text-red-100">脆弱性をチェック</p>
                    </button>
                    <button className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 text-left">
                      <h4 className="font-medium">セキュリティパッチ更新</h4>
                      <p className="text-sm text-orange-100">3件の保留中更新を適用</p>
                    </button>
                    <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 text-left">
                      <h4 className="font-medium">セキュリティレポート生成</h4>
                      <p className="text-sm text-purple-100">詳細分析をエクスポート</p>
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">アクセス制御</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">IPホワイトリスト有効</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">APIレート制限</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">侵入検知</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">自動バックアップ暗号化</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}