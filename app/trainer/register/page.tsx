import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function RegisterTrainerPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const existingProfile = await prisma.trainerProfile.findUnique({
    where: { userId: session.user.id },
  })

  if (existingProfile) {
    redirect("/mypage") // 登録済ならマイページに戻す
  }

  async function register(formData: FormData) {
    "use server"

    const specialty = formData.get("specialty") as string
    const bio = formData.get("bio") as string
    const region = formData.get("region") as string
    const hourlyRate = parseInt(formData.get("hourlyRate") as string)

    await prisma.trainerProfile.create({
      data: {
        userId: session.user.id,
        specialty,
        bio,
        region,
      },
    })

    // ユーザーロールを trainer に変更（任意）
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "TRAINER" },
    })

    redirect("/mypage")
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">トレーナー登録</h1>
      <form action={register} className="space-y-4">
        <div>
          <label className="block font-semibold">専門分野</label>
          <input name="specialty" type="text" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold">自己紹介</label>
          <textarea name="bio" rows={4} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold">活動エリア</label>
          <input name="region" type="text" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold">1時間あたりの料金（円）</label>
          <input name="hourlyRate" type="number" required className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
          登録する
        </button>
      </form>
    </main>
  )
}
