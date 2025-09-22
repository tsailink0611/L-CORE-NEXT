'use client'

// 固定テンプレート（保存済みペルソナ）管理

export interface SavedPersona {
  id: string
  name: string // 表示名（例: "焼肉業態の固定版1", "記憶1"）
  displayName: string // カード表示用の名前
  businessType: string
  businessName: string
  location: string
  priceRange: string
  atmosphere: string
  capacity: string
  targetCustomer: string
  specialFeatures: string
  sourceTemplate: string // 元のテンプレート名
  category: string // 業態カテゴリ
  createdAt: string
  updatedAt: string
}

export interface SavedPersonaPreview {
  id: string
  name: string
  displayName: string
  businessType: string
  category: string
  createdAt: string
}

// LocalStorage キー
const SAVED_PERSONAS_KEY = 'l-core-saved-personas'

// 固定テンプレート保存
export function savePersona(
  persona: {
    businessType: string
    businessName: string
    location: string
    priceRange: string
    atmosphere: string
    capacity: string
    targetCustomer: string
    specialFeatures: string
    sourceTemplate: string
  },
  category: string,
  customName?: string
): string {
  const savedPersonas = getSavedPersonas()

  // 同じカテゴリの固定版の数を数える
  const categoryCount = savedPersonas.filter(p => p.category === category).length

  // 表示名を自動生成
  const autoName = customName || `${category}の固定版${categoryCount + 1}`
  const displayName = customName || `記憶${savedPersonas.length + 1}`

  const savedPersona: SavedPersona = {
    id: generateId(),
    name: autoName,
    displayName: displayName,
    businessType: persona.businessType,
    businessName: persona.businessName,
    location: persona.location,
    priceRange: persona.priceRange,
    atmosphere: persona.atmosphere,
    capacity: persona.capacity,
    targetCustomer: persona.targetCustomer,
    specialFeatures: persona.specialFeatures,
    sourceTemplate: persona.sourceTemplate,
    category: category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  savedPersonas.push(savedPersona)
  localStorage.setItem(SAVED_PERSONAS_KEY, JSON.stringify(savedPersonas))

  return savedPersona.id
}

// 固定テンプレート一覧取得
export function getSavedPersonas(): SavedPersona[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(SAVED_PERSONAS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to get saved personas:', error)
    return []
  }
}

// 固定テンプレートプレビュー取得（選択画面用）
export function getSavedPersonaPreviews(): SavedPersonaPreview[] {
  const savedPersonas = getSavedPersonas()
  return savedPersonas.map(persona => ({
    id: persona.id,
    name: persona.name,
    displayName: persona.displayName,
    businessType: persona.businessType,
    category: persona.category,
    createdAt: persona.createdAt
  }))
}

// 特定の固定テンプレート取得
export function getSavedPersona(id: string): SavedPersona | null {
  const savedPersonas = getSavedPersonas()
  return savedPersonas.find(persona => persona.id === id) || null
}

// 固定テンプレート削除
export function deleteSavedPersona(id: string): boolean {
  try {
    const savedPersonas = getSavedPersonas()
    const filteredPersonas = savedPersonas.filter(persona => persona.id !== id)
    localStorage.setItem(SAVED_PERSONAS_KEY, JSON.stringify(filteredPersonas))
    return true
  } catch (error) {
    console.error('Failed to delete saved persona:', error)
    return false
  }
}

// 固定テンプレート更新
export function updateSavedPersona(
  id: string,
  updates: Partial<Omit<SavedPersona, 'id' | 'createdAt'>>
): boolean {
  try {
    const savedPersonas = getSavedPersonas()
    const index = savedPersonas.findIndex(persona => persona.id === id)

    if (index === -1) return false

    savedPersonas[index] = {
      ...savedPersonas[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    localStorage.setItem(SAVED_PERSONAS_KEY, JSON.stringify(savedPersonas))
    return true
  } catch (error) {
    console.error('Failed to update saved persona:', error)
    return false
  }
}

// 全ての固定テンプレートクリア（開発用）
export function clearAllSavedPersonas(): void {
  localStorage.removeItem(SAVED_PERSONAS_KEY)
}

// ID生成
function generateId(): string {
  return `saved-persona-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// 固定テンプレートの統計取得
export function getSavedPersonaStats() {
  const personas = getSavedPersonas()
  const categoryCounts = personas.reduce((acc, persona) => {
    acc[persona.category] = (acc[persona.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    total: personas.length,
    categories: categoryCounts
  }
}