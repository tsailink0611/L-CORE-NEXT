import { NextRequest, NextResponse } from 'next/server'

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
  const messageText = event.message.text

  console.log(`User ${userId} sent: ${messageText}`)

  // TODO: Process message with AI and send response
  // This will be implemented when ChatGPT-5 mini API is provided
}

async function handleFollow(event: any) {
  console.log('Follow event:', event)

  const userId = event.source.userId
  console.log(`User ${userId} followed the bot`)

  // TODO: Send welcome message
}

async function handleUnfollow(event: any) {
  console.log('Unfollow event:', event)

  const userId = event.source.userId
  console.log(`User ${userId} unfollowed the bot`)

  // TODO: Clean up user data if needed
}

// Verify LINE signature (for security)
export async function GET() {
  return NextResponse.json({
    message: 'LINE Webhook endpoint is ready',
    timestamp: new Date().toISOString()
  })
}