import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import ClientNavigation from '@/components/ClientNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'L-Core - LINE連携プラットフォーム',
  description: 'プロフェッショナルLINE連携・メッセージ管理プラットフォーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <AuthProvider>
          <ClientNavigation />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="text-center text-sm text-gray-500">
                © 2024 L-Core. プロフェッショナルLINE連携プラットフォーム
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}