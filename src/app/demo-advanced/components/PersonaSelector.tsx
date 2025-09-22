'use client'

import { useState } from 'react'
import {
  businessCategories,
  BusinessCategory,
  BusinessSubCategory,
  PersonaTemplate,
  searchTemplates
} from '@/lib/persona-templates'

interface PersonaSelectorProps {
  onSelectTemplate: (template: PersonaTemplate) => void
}

export default function PersonaSelector({ onSelectTemplate }: PersonaSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<BusinessSubCategory | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<PersonaTemplate[]>([])

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    if (keyword.trim()) {
      const results = searchTemplates(keyword)
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
      <h2 className="text-xl font-semibold mb-4">🎯 階層的ペルソナ選択</h2>

      {/* 検索バー */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔍 キーワード検索
        </label>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="例: 焼肉、高級、駅前、ファミリー..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchResults.length > 0 && (
          <div className="mt-3 text-sm text-gray-600">
            {searchResults.length}件のテンプレートが見つかりました
          </div>
        )}
      </div>

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
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {template.businessSubType} | {template.priceRange}
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
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
              <div className="grid grid-cols-2 gap-4">
                {businessCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {category.subCategories.length}つの業態
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
                    <div className="font-medium">{subCategory.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {subCategory.templates.length}つのテンプレート
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
              <div className="grid grid-cols-1 gap-4">
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

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
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