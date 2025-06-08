"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ReviewForm({ trainerId }: { trainerId: string }) {
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({
        trainerId,
        userName: "ゲストユーザー",
        userImage: null,
        comment,
        rating: 5, // ⭐ 今は仮で5固定（あとでUI追加可能）
      }),
    })

    setComment("")
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Textarea
        placeholder="レビューを入力してください"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "送信中..." : "レビューを投稿"}
      </Button>
    </form>
  )
}
