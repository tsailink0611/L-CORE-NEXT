'use client'

// LINE公式アカウント料金計算システム

export interface LinePricingPlan {
  id: 'free' | 'light' | 'standard'
  name: string
  monthlyFee: number
  includedMessages: number
  canPurchaseAdditional: boolean
  additionalRates?: { min: number; max: number; rate: number }[]
}

export const LINE_PRICING_PLANS: LinePricingPlan[] = [
  {
    id: 'free',
    name: '無料プラン',
    monthlyFee: 0,
    includedMessages: 200,
    canPurchaseAdditional: false
  },
  {
    id: 'light',
    name: 'ライトプラン',
    monthlyFee: 5500,
    includedMessages: 5000,
    canPurchaseAdditional: false
  },
  {
    id: 'standard',
    name: 'スタンダードプラン',
    monthlyFee: 16500,
    includedMessages: 30000,
    canPurchaseAdditional: true,
    additionalRates: [
      { min: 30001, max: 50000, rate: 3.3 },
      { min: 50001, max: 100000, rate: 3.08 },
      { min: 100001, max: 200000, rate: 2.86 },
      { min: 200001, max: 500000, rate: 2.64 },
      { min: 500001, max: 1000000, rate: 2.42 }
    ]
  }
]

export interface CostCalculation {
  baseCost: number
  additionalCost: number
  totalCost: number
  messagesUsed: number
  messagesIncluded: number
  additionalMessages: number
  plan: LinePricingPlan
  warning?: string
  canSend: boolean
}

// メッセージ通数計算
export function calculateMessageCount(recipients: number, sendCount: number = 1): number {
  return recipients * sendCount
}

// 月間コスト計算
export function calculateMonthlyCost(
  totalMessages: number,
  plan: LinePricingPlan
): CostCalculation {
  const messagesUsed = totalMessages
  const messagesIncluded = plan.includedMessages
  const additionalMessages = Math.max(0, messagesUsed - messagesIncluded)

  let additionalCost = 0
  let canSend = true
  let warning: string | undefined

  // 無料・ライトプランの制限チェック
  if (!plan.canPurchaseAdditional) {
    if (messagesUsed > messagesIncluded) {
      canSend = false
      warning = `${plan.name}では月${messagesIncluded}通が上限です。追加料金での送信はできません。`
    } else if (messagesUsed > messagesIncluded * 0.8) {
      warning = `月間上限の${Math.round((messagesUsed / messagesIncluded) * 100)}%を使用しています。`
    }
  }

  // スタンダードプランの追加料金計算
  if (plan.canPurchaseAdditional && additionalMessages > 0 && plan.additionalRates) {
    let remainingMessages = additionalMessages

    for (const rate of plan.additionalRates) {
      if (remainingMessages <= 0) break

      const rangeMessages = Math.min(
        remainingMessages,
        rate.max - rate.min + 1
      )

      additionalCost += rangeMessages * rate.rate
      remainingMessages -= rangeMessages
    }
  }

  return {
    baseCost: plan.monthlyFee,
    additionalCost: Math.round(additionalCost),
    totalCost: plan.monthlyFee + Math.round(additionalCost),
    messagesUsed,
    messagesIncluded,
    additionalMessages,
    plan,
    warning,
    canSend
  }
}

// 最適プラン提案
export function suggestOptimalPlan(monthlyMessages: number): {
  suggested: LinePricingPlan
  calculations: CostCalculation[]
  reasoning: string
} {
  const calculations = LINE_PRICING_PLANS.map(plan =>
    calculateMonthlyCost(monthlyMessages, plan)
  ).filter(calc => calc.canSend)

  // 最も安いプランを選択
  const cheapest = calculations.reduce((min, calc) =>
    calc.totalCost < min.totalCost ? calc : min
  )

  let reasoning = ''
  if (monthlyMessages <= 200) {
    reasoning = '月200通以下なので無料プランがおすすめです。'
  } else if (monthlyMessages <= 5000) {
    reasoning = 'ライトプランが最もコストパフォーマンスが良いです。'
  } else {
    reasoning = `月${monthlyMessages.toLocaleString()}通の場合、スタンダードプランが最適です。`
  }

  return {
    suggested: cheapest.plan,
    calculations,
    reasoning
  }
}

// プラン変更の影響分析
export function analyzePlanImpact(
  currentPlan: LinePricingPlan,
  newPlan: LinePricingPlan,
  monthlyMessages: number
): {
  currentCost: CostCalculation
  newCost: CostCalculation
  savings: number
  recommendation: string
} {
  const currentCost = calculateMonthlyCost(monthlyMessages, currentPlan)
  const newCost = calculateMonthlyCost(monthlyMessages, newPlan)
  const savings = currentCost.totalCost - newCost.totalCost

  let recommendation = ''
  if (savings > 0) {
    recommendation = `${newPlan.name}に変更すると月額${savings.toLocaleString()}円の節約になります。`
  } else if (savings < 0) {
    recommendation = `現在の${currentPlan.name}の方が月額${Math.abs(savings).toLocaleString()}円安いです。`
  } else {
    recommendation = '両プランのコストは同じです。'
  }

  return {
    currentCost,
    newCost,
    savings,
    recommendation
  }
}

// 配信頻度による料金シミュレーション
export function simulateFrequencyImpact(
  friendsCount: number,
  weeklyFrequency: number
): {
  weeklyMessages: number
  monthlyMessages: number
  optimalPlan: LinePricingPlan
  monthlyCost: number
  costPerMessage: number
  costPerFriend: number
} {
  const weeklyMessages = calculateMessageCount(friendsCount, weeklyFrequency)
  const monthlyMessages = weeklyMessages * 4 // 月4週として計算

  const suggestion = suggestOptimalPlan(monthlyMessages)
  const calculation = calculateMonthlyCost(monthlyMessages, suggestion.suggested)

  return {
    weeklyMessages,
    monthlyMessages,
    optimalPlan: suggestion.suggested,
    monthlyCost: calculation.totalCost,
    costPerMessage: monthlyMessages > 0 ? calculation.totalCost / monthlyMessages : 0,
    costPerFriend: calculation.totalCost / friendsCount
  }
}

// 予算制限による配信可能数計算
export function calculateMaxMessagesWithBudget(
  budget: number,
  plan: LinePricingPlan
): {
  maxMessages: number
  baseBudget: number
  additionalBudget: number
  recommendation: string
} {
  if (budget < plan.monthlyFee) {
    return {
      maxMessages: 0,
      baseBudget: budget,
      additionalBudget: 0,
      recommendation: `予算${budget.toLocaleString()}円では${plan.name}（月額${plan.monthlyFee.toLocaleString()}円）は利用できません。`
    }
  }

  const additionalBudget = budget - plan.monthlyFee
  let maxMessages = plan.includedMessages

  // 追加メッセージ計算
  if (plan.canPurchaseAdditional && additionalBudget > 0 && plan.additionalRates) {
    let remainingBudget = additionalBudget

    for (const rate of plan.additionalRates) {
      if (remainingBudget <= 0) break

      const rangeCapacity = rate.max - rate.min + 1
      const affordableInRange = Math.floor(remainingBudget / rate.rate)
      const messagesInRange = Math.min(affordableInRange, rangeCapacity)

      maxMessages += messagesInRange
      remainingBudget -= messagesInRange * rate.rate
    }
  }

  const recommendation = `予算${budget.toLocaleString()}円で月間最大${maxMessages.toLocaleString()}通配信可能です。`

  return {
    maxMessages,
    baseBudget: plan.monthlyFee,
    additionalBudget,
    recommendation
  }
}