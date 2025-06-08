import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export default async function EditUserPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  async function updateUser(formData: FormData) {
    "use server"

    const name = formData.get("name") as string
    const image = formData.get("image") as string
    const bio = formData.get("bio") as string

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        image,
        bio,
      },
    })

    revalidatePath("/mypage")
    redirect("/mypage")
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">プロフィール編集</h1>

      <form action={updateUser} className="space-y-4">
        <div>
          <label className="block font-semibold">表示名</label>
          <input
            name="name"
            type="text"
            defaultValue={user?.name ?? ""}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">画像URL</label>
          <input
            name="image"
            type="text"
            defaultValue={user?.image ?? ""}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">自己紹介</label>
          <textarea
            name="bio"
            defaultValue={user?.bio ?? ""}
            rows={4}
            className="w-full border rounded px-3 py-2"
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
