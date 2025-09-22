'use client'

import { useState, useEffect } from 'react'
import {
  expandedBusinessCategories,
  BusinessCategory,
  BusinessSubCategory,
  PersonaTemplate,
  searchExpandedTemplates
} from '@/lib/expanded-persona-templates'
import {
  getSavedPersonaPreviews,
  getSavedPersona,
  deleteSavedPersona,
  SavedPersonaPreview
} from '@/lib/saved-personas'

interface ExpandedPersonaSelectorProps {
  onSelectTemplate: (template: PersonaTemplate) => void
}

export default function ExpandedPersonaSelector({ onSelectTemplate }: ExpandedPersonaSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<BusinessSubCategory | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<PersonaTemplate[]>([])
  const [savedPersonas, setSavedPersonas] = useState<SavedPersonaPreview[]>([])

  // 固定版テンプレート読み込み
  useEffect(() => {
    const loadSavedPersonas = () => {
      const saved = getSavedPersonaPreviews()
      setSavedPersonas(saved)
    }

    loadSavedPersonas()

    // ストレージ変更を監視
    const handleStorageChange = () => {
      loadSavedPersonas()
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    if (keyword.trim()) {
      const results = searchExpandedTemplates(keyword)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleTemplateSelect = (template: PersonaTemplate) => {
    onSelectTemplate(template)
    // 選択後は画面をリセット
    setSelectedCategory(null)
    setSelectedSubCategory(null)
    setSearchKeyword('')
    setSearchResults([])
  }

  // 固定版テンプレート選択
  const handleSavedPersonaSelect = (savedPersonaId: string) => {
    const savedPersona = getSavedPersona(savedPersonaId)
    if (savedPersona) {
      // SavedPersonaをPersonaTemplateに変換
      const template: PersonaTemplate = {
        id: savedPersona.id,
        businessType: savedPersona.businessType,
        businessSubType: savedPersona.businessType, // 同じ値を使用
        category: savedPersona.category,
        businessName: savedPersona.businessName,
        location: savedPersona.location,
        priceRange: savedPersona.priceRange,
        atmosphere: savedPersona.atmosphere,
        capacity: savedPersona.capacity,
        targetCustomer: savedPersona.targetCustomer,
        specialFeatures: savedPersona.specialFeatures,
        tags: []  // 固定版にはタグなし
      }

      onSelectTemplate(template)

      // 選択後は画面をリセット
      setSelectedCategory(null)
      setSelectedSubCategory(null)
      setSearchKeyword('')
      setSearchResults([])
    }
  }

  // 固定版削除
  const handleDeleteSavedPersona = (savedPersonaId: string, event: React.MouseEvent) => {
    event.stopPropagation() // カード選択を防ぐ

    if (confirm('この固定版を削除しますか？')) {
      const success = deleteSavedPersona(savedPersonaId)
      if (success) {
        // 削除後にリストを更新
        const updated = getSavedPersonaPreviews()
        setSavedPersonas(updated)
      }
    }
  }

  const renderBreadcrumb = () => {
    if (!selectedCategory && !selectedSubCategory) return null

    return (
      <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
        <button
          onClick={() => {
            setSelectedCategory(null)
            setSelectedSubCategory(null)
          }}
          className="hover:text-blue-600"
        >
          🏠 トップ
        </button>
        {selectedCategory && (
          <>
            <span>→</span>
            <button
              onClick={() => setSelectedSubCategory(null)}
              className="hover:text-blue-600"
            >
              {selectedCategory.name}
            </button>
          </>
        )}
        {selectedSubCategory && (
          <>
            <span>→</span>
            <span className="text-blue-600 font-medium">
              {selectedSubCategory.name}
            </span>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">🎯 大規模ペルソナライブラリ</h2>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        💡 <strong>飲食店8業態 + 美容・健康6業態</strong>の詳細テンプレートから選択可能
      </div>

      {/* 検索バー */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔍 キーワード検索
        </label>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="例: 焼肉、高級、駅前、ファミリー、美容院、エステ、ネイル..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchResults.length > 0 && (
          <div className="mt-3 text-sm text-gray-600">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              {searchResults.length}件のテンプレートが見つかりました
            </span>
          </div>
        )}
      </div>

      {/* 固定版テンプレート表示 */}
      {savedPersonas.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            💾 保存済みペルソナ
            <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {savedPersonas.length}件
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {savedPersonas.map((savedPersona) => (
              <div
                key={savedPersona.id}
                onClick={() => handleSavedPersonaSelect(savedPersona.id)}
                className="p-4 border border-blue-200 bg-blue-50 rounded-lg hover:border-blue-400 hover:bg-blue-100 cursor-pointer transition-colors relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-blue-900">
                    {savedPersona.displayName}
                  </h4>
                  <button
                    onClick={(e) => handleDeleteSavedPersona(savedPersona.id, e)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 hover:bg-red-100 rounded transition-colors"
                    title="削除"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm text-blue-800 mb-1">
                  {savedPersona.businessType}
                </div>
                <div className="text-xs text-blue-600">
                  {savedPersona.category} | {new Date(savedPersona.createdAt).toLocaleDateString('ja-JP')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* パンくずリスト */}
      {renderBreadcrumb()}

      {/* 検索結果表示 */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">🔍 検索結果</h3>
          <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
            {searchResults.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">
                    {template.businessType}
                  </h4>
                  <div className="flex gap-1">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {template.category}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {template.priceRange}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {template.businessSubType} | {template.location}
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 階層的選択 */}
      {searchResults.length === 0 && (
        <>
          {/* 大カテゴリ選択 */}
          {!selectedCategory && (
            <div>
              <h3 className="text-lg font-medium mb-3">📋 業種を選択してください</h3>
              <div className="grid grid-cols-1 gap-4">
                {expandedBusinessCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {category.subCategories.length}つの業態、
                          {category.subCategories.reduce((sum, sub) => sum + sub.templates.length, 0)}のテンプレート
                        </div>
                      </div>
                      <div className="text-2xl text-gray-400">→</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* サブカテゴリ選択 */}
          {selectedCategory && !selectedSubCategory && (
            <div>
              <h3 className="text-lg font-medium mb-3">
                📂 業態を選択してください ({selectedCategory.name})
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {selectedCategory.subCategories.map((subCategory) => (
                  <button
                    key={subCategory.id}
                    onClick={() => setSelectedSubCategory(subCategory)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{subCategory.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {subCategory.templates.length}つのテンプレート
                        </div>
                      </div>
                      <div className="text-xl text-gray-400">→</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* テンプレート選択 */}
          {selectedSubCategory && (
            <div>
              <h3 className="text-lg font-medium mb-3">
                ⚡ テンプレートを選択してください ({selectedSubCategory.name})
              </h3>
              <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                {selectedSubCategory.templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">
                        {template.businessType}
                      </h4>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {template.priceRange}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">業態:</span> {template.businessSubType}
                      </div>
                      <div>
                        <span className="font-medium">立地:</span> {template.location}
                      </div>
                      <div>
                        <span className="font-medium">規模:</span> {template.capacity}
                      </div>
                      <div>
                        <span className="font-medium">客層:</span> {template.targetCustomer}
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700">雰囲気:</span>
                      <div className="text-sm text-gray-600">{template.atmosphere}</div>
                    </div>

                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700">特徴:</span>
                      <div className="text-sm text-gray-600">{template.specialFeatures}</div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}