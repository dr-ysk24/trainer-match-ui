// app/api/review/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const { trainerId, userName, userImage, rating, comment } = body

  try {
    const review = await prisma.review.create({
      data: {
        trainerId,
        userName,
        userImage,
        rating,
        comment,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("レビュー保存エラー:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
