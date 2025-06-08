import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export default async function EditTrainerProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const profile = await prisma.trainerProfile.findUnique({
    where: { userId: session.user.id },
  })

  // ❗登録されていなければ登録ページにリダイレクト
  if (!profile) redirect("/trainer/register")

  // ✅ フォームの保存処理
  async function updateProfile(formData: FormData) {
    "use server"

    const specialty = formData.get("specialty") as string
    const bio = formData.get("bio") as string
    const region = formData.get("region") as string
// 書き換え前：この1行 ↓ を
// const hourlyRate = parseInt(formData.get("hourlyRate") as string)

// 書き換え後：以下の安全バージョンに変更！
const hourlyRateRaw = formData.get("hourlyRate")
const hourlyRate =
  typeof hourlyRateRaw === "string" && hourlyRateRaw.trim() !== ""
    ? parseInt(hourlyRateRaw)
    : null

    
    await prisma.trainerProfile.update({
      where: { id: profile.id }, // ✅ idで確実に更新
      data: {
        specialty,
        bio,
        region,
        hourlyRate,
      },
    })

    revalidatePath(`/trainer/${profile.id}`)
    redirect(`/trainer/${profile.id}`)
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">トレーナープロフィール編集</h1>

      <form action={updateProfile} className="space-y-4">
        <div>
          <label className="block font-semibold">専門分野</label>
          <input
            name="specialty"
            type="text"
            defaultValue={profile.specialty}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">自己紹介</label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={profile.bio ?? ""}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">活動エリア</label>
          <input
            name="region"
            type="text"
            defaultValue={profile.region}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">1時間あたりの料金（円）</label>
          <input
            name="hourlyRate"
            type="number"
            defaultValue={profile.hourlyRate?.toString() ?? ""}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          保存する
        </button>
      </form>
    </main>
  )
}
