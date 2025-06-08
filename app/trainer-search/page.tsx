import { prisma } from "@/lib/prisma"
import TrainerList from "../../components/TrainerList" // ✅ ← これに直す！

export default async function TrainerSearchPage() {
  const trainers = await prisma.trainerProfile.findMany({
    include: { user: true },
  })

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">トレーナーを探す</h1>
      <TrainerList trainers={trainers} />
    </div>
  )
}
