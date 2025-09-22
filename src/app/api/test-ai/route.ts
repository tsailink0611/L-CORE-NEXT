import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // ChatGPT-5 mini相当
      messages: [
        {
          role: 'system',
          content: 'あなたはLINEマーケティングの専門家です。魅力的で親しみやすいメッセージを日本語で作成してください。絵文字も適度に使用してください。'
        },
        {
          role: 'user',
          content: prompt || '新商品のキャンペーンをお知らせする親しみやすいLINEメッセージを作成してください。'
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    })

    return NextResponse.json({
      success: true,
      message: completion.choices[0].message.content,
      usage: completion.usage
    })
  } catch (error: any) {
    console.error('AI API Error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'AI API is ready',
    endpoint: '/api/test-ai',
    method: 'POST',
    example: {
      prompt: 'お客様への感謝メッセージを作成してください'
    }
  })
}