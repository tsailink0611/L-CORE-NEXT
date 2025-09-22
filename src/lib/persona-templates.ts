// 階層的ペルソナテンプレートデータベース

export interface PersonaTemplate {
  id: string
  businessType: string
  businessSubType: string
  category: string
  businessName: string
  location: string
  priceRange: string
  atmosphere: string
  capacity: string
  targetCustomer: string
  specialFeatures: string
  tags: string[]
}

export interface BusinessCategory {
  id: string
  name: string
  icon: string
  subCategories: BusinessSubCategory[]
}

export interface BusinessSubCategory {
  id: string
  name: string
  templates: PersonaTemplate[]
}

export const businessCategories: BusinessCategory[] = [
  {
    id: 'restaurant',
    name: '🍽️ 飲食業',
    icon: '🍽️',
    subCategories: [
      {
        id: 'yakiniku',
        name: '🥩 焼肉・BBQ',
        templates: [
          {
            id: 'yakiniku_premium',
            businessType: '高級焼肉店',
            businessSubType: 'A5ランク専門',
            category: '焼肉',
            businessName: '',
            location: '都心・銀座エリア',
            priceRange: '客単価12000円',
            atmosphere: '高級感のある落ち着いた空間',
            capacity: '40席（個室中心）',
            targetCustomer: '30-50代の高所得者層',
            specialFeatures: 'A5ランク和牛専門、ソムリエ在籍、個室完備、接待利用',
            tags: ['高級', 'A5和牛', '接待', '個室']
          },
          {
            id: 'yakiniku_family',
            businessType: 'ファミリー焼肉店',
            businessSubType: 'お手頃価格',
            category: '焼肉',
            businessName: '',
            location: '郊外・ロードサイド',
            priceRange: '客単価2800円',
            atmosphere: '明るく賑やかな家族向け空間',
            capacity: '120席（テーブル席中心）',
            targetCustomer: 'ファミリー層（子供連れ）',
            specialFeatures: 'キッズメニュー、駐車場完備、食べ放題プラン、子供料金設定',
            tags: ['ファミリー', '食べ放題', '駐車場', 'キッズ']
          },
          {
            id: 'yakiniku_solo',
            businessType: '一人焼肉専門店',
            businessSubType: 'カウンター特化',
            category: '焼肉',
            businessName: '',
            location: 'オフィス街・駅前',
            priceRange: '客単価3500円',
            atmosphere: 'カジュアルで入りやすい雰囲気',
            capacity: '26席（カウンター専門）',
            targetCustomer: '20-40代の単身者・会社員',
            specialFeatures: '全席カウンター、一人用コンロ、短時間利用OK、ランチ営業',
            tags: ['一人焼肉', 'カウンター', 'ランチ', '駅前']
          }
        ]
      },
      {
        id: 'ramen',
        name: '🍜 ラーメン・麺類',
        templates: [
          {
            id: 'ramen_iekei',
            businessType: '家系ラーメン店',
            businessSubType: '豚骨醤油',
            category: 'ラーメン',
            businessName: '',
            location: '住宅街・学生街',
            priceRange: '客単価900円',
            atmosphere: 'カウンター中心のカジュアル空間',
            capacity: '22席（カウンター16席、テーブル6席）',
            targetCustomer: '20-30代男性、学生',
            specialFeatures: '濃厚豚骨醤油、太麺、ほうれん草、海苔、深夜営業',
            tags: ['家系', '豚骨', '深夜営業', '学生街']
          },
          {
            id: 'ramen_tsukemen',
            businessType: 'つけ麺専門店',
            businessSubType: '魚介豚骨',
            category: 'ラーメン',
            businessName: '',
            location: 'オフィス街',
            priceRange: '客単価1200円',
            atmosphere: 'モダンで清潔感のある内装',
            capacity: '18席（カウンター専門）',
            targetCustomer: '20-40代のサラリーマン',
            specialFeatures: '特製つけ麺、魚介豚骨スープ、大盛り無料、ランチタイム混雑',
            tags: ['つけ麺', '魚介豚骨', '大盛り無料', 'ランチ']
          }
        ]
      },
      {
        id: 'cafe',
        name: '☕ カフェ・喫茶',
        templates: [
          {
            id: 'cafe_specialty',
            businessType: 'スペシャルティコーヒー店',
            businessSubType: '自家焙煎',
            category: 'カフェ',
            businessName: '',
            location: '住宅街・アート地区',
            priceRange: '客単価1200円',
            atmosphere: 'おしゃれで落ち着いた大人の空間',
            capacity: '25席（テーブル席、カウンター席）',
            targetCustomer: '25-45代のコーヒー愛好家',
            specialFeatures: '自家焙煎コーヒー、シングルオリジン、手作りスイーツ、Wi-Fi',
            tags: ['自家焙煎', 'スペシャルティ', 'Wi-Fi', 'スイーツ']
          },
          {
            id: 'cafe_chain',
            businessType: 'カジュアルカフェ',
            businessSubType: 'チェーン系',
            category: 'カフェ',
            businessName: '',
            location: '駅前・商業施設',
            priceRange: '客単価600円',
            atmosphere: '明るく入りやすいカジュアル空間',
            capacity: '45席（テーブル席中心）',
            targetCustomer: '学生、主婦、ビジネスパーソン',
            specialFeatures: 'ドリンク持ち帰り、軽食メニュー、電源完備、長時間利用OK',
            tags: ['チェーン', 'テイクアウト', '電源', '駅前']
          }
        ]
      }
    ]
  },
  {
    id: 'beauty',
    name: '💄 美容・健康',
    icon: '💄',
    subCategories: [
      {
        id: 'salon',
        name: '✂️ 美容院・サロン',
        templates: [
          {
            id: 'salon_premium',
            businessType: '高級美容院',
            businessSubType: 'プレミアムサロン',
            category: '美容院',
            businessName: '',
            location: '銀座・表参道',
            priceRange: '平均単価18000円',
            atmosphere: 'ラグジュアリーで洗練された空間',
            capacity: 'スタイリスト8名、完全予約制',
            targetCustomer: '30-50代の高所得女性',
            specialFeatures: 'トップスタイリスト在籍、高級化粧品使用、個室完備、送迎サービス',
            tags: ['高級', 'ラグジュアリー', '個室', '送迎']
          },
          {
            id: 'salon_local',
            businessType: '地域密着型美容院',
            businessSubType: 'アットホーム',
            category: '美容院',
            businessName: '',
            location: '住宅街・商店街',
            priceRange: '平均単価6000円',
            atmosphere: 'アットホームで親しみやすい雰囲気',
            capacity: 'スタイリスト3名',
            targetCustomer: '地域の幅広い年齢層',
            specialFeatures: '地域密着25年、お客様との距離が近い、駐車場あり、子連れ歓迎',
            tags: ['地域密着', 'アットホーム', '駐車場', '子連れ']
          }
        ]
      },
      {
        id: 'fitness',
        name: '💪 フィットネス・ジム',
        templates: [
          {
            id: 'gym_premium',
            businessType: 'プレミアムフィットネス',
            businessSubType: 'パーソナル特化',
            category: 'フィットネス',
            businessName: '',
            location: '都心・高級エリア',
            priceRange: '月額25000円',
            atmosphere: '高級感のある洗練されたジム',
            capacity: '最新マシン完備、プールあり',
            targetCustomer: '30-50代の高所得者層',
            specialFeatures: 'パーソナルトレーニング、栄養指導、プール、サウナ、エステ',
            tags: ['プレミアム', 'パーソナル', 'プール', 'エステ']
          },
          {
            id: 'gym_24h',
            businessType: '24時間フィットネス',
            businessSubType: 'セルフ型',
            category: 'フィットネス',
            businessName: '',
            location: '駅近・オフィス街',
            priceRange: '月額8800円',
            atmosphere: 'シンプルで機能的な空間',
            capacity: '24時間営業、セキュリティ完備',
            targetCustomer: '20-40代の忙しい会社員',
            specialFeatures: '24時間営業、セキュリティカード、マシン特化、シャワー完備',
            tags: ['24時間', 'セルフ', 'セキュリティ', '駅近']
          }
        ]
      }
    ]
  },
  {
    id: 'retail',
    name: '🛍️ 小売・販売',
    icon: '🛍️',
    subCategories: [
      {
        id: 'fashion',
        name: '👗 ファッション・アパレル',
        templates: [
          {
            id: 'fashion_boutique',
            businessType: 'セレクトショップ',
            businessSubType: 'レディースブティック',
            category: 'ファッション',
            businessName: '',
            location: '表参道・代官山',
            priceRange: '平均単価15000円',
            atmosphere: 'おしゃれで洗練されたブティック',
            capacity: '30坪、試着室3室',
            targetCustomer: '25-40代のファッション感度の高い女性',
            specialFeatures: '海外ブランド取扱い、スタイリング相談、オーダー対応、VIP特典',
            tags: ['セレクト', 'インポート', 'スタイリング', 'VIP']
          }
        ]
      }
    ]
  },
  {
    id: 'service',
    name: '🔧 サービス業',
    icon: '🔧',
    subCategories: [
      {
        id: 'repair',
        name: '🔧 修理・メンテナンス',
        templates: [
          {
            id: 'phone_repair',
            businessType: 'スマホ修理店',
            businessSubType: 'iPhone専門',
            category: '修理',
            businessName: '',
            location: '駅前・商業施設',
            priceRange: '平均単価8000円',
            atmosphere: '清潔で安心感のある店舗',
            capacity: '修理ブース3台、待合スペース',
            targetCustomer: '全年齢のスマホユーザー',
            specialFeatures: '即日修理、データ保護、純正部品使用、保証あり',
            tags: ['即日', 'データ保護', '純正部品', '保証']
          }
        ]
      }
    ]
  }
]

// テンプレート検索・フィルタリング機能
export function searchTemplates(keyword: string): PersonaTemplate[] {
  const results: PersonaTemplate[] = []

  businessCategories.forEach(category => {
    category.subCategories.forEach(subCategory => {
      subCategory.templates.forEach(template => {
        const searchTarget = `
          ${template.businessType}
          ${template.businessSubType}
          ${template.category}
          ${template.atmosphere}
          ${template.specialFeatures}
          ${template.tags.join(' ')}
        `.toLowerCase()

        if (searchTarget.includes(keyword.toLowerCase())) {
          results.push(template)
        }
      })
    })
  })

  return results
}

// カテゴリ別テンプレート取得
export function getTemplatesByCategory(categoryId: string): PersonaTemplate[] {
  const category = businessCategories.find(cat => cat.id === categoryId)
  if (!category) return []

  const templates: PersonaTemplate[] = []
  category.subCategories.forEach(subCategory => {
    templates.push(...subCategory.templates)
  })

  return templates
}

// タグ別テンプレート取得
export function getTemplatesByTag(tag: string): PersonaTemplate[] {
  const results: PersonaTemplate[] = []

  businessCategories.forEach(category => {
    category.subCategories.forEach(subCategory => {
      subCategory.templates.forEach(template => {
        if (template.tags.includes(tag)) {
          results.push(template)
        }
      })
    })
  })

  return results
}