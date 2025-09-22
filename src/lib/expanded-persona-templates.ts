// 大幅拡張版ペルソナテンプレートデータベース

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

export const expandedBusinessCategories: BusinessCategory[] = [
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
          },
          {
            id: 'yakiniku_wagyu',
            businessType: '和牛専門店',
            businessSubType: 'ブランド和牛',
            category: '焼肉',
            businessName: '',
            location: '都心・高級エリア',
            priceRange: '客単価9500円',
            atmosphere: 'モダンで洗練された空間',
            capacity: '32席（テーブル・個室）',
            targetCustomer: '30-50代の食通・グルメ層',
            specialFeatures: '各地ブランド和牛、希少部位、ワインペアリング、グルメ志向',
            tags: ['ブランド和牛', '希少部位', 'ワイン', 'グルメ']
          }
        ]
      },
      {
        id: 'izakaya',
        name: '🍻 居酒屋',
        templates: [
          {
            id: 'izakaya_premium',
            businessType: '高級居酒屋',
            businessSubType: '日本酒専門',
            category: '居酒屋',
            businessName: '',
            location: '都心・繁華街',
            priceRange: '客単価5500円',
            atmosphere: '和モダンで上質な空間',
            capacity: '32席（カウンター・個室あり）',
            targetCustomer: '30-50代の大人の客層',
            specialFeatures: '厳選日本酒、季節の鮮魚、個室完備、接待利用可',
            tags: ['高級', '日本酒', '接待', '個室', '鮮魚']
          },
          {
            id: 'izakaya_casual',
            businessType: 'カジュアル居酒屋',
            businessSubType: 'チェーン系',
            category: '居酒屋',
            businessName: '',
            location: '駅前・オフィス街',
            priceRange: '客単価2800円',
            atmosphere: '気軽で賑やかな雰囲気',
            capacity: '80席（テーブル席中心）',
            targetCustomer: '20-40代のサラリーマン・学生',
            specialFeatures: '豊富なドリンク、定番メニュー、宴会プラン、深夜営業',
            tags: ['カジュアル', 'チェーン', '宴会', '深夜営業']
          },
          {
            id: 'izakaya_local',
            businessType: '地元居酒屋',
            businessSubType: 'アットホーム',
            category: '居酒屋',
            businessName: '',
            location: '住宅街・商店街',
            priceRange: '客単価3200円',
            atmosphere: 'アットホームで親しみやすい',
            capacity: '24席（カウンター・小上がり）',
            targetCustomer: '地域の常連客、幅広い年齢層',
            specialFeatures: '手作り料理、地元食材、常連客重視、家庭的な雰囲気',
            tags: ['地域密着', '手作り', '常連', 'アットホーム']
          },
          {
            id: 'izakaya_seafood',
            businessType: '海鮮居酒屋',
            businessSubType: '鮮魚専門',
            category: '居酒屋',
            businessName: '',
            location: '港町・繁華街',
            priceRange: '客単価4200円',
            atmosphere: '活気のある漁港の雰囲気',
            capacity: '48席（カウンター・テーブル）',
            targetCustomer: '30-50代の海鮮好き',
            specialFeatures: '朝獲れ鮮魚、刺身盛り合わせ、魚の煮付け、漁港直送',
            tags: ['海鮮', '鮮魚', '刺身', '漁港直送']
          }
        ]
      },
      {
        id: 'western',
        name: '🍝 洋食・イタリアン',
        templates: [
          {
            id: 'italian_fine',
            businessType: '高級イタリアン',
            businessSubType: 'ファインダイニング',
            category: '洋食',
            businessName: '',
            location: '都心・高級エリア',
            priceRange: '客単価8500円',
            atmosphere: 'エレガントで洗練された空間',
            capacity: '28席（テーブル席のみ）',
            targetCustomer: '30-50代の富裕層・カップル',
            specialFeatures: 'シェフ特製コース、ワインペアリング、記念日利用、個室あり',
            tags: ['高級', 'コース', 'ワイン', '記念日', 'シェフ']
          },
          {
            id: 'italian_casual',
            businessType: 'カジュアルイタリアン',
            businessSubType: 'トラットリア',
            category: '洋食',
            businessName: '',
            location: '住宅街・駅前',
            priceRange: '客単価2200円',
            atmosphere: 'カジュアルで親しみやすい',
            capacity: '45席（テーブル席中心）',
            targetCustomer: 'ファミリー・カップル・友人同士',
            specialFeatures: '石窯ピザ、パスタ、ランチセット、テイクアウト可',
            tags: ['カジュアル', 'ピザ', 'パスタ', 'ランチ', 'テイクアウト']
          },
          {
            id: 'bistro',
            businessType: 'ビストロ',
            businessSubType: 'フレンチカジュアル',
            category: '洋食',
            businessName: '',
            location: '住宅街・おしゃれエリア',
            priceRange: '客単価3800円',
            atmosphere: 'おしゃれで落ち着いた大人の空間',
            capacity: '22席（カウンター・テーブル）',
            targetCustomer: '25-45代の大人の客層',
            specialFeatures: 'フレンチ技法、ワイン充実、デート利用、おしゃれな内装',
            tags: ['フレンチ', 'ワイン', 'デート', 'おしゃれ']
          },
          {
            id: 'steakhouse',
            businessType: 'ステーキハウス',
            businessSubType: 'グリル専門',
            category: '洋食',
            businessName: '',
            location: '都心・商業エリア',
            priceRange: '客単価5500円',
            atmosphere: 'アメリカンでカジュアル',
            capacity: '60席（テーブル席中心）',
            targetCustomer: '30-50代男性、グループ利用',
            specialFeatures: '厚切りステーキ、サラダバー、ボリューム満点、アメリカン',
            tags: ['ステーキ', 'アメリカン', 'ボリューム', 'グループ']
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
          },
          {
            id: 'cafe_dessert',
            businessType: 'スイーツカフェ',
            businessSubType: 'パティスリー併設',
            category: 'カフェ',
            businessName: '',
            location: '住宅街・ショッピングエリア',
            priceRange: '客単価1500円',
            atmosphere: '可愛らしく女性向けの空間',
            capacity: '32席（テーブル席中心）',
            targetCustomer: '20-40代女性、カップル',
            specialFeatures: '手作りケーキ、季節限定スイーツ、Instagram映え、テイクアウト',
            tags: ['スイーツ', 'Instagram', '女性向け', 'テイクアウト']
          },
          {
            id: 'cafe_book',
            businessType: 'ブックカフェ',
            businessSubType: '本と珈琲',
            category: 'カフェ',
            businessName: '',
            location: '住宅街・学生街',
            priceRange: '客単価900円',
            atmosphere: '静かで読書に集中できる空間',
            capacity: '35席（個人席中心）',
            targetCustomer: '読書好き、学生、フリーランス',
            specialFeatures: '豊富な書籍、静かな環境、長時間利用OK、Wi-Fi完備',
            tags: ['読書', '静か', '長時間', '学習']
          }
        ]
      },
      {
        id: 'bar',
        name: '🍸 バー・レストランバー',
        templates: [
          {
            id: 'bar_cocktail',
            businessType: 'カクテルバー',
            businessSubType: 'オーセンティック',
            category: 'バー',
            businessName: '',
            location: '都心・繁華街',
            priceRange: '客単価4500円',
            atmosphere: '大人の落ち着いた高級感のある空間',
            capacity: '16席（カウンター中心）',
            targetCustomer: '30-50代の大人の客層',
            specialFeatures: 'クラフトカクテル、ウイスキー充実、バーテンダーとの会話、深夜営業',
            tags: ['カクテル', 'ウイスキー', '大人', '深夜営業']
          },
          {
            id: 'wine_bar',
            businessType: 'ワインバー',
            businessSubType: 'ビストロスタイル',
            category: 'バー',
            businessName: '',
            location: '住宅街・おしゃれエリア',
            priceRange: '客単価3800円',
            atmosphere: 'おしゃれでカジュアルな大人の空間',
            capacity: '28席（テーブル・カウンター）',
            targetCustomer: '25-45代のワイン好き',
            specialFeatures: 'ワイン豊富、チーズ・前菜充実、ソムリエ在籍、デート利用',
            tags: ['ワイン', 'チーズ', 'デート', 'ソムリエ']
          },
          {
            id: 'sports_bar',
            businessType: 'スポーツバー',
            businessSubType: 'エンターテイメント',
            category: 'バー',
            businessName: '',
            location: '駅前・繁華街',
            priceRange: '客単価2800円',
            atmosphere: '賑やかで活気のある空間',
            capacity: '60席（テーブル席中心）',
            targetCustomer: '20-40代のスポーツファン',
            specialFeatures: '大型スクリーン、スポーツ中継、ビール充実、グループ利用',
            tags: ['スポーツ', 'ビール', 'グループ', '大型スクリーン']
          },
          {
            id: 'sake_bar',
            businessType: '日本酒バー',
            businessSubType: '地酒専門',
            category: 'バー',
            businessName: '',
            location: '繁華街・和食エリア',
            priceRange: '客単価4200円',
            atmosphere: '和の落ち着いた雰囲気',
            capacity: '20席（カウンター中心）',
            targetCustomer: '30-50代の日本酒好き',
            specialFeatures: '全国の地酒、利き酒セット、和の肴、日本酒の知識豊富',
            tags: ['日本酒', '地酒', '利き酒', '和の肴']
          }
        ]
      },
      {
        id: 'sushi',
        name: '🍣 寿司・和食',
        templates: [
          {
            id: 'sushi_premium',
            businessType: '高級寿司店',
            businessSubType: '江戸前寿司',
            category: '寿司',
            businessName: '',
            location: '都心・高級エリア',
            priceRange: '客単価15000円',
            atmosphere: '格式高く洗練された和の空間',
            capacity: '10席（カウンターのみ）',
            targetCustomer: '40-60代の富裕層',
            specialFeatures: '厳選鮮魚、職人技、おまかせコース、接待利用、予約制',
            tags: ['高級', '職人', 'おまかせ', '接待', '予約制']
          },
          {
            id: 'sushi_kaiten',
            businessType: '回転寿司',
            businessSubType: 'ファミリー向け',
            category: '寿司',
            businessName: '',
            location: '郊外・ショッピングモール',
            priceRange: '客単価1500円',
            atmosphere: '明るく家族向けの空間',
            capacity: '80席（カウンター・テーブル）',
            targetCustomer: 'ファミリー層、幅広い年齢',
            specialFeatures: '回転レーン、豊富なメニュー、サイドメニュー充実、子供料金',
            tags: ['回転寿司', 'ファミリー', 'サイドメニュー', '子供料金']
          },
          {
            id: 'washoku',
            businessType: '和食レストラン',
            businessSubType: '会席料理',
            category: '和食',
            businessName: '',
            location: '住宅街・料亭街',
            priceRange: '客単価6500円',
            atmosphere: '落ち着いた和の趣のある空間',
            capacity: '24席（個室・座敷あり）',
            targetCustomer: '40-60代、接待・記念日利用',
            specialFeatures: '季節の会席、個室完備、接待利用、記念日プラン、和の空間',
            tags: ['会席', '個室', '接待', '記念日', '季節料理']
          },
          {
            id: 'tempura',
            businessType: '天ぷら専門店',
            businessSubType: '江戸前天ぷら',
            category: '和食',
            businessName: '',
            location: '都心・和食街',
            priceRange: '客単価7200円',
            atmosphere: '職人技を間近で見られるカウンター',
            capacity: '14席（カウンター中心）',
            targetCustomer: '40-60代の和食好き',
            specialFeatures: '揚げたて天ぷら、季節の素材、職人の技、上質な空間',
            tags: ['天ぷら', '職人', '揚げたて', '季節素材']
          }
        ]
      },
      {
        id: 'korean',
        name: '🌶️ 韓国料理',
        templates: [
          {
            id: 'korean_bbq',
            businessType: '韓国焼肉店',
            businessSubType: 'サムギョプサル専門',
            category: '韓国料理',
            businessName: '',
            location: 'コリアンタウン・繁華街',
            priceRange: '客単価3200円',
            atmosphere: '本格的な韓国の雰囲気',
            capacity: '48席（テーブル席中心）',
            targetCustomer: '20-40代、韓国料理好き',
            specialFeatures: '本格サムギョプサル、キムチ食べ放題、韓国ドリンク、賑やかな雰囲気',
            tags: ['韓国焼肉', 'サムギョプサル', 'キムチ', '本格']
          },
          {
            id: 'korean_hotpot',
            businessType: '韓国鍋専門店',
            businessSubType: 'チゲ・スンドゥブ',
            category: '韓国料理',
            businessName: '',
            location: '住宅街・駅前',
            priceRange: '客単価2400円',
            atmosphere: 'カジュアルで温かみのある空間',
            capacity: '32席（テーブル席中心）',
            targetCustomer: '20-50代女性中心',
            specialFeatures: '各種チゲ、スンドゥブ、石焼ビビンバ、ヘルシー志向',
            tags: ['チゲ', 'スンドゥブ', 'ヘルシー', '女性向け']
          },
          {
            id: 'korean_chicken',
            businessType: '韓国チキン専門店',
            businessSubType: 'フライドチキン',
            category: '韓国料理',
            businessName: '',
            location: '繁華街・学生街',
            priceRange: '客単価2000円',
            atmosphere: 'カジュアルで若者向け',
            capacity: '40席（テーブル席中心）',
            targetCustomer: '20-30代の若者',
            specialFeatures: '韓国フライドチキン、各種ソース、ビール、テイクアウト可',
            tags: ['フライドチキン', '若者向け', 'ビール', 'テイクアウト']
          },
          {
            id: 'korean_bbq_premium',
            businessType: '高級韓国焼肉',
            businessSubType: '韓牛専門',
            category: '韓国料理',
            businessName: '',
            location: '都心・高級エリア',
            priceRange: '客単価6800円',
            atmosphere: 'モダンで洗練された韓国スタイル',
            capacity: '36席（個室・テーブル）',
            targetCustomer: '30-50代の高所得層',
            specialFeatures: '韓牛、高級部位、個室完備、接待利用可',
            tags: ['高級', '韓牛', '個室', '接待']
          }
        ]
      },
      {
        id: 'chinese',
        name: '🥟 中華料理',
        templates: [
          {
            id: 'chinese_premium',
            businessType: '高級中華料理店',
            businessSubType: '北京料理',
            category: '中華料理',
            businessName: '',
            location: '都心・ホテル内',
            priceRange: '客単価8000円',
            atmosphere: '格式高い中華の雰囲気',
            capacity: '60席（個室・円卓あり）',
            targetCustomer: '40-60代、接待・宴会利用',
            specialFeatures: '本格北京料理、北京ダック、個室完備、接待利用、宴会プラン',
            tags: ['高級', '北京ダック', '接待', '宴会', '個室']
          },
          {
            id: 'chinese_casual',
            businessType: '町中華',
            businessSubType: '大衆中華',
            category: '中華料理',
            businessName: '',
            location: '住宅街・商店街',
            priceRange: '客単価1200円',
            atmosphere: 'アットホームで庶民的',
            capacity: '28席（テーブル席中心）',
            targetCustomer: '地域住民、幅広い年齢層',
            specialFeatures: 'ラーメン、チャーハン、餃子、定食メニュー、ボリューム満点',
            tags: ['町中華', 'ラーメン', '餃子', 'ボリューム', '地域密着']
          },
          {
            id: 'dim_sum',
            businessType: '飲茶専門店',
            businessSubType: '点心・飲茶',
            category: '中華料理',
            businessName: '',
            location: 'チャイナタウン・商業施設',
            priceRange: '客単価2800円',
            atmosphere: '本格的な飲茶レストラン',
            capacity: '80席（円卓中心）',
            targetCustomer: 'ファミリー、グループ利用',
            specialFeatures: '各種点心、飲茶セット、ワゴンサービス、お茶充実',
            tags: ['飲茶', '点心', 'ワゴン', 'お茶', 'グループ']
          },
          {
            id: 'chinese_sichuan',
            businessType: '四川料理専門店',
            businessSubType: '本格四川',
            category: '中華料理',
            businessName: '',
            location: '都心・中華街',
            priceRange: '客単価3500円',
            atmosphere: 'スパイシーで活気のある空間',
            capacity: '40席（テーブル席中心）',
            targetCustomer: '辛い物好き、20-40代',
            specialFeatures: '本格四川料理、麻婆豆腐、担々麺、激辛メニュー',
            tags: ['四川', '辛い', '麻婆豆腐', '担々麺']
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
          },
          {
            id: 'ramen_miso',
            businessType: '味噌ラーメン専門店',
            businessSubType: '札幌味噌',
            category: 'ラーメン',
            businessName: '',
            location: '住宅街・オフィス街',
            priceRange: '客単価1000円',
            atmosphere: 'カジュアルで温かみのある空間',
            capacity: '20席（カウンター・テーブル）',
            targetCustomer: '20-50代、幅広い層',
            specialFeatures: '札幌味噌ラーメン、コク深いスープ、もやし・コーン、温かい雰囲気',
            tags: ['味噌', '札幌', 'もやし', 'コーン', '温かい']
          },
          {
            id: 'ramen_premium',
            businessType: '高級ラーメン店',
            businessSubType: 'ミシュラン系',
            category: 'ラーメン',
            businessName: '',
            location: '都心・グルメエリア',
            priceRange: '客単価2200円',
            atmosphere: 'モダンで上質な空間',
            capacity: '12席（カウンターのみ）',
            targetCustomer: 'グルメ志向、30-50代',
            specialFeatures: '厳選素材、職人技、限定メニュー、予約制',
            tags: ['高級', 'ミシュラン', '職人', '限定', '予約制']
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
        name: '✂️ 美容院・ヘアサロン',
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
          },
          {
            id: 'salon_trendy',
            businessType: 'トレンドサロン',
            businessSubType: '若者向け',
            category: '美容院',
            businessName: '',
            location: '原宿・渋谷',
            priceRange: '平均単価8500円',
            atmosphere: 'おしゃれでトレンド感のある空間',
            capacity: 'スタイリスト6名',
            targetCustomer: '10-30代の若い女性',
            specialFeatures: '最新トレンド、SNS映え、カラー専門、学割あり',
            tags: ['トレンド', 'SNS映え', 'カラー', '学割']
          },
          {
            id: 'salon_men',
            businessType: 'メンズサロン',
            businessSubType: '男性専門',
            category: '美容院',
            businessName: '',
            location: 'オフィス街・駅前',
            priceRange: '平均単価4500円',
            atmosphere: 'スタイリッシュで男性向け',
            capacity: 'スタイリスト4名',
            targetCustomer: '20-50代の男性',
            specialFeatures: 'メンズカット専門、短時間施術、スタイリング指導、平日割引',
            tags: ['メンズ', '短時間', 'スタイリング', '平日割引']
          }
        ]
      },
      {
        id: 'barber',
        name: '💈 理容室・バーバー',
        templates: [
          {
            id: 'barber_traditional',
            businessType: '老舗理容店',
            businessSubType: '伝統的な理容',
            category: '理容室',
            businessName: '',
            location: '商店街・住宅街',
            priceRange: '平均単価3200円',
            atmosphere: '昔ながらの落ち着いた雰囲気',
            capacity: '理容師2名、顔剃り台2台',
            targetCustomer: '40-70代の男性',
            specialFeatures: '顔剃り、シェービング、マッサージ、昔ながらの技術',
            tags: ['伝統', '顔剃り', 'シェービング', 'マッサージ']
          },
          {
            id: 'barber_modern',
            businessType: 'モダンバーバー',
            businessSubType: 'バーバースタイル',
            category: '理容室',
            businessName: '',
            location: '都心・おしゃれエリア',
            priceRange: '平均単価5500円',
            atmosphere: 'モダンでスタイリッシュ',
            capacity: 'バーバー3名',
            targetCustomer: '20-40代の男性',
            specialFeatures: 'フェードカット、ひげスタイリング、アメリカンスタイル、おしゃれな内装',
            tags: ['モダン', 'フェード', 'ひげ', 'アメリカン']
          }
        ]
      },
      {
        id: 'nail',
        name: '💅 ネイルサロン',
        templates: [
          {
            id: 'nail_premium',
            businessType: '高級ネイルサロン',
            businessSubType: 'プレミアムネイル',
            category: 'ネイル',
            businessName: '',
            location: '銀座・表参道',
            priceRange: '平均単価12000円',
            atmosphere: 'ラグジュアリーで上質な空間',
            capacity: 'ネイリスト4名、個室あり',
            targetCustomer: '20-40代の高所得女性',
            specialFeatures: '高級ジェル、アート技術、個室対応、ハンドケア充実',
            tags: ['高級', 'アート', '個室', 'ハンドケア']
          },
          {
            id: 'nail_casual',
            businessType: 'カジュアルネイルサロン',
            businessSubType: 'リーズナブル',
            category: 'ネイル',
            businessName: '',
            location: '住宅街・駅前',
            priceRange: '平均単価4500円',
            atmosphere: 'カジュアルで親しみやすい',
            capacity: 'ネイリスト3名',
            targetCustomer: '20-40代女性、学生',
            specialFeatures: 'リーズナブル価格、定額制、シンプルデザイン、学割あり',
            tags: ['リーズナブル', '定額制', 'シンプル', '学割']
          },
          {
            id: 'nail_trendy',
            businessType: 'トレンドネイルサロン',
            businessSubType: 'デザイン重視',
            category: 'ネイル',
            businessName: '',
            location: '原宿・新宿',
            priceRange: '平均単価7500円',
            atmosphere: 'おしゃれでトレンド感のある空間',
            capacity: 'ネイリスト5名',
            targetCustomer: '10-30代の流行好き女性',
            specialFeatures: '最新デザイン、SNS映え、季節限定、Instagram投稿割引',
            tags: ['トレンド', 'デザイン', 'SNS映え', '季節限定']
          }
        ]
      },
      {
        id: 'esthetic',
        name: '🌸 エステ・フェイシャル',
        templates: [
          {
            id: 'esthetic_premium',
            businessType: '高級エステサロン',
            businessSubType: 'フルコースエステ',
            category: 'エステ',
            businessName: '',
            location: '都心・高級エリア',
            priceRange: '平均単価18000円',
            atmosphere: 'ラグジュアリーでリラックス空間',
            capacity: 'エステティシャン6名、個室6室',
            targetCustomer: '30-50代の高所得女性',
            specialFeatures: '最新美容機器、オーダーメイドコース、アフターケア充実、個室完備',
            tags: ['高級', '最新機器', 'オーダーメイド', '個室']
          },
          {
            id: 'esthetic_facial',
            businessType: 'フェイシャル専門サロン',
            businessSubType: 'フェイシャルケア',
            category: 'エステ',
            businessName: '',
            location: '住宅街・駅前',
            priceRange: '平均単価8500円',
            atmosphere: '清潔で落ち着いたサロン',
            capacity: 'エステティシャン3名、施術室3室',
            targetCustomer: '20-50代女性',
            specialFeatures: 'フェイシャル専門、肌質改善、毛穴ケア、リラクゼーション',
            tags: ['フェイシャル', '肌質改善', '毛穴ケア', 'リラクゼーション']
          },
          {
            id: 'esthetic_diet',
            businessType: '痩身エステサロン',
            businessSubType: 'ダイエット特化',
            category: 'エステ',
            businessName: '',
            location: '駅前・商業エリア',
            priceRange: '平均単価12000円',
            atmosphere: 'モダンで清潔感のある空間',
            capacity: 'エステティシャン4名、マシン室3室',
            targetCustomer: '20-40代のダイエット志向女性',
            specialFeatures: '痩身マシン、セルライトケア、食事指導、結果重視',
            tags: ['痩身', 'ダイエット', 'セルライト', '結果重視']
          }
        ]
      },
      {
        id: 'massage',
        name: '🤲 マッサージ・整体',
        templates: [
          {
            id: 'massage_relaxation',
            businessType: 'リラクゼーションサロン',
            businessSubType: 'アロママッサージ',
            category: 'マッサージ',
            businessName: '',
            location: '住宅街・駅前',
            priceRange: '平均単価4500円',
            atmosphere: 'リラックスできる癒しの空間',
            capacity: 'セラピスト4名、施術室4室',
            targetCustomer: '疲れを癒したい20-50代',
            specialFeatures: 'アロマオイル、リラクゼーション、疲労回復、ストレス解消',
            tags: ['アロマ', 'リラクゼーション', '疲労回復', 'ストレス解消']
          },
          {
            id: 'massage_therapy',
            businessType: '整体・治療院',
            businessSubType: '治療系マッサージ',
            category: 'マッサージ',
            businessName: '',
            location: '住宅街・駅前',
            priceRange: '平均単価3800円',
            atmosphere: '清潔で治療に特化した空間',
            capacity: '柔道整復師2名、施術室3室',
            targetCustomer: '肩こり・腰痛に悩む30-60代',
            specialFeatures: '肩こり・腰痛改善、姿勢矯正、保険適用、治療実績豊富',
            tags: ['治療', '肩こり', '腰痛', '保険適用']
          },
          {
            id: 'massage_thai',
            businessType: 'タイ古式マッサージ',
            businessSubType: '本格タイ式',
            category: 'マッサージ',
            businessName: '',
            location: '繁華街・エスニックエリア',
            priceRange: '平均単価3200円',
            atmosphere: '本格的なタイの雰囲気',
            capacity: 'タイ人セラピスト3名',
            targetCustomer: 'エスニック好き、20-50代',
            specialFeatures: '本格タイ古式、ストレッチ重視、タイ人施術者、リーズナブル',
            tags: ['タイ古式', 'ストレッチ', 'タイ人', 'リーズナブル']
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
          },
          {
            id: 'gym_personal',
            businessType: 'パーソナルジム',
            businessSubType: 'マンツーマン',
            category: 'フィットネス',
            businessName: '',
            location: '住宅街・駅前',
            priceRange: '月額80000円',
            atmosphere: 'プライベートで集中できる空間',
            capacity: 'トレーナー3名、個室3室',
            targetCustomer: '結果を求める20-40代',
            specialFeatures: 'マンツーマン指導、食事管理、短期集中、結果保証',
            tags: ['パーソナル', '食事管理', '短期集中', '結果保証']
          },
          {
            id: 'gym_women',
            businessType: '女性専用フィットネス',
            businessSubType: 'レディースジム',
            category: 'フィットネス',
            businessName: '',
            location: '住宅街・駅前',
            priceRange: '月額12000円',
            atmosphere: '女性が安心して通える明るい空間',
            capacity: '女性専用、託児所あり',
            targetCustomer: '20-50代の女性',
            specialFeatures: '女性専用、託児サービス、ヨガ・ピラティス、美容効果重視',
            tags: ['女性専用', '託児', 'ヨガ', '美容効果']
          }
        ]
      }
    ]
  }
]

// 既存の検索・フィルタリング機能（expandedBusinessCategoriesに対応）
export function searchExpandedTemplates(keyword: string): PersonaTemplate[] {
  const results: PersonaTemplate[] = []

  expandedBusinessCategories.forEach(category => {
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

export function getExpandedTemplatesByCategory(categoryId: string): PersonaTemplate[] {
  const category = expandedBusinessCategories.find(cat => cat.id === categoryId)
  if (!category) return []

  const templates: PersonaTemplate[] = []
  category.subCategories.forEach(subCategory => {
    templates.push(...subCategory.templates)
  })

  return templates
}

export function getExpandedTemplatesByTag(tag: string): PersonaTemplate[] {
  const results: PersonaTemplate[] = []

  expandedBusinessCategories.forEach(category => {
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