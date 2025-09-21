import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ChatResponse {
  content: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/**
 * Generate AI response using ChatGPT-5 mini
 */
export async function generateChatResponse(
  messages: ChatMessage[],
  options?: {
    maxTokens?: number
    temperature?: number
    systemPrompt?: string
  }
): Promise<ChatResponse> {
  try {
    // Add system prompt if provided
    const fullMessages: ChatMessage[] = []
    
    if (options?.systemPrompt) {
      fullMessages.push({
        role: 'system',
        content: options.systemPrompt
      })
    }
    
    fullMessages.push(...messages)

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-mini', // ChatGPT-5 mini model
      messages: fullMessages,
      max_tokens: options?.maxTokens || 1000,
      temperature: options?.temperature || 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const content = completion.choices[0]?.message?.content || ''
    
    return {
      content,
      usage: completion.usage ? {
        prompt_tokens: completion.usage.prompt_tokens,
        completion_tokens: completion.usage.completion_tokens,
        total_tokens: completion.usage.total_tokens
      } : undefined
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error)
    
    // Handle specific error cases
    if (error.status === 401) {
      throw new Error('OpenAI API key is invalid or missing')
    } else if (error.status === 429) {
      throw new Error('OpenAI API rate limit exceeded')
    } else if (error.status === 503) {
      throw new Error('OpenAI API is temporarily unavailable')
    }
    
    throw new Error(`OpenAI API Error: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Generate LINE message response using AI
 */
export async function generateLineResponse(
  userMessage: string,
  context?: {
    userName?: string
    conversationHistory?: ChatMessage[]
    businessContext?: string
  }
): Promise<string> {
  const systemPrompt = `あなたはL-Coreプラットフォームの公式LINEボットです。
以下の特徴で応答してください：

1. 親しみやすく丁寧な日本語で応答
2. LINEメッセージとして適切な長さ（200文字以内）
3. 必要に応じて絵文字を使用
4. ユーザーの質問に具体的で役立つ回答を提供
5. L-Coreプラットフォームの機能について説明できる

${context?.businessContext ? `ビジネス情報: ${context.businessContext}` : ''}
${context?.userName ? `ユーザー名: ${context.userName}` : ''}`

  const messages: ChatMessage[] = []
  
  // Add conversation history if available
  if (context?.conversationHistory && context.conversationHistory.length > 0) {
    // Only include last 5 messages to keep context manageable
    const recentHistory = context.conversationHistory.slice(-5)
    messages.push(...recentHistory)
  }
  
  // Add current user message
  messages.push({
    role: 'user',
    content: userMessage
  })

  const response = await generateChatResponse(messages, {
    systemPrompt,
    maxTokens: 300,
    temperature: 0.8
  })

  return response.content
}

/**
 * Generate marketing message using AI
 */
export async function generateMarketingMessage(
  prompt: string,
  options?: {
    tone?: 'formal' | 'casual' | 'promotional' | 'informative'
    length?: 'short' | 'medium' | 'long'
    targetAudience?: string
    productInfo?: string
  }
): Promise<string> {
  const toneMap = {
    formal: '丁寧で礼儀正しい',
    casual: 'フレンドリーでカジュアル',
    promotional: '魅力的で説得力のある',
    informative: '情報豊富で教育的'
  }

  const lengthMap = {
    short: '100文字以内',
    medium: '200文字以内',
    long: '400文字以内'
  }

  const systemPrompt = `あなたはプロのマーケティングライターです。
以下の条件でLINEメッセージを作成してください：

- 口調: ${toneMap[options?.tone || 'casual']}
- 長さ: ${lengthMap[options?.length || 'medium']}
- ターゲット: ${options?.targetAudience || '一般ユーザー'}
- 製品情報: ${options?.productInfo || 'L-Coreプラットフォーム'}

効果的で魅力的なメッセージを作成し、適切な絵文字も含めてください。`

  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: prompt
    }
  ]

  const response = await generateChatResponse(messages, {
    systemPrompt,
    maxTokens: 500,
    temperature: 0.9
  })

  return response.content
}

/**
 * Analyze message sentiment and suggest improvements
 */
export async function analyzeMessage(
  message: string
): Promise<{
  sentiment: 'positive' | 'neutral' | 'negative'
  suggestions: string[]
  score: number
}> {
  const systemPrompt = `メッセージの感情分析を行い、改善提案を日本語で提供してください。
以下のJSON形式で回答してください：

{
  "sentiment": "positive" | "neutral" | "negative",
  "score": 0-100の数値,
  "suggestions": ["改善提案1", "改善提案2", ...]
}`

  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: `以下のメッセージを分析してください：\n\n${message}`
    }
  ]

  const response = await generateChatResponse(messages, {
    systemPrompt,
    maxTokens: 400,
    temperature: 0.3
  })

  try {
    return JSON.parse(response.content)
  } catch (error) {
    console.error('Failed to parse sentiment analysis:', error)
    return {
      sentiment: 'neutral',
      suggestions: ['分析に失敗しました'],
      score: 50
    }
  }
}

export default openai