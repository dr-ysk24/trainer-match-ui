import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import MypageClient from "./mypage-client"

export default async function Mypage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const trainerProfile = await prisma.trainerProfile.findUnique({
    where: { userId: session.user.id },
    select: { id: true }, // トレーナーIDだけ取得
  })

  return (
    <MypageClient
      session={session}
      trainerId={trainerProfile?.id ?? null}
    />
  )
}
