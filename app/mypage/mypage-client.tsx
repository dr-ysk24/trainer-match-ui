'use client'

import { signOut } from "next-auth/react"
import Image from "next/image"

export default function MypageClient({
  session,
  trainerId,
}: {
  session: any
  trainerId: string | null
}) {
  const user = session.user

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-orange-600">マイページ</h1>

      <div className="flex items-center gap-4">
        {user?.image && (
          <Image
            src={user.image}
            alt="プロフィール画像"
            width={80}
            height={80}
            className="rounded-full"
          />
        )}
        <div>
          <p className="text-xl font-semibold">{user?.name ?? "ゲストユーザー"}</p>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="border p-4 rounded shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">基本情報</h2>
        <p><strong>ユーザーID:</strong> {user?.id}</p>
        <p><strong>ロール:</strong> {user?.role ?? "USER"}</p>
      </div>

      {user?.bio && (
        <div className="border p-4 rounded shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">自己紹介</h2>
          <p className="text-gray-700 whitespace-pre-line">{user.bio}</p>
        </div>
      )}

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          ログアウト
        </button>
        <a
          href="/mypage/edit"
          className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 text-sm"
        >
          プロフィールを編集
        </a>
        {user.role === "TRAINER" && trainerId && (
          <>
            <a
              href={`/trainer/${trainerId}`}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              トレーナーマイページへ
            </a>
            <a
              href="/trainer/edit"
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 text-sm"
            >
              トレーナープロフィールを編集
            </a>
          </>
        )}
      </div>
    </main>
  )
}
