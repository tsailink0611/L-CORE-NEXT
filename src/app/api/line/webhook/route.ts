import { NextRequest, NextResponse } from 'next/server'
import { generateLineResponse } from '@/lib/openai'

// LINE Messaging API configuration
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN
const LINE_MESSAGING_API_URL = 'https://api.line.me/v2/bot/message/reply'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    console.log('LINE Webhook received:', body)

    // Parse the webhook data
    const webhookData = JSON.parse(body)

    // Handle different event types
    for (const event of webhookData.events || []) {
      console.log('Event type:', event.type)

      switch (event.type) {
        case 'message':
          await handleMessage(event)
          break
        case 'follow':
          await handleFollow(event)
          break
        case 'unfollow':
          await handleUnfollow(event)
          break
        default:
          console.log('Unhandled event type:', event.type)
      }
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('LINE Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleMessage(event: any) {
  console.log('Message event:', event)

  const userId = event.source.userId
  const replyToken = event.replyToken
  const messageText = event.message.text

  console.log(`User ${userId} sent: ${messageText}`)

  try {
    // Generate AI response using ChatGPT-5 mini
    const aiResponse = await generateLineResponse(messageText, {
      userName: userId,
      businessContext: 'L-Coreは日本の企業向けLINEマーケティング自動化プラットフォームです。'
    })

    // Send reply message via LINE Messaging API
    await sendLineReply(replyToken, aiResponse)

    console.log(`AI response sent to user ${userId}: ${aiResponse}`)
  } catch (error) {
    console.error('Error processing message:', error)
    
    // Send fallback message if AI fails
    const fallbackMessage = '申し訳ございません。現在システムに問題が発生しています。しばらく経ってからもう一度お試しください。🙏'
    await sendLineReply(replyToken, fallbackMessage)
  }
}

async function handleFollow(event: any) {
  console.log('Follow event:', event)

  const userId = event.source.userId
  const replyToken = event.replyToken
  console.log(`User ${userId} followed the bot`)

  try {
    // Generate personalized welcome message using AI
    const welcomePrompt = 'ユーザーがLINE Botをフォローしました。L-Coreプラットフォームの魅力的な歓迎メッセージを作成してください。'
    
    const welcomeMessage = await generateLineResponse(welcomePrompt, {
      userName: userId,
      businessContext: 'L-Coreは企業のLINEマーケティングを自動化する日本のプラットフォームです。'
    })

    await sendLineReply(replyToken, welcomeMessage)
    console.log(`Welcome message sent to user ${userId}`)
  } catch (error) {
    console.error('Error sending welcome message:', error)
    
    // Send fallback welcome message
    const fallbackWelcome = 'L-Core公式アカウントへようこそ！🎉\n\nLINEマーケティング自動化のお手伝いをさせていただきます。\n\nご質問やサポートが必要でしたら、いつでもメッセージをお送りください！✨'
    await sendLineReply(replyToken, fallbackWelcome)
  }
}

async function handleUnfollow(event: any) {
  console.log('Unfollow event:', event)

  const userId = event.source.userId
  console.log(`User ${userId} unfollowed the bot`)

  // Log unfollow for analytics (no reply token available for unfollows)
  // TODO: Update user status in Firestore if needed
}

/**
 * Send reply message via LINE Messaging API
 */
async function sendLineReply(replyToken: string, message: string) {
  if (!LINE_CHANNEL_ACCESS_TOKEN) {
    console.error('LINE_CHANNEL_ACCESS_TOKEN is not configured')
    return
  }

  try {
    const response = await fetch(LINE_MESSAGING_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        replyToken,
        messages: [
          {
            type: 'text',
            text: message
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('LINE API Error:', response.status, errorText)
    } else {
      console.log('LINE reply sent successfully')
    }
  } catch (error) {
    console.error('Error sending LINE reply:', error)
  }
}

/**
 * Send push message to user (for proactive messaging)
 */
export async function sendLinePushMessage(userId: string, message: string) {
  if (!LINE_CHANNEL_ACCESS_TOKEN) {
    console.error('LINE_CHANNEL_ACCESS_TOKEN is not configured')
    return false
  }

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        to: userId,
        messages: [
          {
            type: 'text',
            text: message
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('LINE Push API Error:', response.status, errorText)
      return false
    }

    console.log('LINE push message sent successfully')
    return true
  } catch (error) {
    console.error('Error sending LINE push message:', error)
    return false
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    message: 'LINE Webhook endpoint with ChatGPT-5 mini is ready',
    timestamp: new Date().toISOString(),
    features: [
      'AI-powered message responses',
      'Personalized welcome messages',
      'Smart conversation handling',
      'Fallback message support'
    ]
  })
}