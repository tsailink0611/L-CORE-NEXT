import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

const CONFIG_FILE_PATH = join(process.cwd(), '.env.local')

export async function GET() {
  try {
    // Return current configuration status (without exposing actual keys)
    const envContent = readFileSync(CONFIG_FILE_PATH, 'utf-8')
    
    const hasOpenAIKey = envContent.includes('OPENAI_API_KEY=') && 
                        !envContent.includes('OPENAI_API_KEY=\n') && 
                        !envContent.includes('OPENAI_API_KEY=')
    
    const hasLINEToken = envContent.includes('LINE_CHANNEL_ACCESS_TOKEN=') && 
                        !envContent.includes('LINE_CHANNEL_ACCESS_TOKEN=\n') && 
                        !envContent.includes('LINE_CHANNEL_ACCESS_TOKEN=')

    return NextResponse.json({
      openai_configured: hasOpenAIKey,
      line_configured: hasLINEToken,
      firebase_configured: true // Already configured from earlier setup
    })
  } catch (error) {
    console.error('Error reading config:', error)
    return NextResponse.json(
      { error: 'Failed to read configuration' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { openai_api_key, line_access_token, line_channel_secret } = await request.json()

    // Read current .env.local file
    let envContent = readFileSync(CONFIG_FILE_PATH, 'utf-8')

    // Update OpenAI API key
    if (openai_api_key) {
      if (envContent.includes('OPENAI_API_KEY=')) {
        envContent = envContent.replace(/OPENAI_API_KEY=.*/, `OPENAI_API_KEY=${openai_api_key}`)
      } else {
        envContent += `\nOPENAI_API_KEY=${openai_api_key}`
      }
    }

    // Update LINE access token
    if (line_access_token) {
      if (envContent.includes('LINE_CHANNEL_ACCESS_TOKEN=')) {
        envContent = envContent.replace(/LINE_CHANNEL_ACCESS_TOKEN=.*/, `LINE_CHANNEL_ACCESS_TOKEN=${line_access_token}`)
      } else {
        envContent += `\nLINE_CHANNEL_ACCESS_TOKEN=${line_access_token}`
      }
    }

    // Update LINE channel secret
    if (line_channel_secret) {
      if (envContent.includes('LINE_CHANNEL_SECRET=')) {
        envContent = envContent.replace(/LINE_CHANNEL_SECRET=.*/, `LINE_CHANNEL_SECRET=${line_channel_secret}`)
      } else {
        envContent += `\nLINE_CHANNEL_SECRET=${line_channel_secret}`
      }
    }

    // Write updated content back to .env.local
    writeFileSync(CONFIG_FILE_PATH, envContent)

    return NextResponse.json({
      message: 'Configuration updated successfully',
      updated: {
        openai: !!openai_api_key,
        line_token: !!line_access_token,
        line_secret: !!line_channel_secret
      }
    })
  } catch (error) {
    console.error('Error updating config:', error)
    return NextResponse.json(
      { error: 'Failed to update configuration' },
      { status: 500 }
    )
  }
}