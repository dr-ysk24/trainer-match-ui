// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "トレ結び",
  description: "あなたにぴったりのトレーナーが見つかるマッチングサービス",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="ja">
      <body className={inter.className}>
        {/* ✅ 共通ヘッダー */}
        <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/logo-toremusubi.png"
              alt="トレ結びロゴ"
              width={28}
              height={28}
            />
            <span className="ml-2 text-xl font-bold text-gray-900">トレ結び</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 text-sm text-gray-700">
            <Link href="#">使い方</Link>
            <Link href="/trainer-search">トレーナー一覧</Link>
            <Link href="#">料金プラン</Link>
            {session?.user ? (
              <Link
                href="/mypage"
                className="border px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                マイページ
              </Link>
            ) : (
              <Link
                href="/login"
                className="border px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                ログイン
              </Link>
            )}
          </nav>
        </header>

        {/* ✅ 各ページのコンテンツ */}
        {children}
      </body>
    </html>
  )
}
