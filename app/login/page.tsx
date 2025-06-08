// app/login/page.tsx

'use client'

import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>ログインページ</h1>
      <p style={{ marginBottom: "1rem" }}>
        Googleアカウントを使ってログインしてください。
        <br />
        ログイン後はマイページに移動します。
      </p>
      <button
        onClick={() => signIn("google", { callbackUrl: "/mypage" })}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          background: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Googleでログイン
      </button>
    </div>
  )
}
