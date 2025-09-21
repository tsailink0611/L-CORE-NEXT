export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">分析</h1>
          <p className="text-gray-600 mt-2">パフォーマンス指標とエンゲージメント分析</p>
        </div>

        {/* Time Period Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                過去7日
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">
                過去30日
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">
                過去3ヶ月
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">
                カスタム範囲
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">送信メッセージ数</h3>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">24,847</div>
              <div className="flex items-center text-sm">
                <span className="text-green-600 font-medium">+12.5%</span>
                <span className="text-gray-500 ml-1">前期比</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">配信率</h3>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">98.2%</div>
              <div className="flex items-center text-sm">
                <span className="text-green-600 font-medium">+0.3%</span>
                <span className="text-gray-500 ml-1">前期比</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">開封率</h3>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">84.6%</div>
              <div className="flex items-center text-sm">
                <span className="text-red-600 font-medium">-1.2%</span>
                <span className="text-gray-500 ml-1">前期比</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">クリック率</h3>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">23.4%</div>
              <div className="flex items-center text-sm">
                <span className="text-green-600 font-medium">+2.1%</span>
                <span className="text-gray-500 ml-1">前期比</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Message Volume Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">メッセージ送信量</h3>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                <option>日別</option>
                <option>週別</option>
                <option>月別</option>
              </select>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500">インタラクティブチャート表示</p>
                <p className="text-sm text-gray-400">チャートコンポーネントがここに表示されます</p>
              </div>
            </div>
          </div>

          {/* Engagement Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">エンゲージメント推移</h3>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                <option>開封率</option>
                <option>クリック率</option>
                <option>応答率</option>
              </select>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p className="text-gray-500">線グラフ表示</p>
                <p className="text-sm text-gray-400">トレンド分析コンポーネント</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performing Messages */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">高パフォーマンスメッセージ</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">L-Coreプラットフォームへようこそ！</h4>
                    <p className="text-sm text-gray-500">オンボーディング • 2時間前に送信</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">94.2%</p>
                  <p className="text-sm text-gray-500">開封率</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">特別オファー - 30%オフ</h4>
                    <p className="text-sm text-gray-500">プロモーション • 3日前に送信</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">87.5%</p>
                  <p className="text-sm text-gray-500">開封率</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">月次ニュースレター</h4>
                    <p className="text-sm text-gray-500">ニュースレター • 1週間前に送信</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">79.3%</p>
                  <p className="text-sm text-gray-500">開封率</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">サポート応答テンプレート</h4>
                    <p className="text-sm text-gray-500">サポート • 自動応答</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">76.8%</p>
                  <p className="text-sm text-gray-500">開封率</p>
                </div>
              </div>
            </div>
          </div>

          {/* Audience Insights */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">オーディエンス内訳</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">アクティブユーザー</span>
                    <span className="font-medium">69.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '69.7%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">プレミアムユーザー</span>
                    <span className="font-medium">16.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '16.3%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">新規ユーザー</span>
                    <span className="font-medium">10.0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '10.0%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">非アクティブ</span>
                    <span className="font-medium">4.0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{width: '4.0%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ピークアクティビティ時間</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">朝 (6-12時)</span>
                  <span className="text-sm font-medium text-green-600">高</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">午後 (12-18時)</span>
                  <span className="text-sm font-medium text-yellow-600">中</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">夜 (18-24時)</span>
                  <span className="text-sm font-medium text-green-600">高</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">深夜 (0-6時)</span>
                  <span className="text-sm font-medium text-red-600">低</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <p className="font-medium text-blue-900 text-sm">レポートエクスポート</p>
                  <p className="text-blue-700 text-xs">分析データをダウンロード</p>
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <p className="font-medium text-green-900 text-sm">レポートスケジュール</p>
                  <p className="text-green-700 text-xs">週次自動レポート</p>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <p className="font-medium text-purple-900 text-sm">カスタムダッシュボード</p>
                  <p className="text-purple-700 text-xs">カスタムビューを作成</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}