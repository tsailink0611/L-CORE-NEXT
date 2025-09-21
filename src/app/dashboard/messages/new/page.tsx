'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { createMessage } from '@/lib/firestore'
import { generateMarketingMessage } from '@/lib/openai'

export default function NewMessagePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [formData, setFormData] = useState({
    content: '',
    type: 'text' as 'text' | 'image' | 'video' | 'audio',
    status: 'draft' as 'draft' | 'scheduled' | 'sent',
    recipients: [] as string[]
  })
  const [aiPrompt, setAiPrompt] = useState('')
  const [showAiGenerator, setShowAiGenerator] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !formData.content.trim()) return

    try {
      setLoading(true)
      
      // Create message in Firestore
      await createMessage(user.uid, {
        content: formData.content,
        type: formData.type,
        status: formData.status,
        recipients: formData.recipients,
        analytics: {
          delivered: 0,
          read: 0,
          clicked: 0
        }
      })

      // Redirect back to messages list
      router.push('/dashboard/messages')
    } catch (error) {
      console.error('Error creating message:', error)
      alert('メッセージの作成に失敗しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  const handleRecipientsChange = (value: string) => {
    // Split by comma or newline and filter out empty strings
    const recipients = value.split(/[,\n]/).map(r => r.trim()).filter(r => r.length > 0)
    setFormData(prev => ({ ...prev, recipients }))
  }

  const generateAiMessage = async () => {
    if (!aiPrompt.trim()) {
      alert('AI生成のためのプロンプトを入力してください。')
      return
    }

    try {
      setAiLoading(true)
      const generatedMessage = await generateMarketingMessage(aiPrompt, {
        tone: 'casual',
        length: 'medium',
        targetAudience: 'LINEユーザー',
        productInfo: 'L-Coreマーケティング自動化プラットフォーム'
      })
      
      setFormData(prev => ({ ...prev, content: generatedMessage }))
      setShowAiGenerator(false)
      setAiPrompt('')
    } catch (error: any) {
      console.error('AI generation error:', error)
      if (error.message.includes('API key')) {
        alert('OpenAI APIキーが設定されていません。管理画面で設定してください。')
      } else {
        alert('AI生成に失敗しました。APIキーと設定を確認してください。')
      }
    } finally {
      setAiLoading(false)
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
            <h1 className="text-3xl font-bold text-gray-900">新規メッセージ作成</h1>
            <p className="text-gray-600 mt-2">LINEメッセージキャンペーンを作成し、管理します</p>
          </div>
          <Link
            href="/dashboard/messages"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            戻る
          </Link>
        </div>

        {/* AI Generator */}
        {showAiGenerator && (
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-sm p-6 mb-6 text-white">
            <h3 className="text-lg font-bold mb-4">🤖 AI メッセージ生成</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  どのようなメッセージを作成したいですか？
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="例：新商品のプロモーションメッセージを作成してください。20代女性向けの化粧品です。"
                  rows={3}
                  className="w-full border border-white/20 rounded-md px-3 py-2 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={generateAiMessage}
                  disabled={aiLoading || !aiPrompt.trim()}
                  className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {aiLoading ? '生成中...' : 'AI生成'}
                </button>
                <button
                  onClick={() => setShowAiGenerator(false)}
                  className="border border-white/50 text-white px-4 py-2 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Message Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メッセージタイプ
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="text">テキストメッセージ</option>
                <option value="image">画像メッセージ</option>
                <option value="video">動画メッセージ</option>
                <option value="audio">音声メッセージ</option>
              </select>
            </div>

            {/* Message Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  メッセージ内容 *
                </label>
                <button
                  type="button"
                  onClick={() => setShowAiGenerator(true)}
                  className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  🤖 AI生成
                </button>
              </div>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="メッセージの内容を入力してください..."
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                文字数: {formData.content.length} / 1000
              </p>
            </div>

            {/* Recipients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                受信者
              </label>
              <textarea
                onChange={(e) => handleRecipientsChange(e.target.value)}
                placeholder="受信者のLINE IDまたはユーザーIDを入力してください（カンマ区切りまたは改行区切り）"
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                受信者数: {formData.recipients.length}名
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ステータス
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === 'draft'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="mr-2"
                  />
                  下書きとして保存
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="scheduled"
                    checked={formData.status === 'scheduled'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="mr-2"
                  />
                  送信スケジュール
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="sent"
                    checked={formData.status === 'sent'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="mr-2"
                  />
                  即座に送信
                </label>
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                プレビュー
              </label>
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="max-w-sm mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">L</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">L-Core Bot</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-900">
                      {formData.content || 'メッセージ内容がここに表示されます...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/dashboard/messages"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                disabled={loading || !formData.content.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '作成中...' : 'メッセージを作成'}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">💡 メッセージ作成のヒント</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• 🤖 AI生成機能で効果的なメッセージを自動作成できます</li>
            <li>• メッセージは1000文字以内で作成してください</li>
            <li>• 受信者のLINE IDは正確に入力してください</li>
            <li>• 下書きとして保存して後で編集することができます</li>
            <li>• スケジュール送信では日時を指定できます（将来実装予定）</li>
            <li>• 即座に送信を選択すると、すぐにメッセージが配信されます</li>
          </ul>
        </div>
      </div>
    </div>
  )
}