"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FilterSidebar } from "@/components/FilterSidebar"

type Trainer = {
  id: string
  region: string
  specialty: string
  bio: string
  gender: string
  user: {
    name: string
    image: string | null
  }
}

export default function TrainerList({ trainers }: { trainers: Trainer[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedAreas([])
    setSelectedGender("")
    setSelectedTags([])
    setSearchQuery("")
  }

  const filtered = trainers.filter((t) => {
    const matchesName = t.user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArea = selectedAreas.length === 0 || selectedAreas.includes(t.region)
    const matchesGender = !selectedGender || t.gender === selectedGender
    const matchesTag = selectedTags.length === 0 || selectedTags.includes(t.specialty)
    return matchesName && matchesArea && matchesGender && matchesTag
  })

  const areas = ["東京", "大阪", "名古屋", "福岡", "札幌", "仙台", "広島", "沖縄"]
  const genders = ["男性", "女性", "その他"]
  const tags = [
    "ヨガ",
    "ピラティス",
    "ダイエット",
    "ボディビル",
    "有酸素運動",
    "マラソン",
    "シニアフィットネス",
    "姿勢改善",
    "リハビリ",
    "格闘技",
  ]

  return (
    <div className="flex">
      <FilterSidebar
        areas={areas}
        selectedAreas={selectedAreas}
        toggleArea={toggleArea}
        genders={genders}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        tags={tags}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        clearFilters={clearFilters}
      />

      <div className="flex-1 p-4">
        <input
          className="mb-6 w-full border rounded px-4 py-2 text-sm"
          placeholder="トレーナー名で検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trainer) => (
            <Card key={trainer.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={trainer.user.image || "/placeholder.svg"}
                  alt={trainer.user.name || "トレーナー"}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">{trainer.user.name}</h3>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.9</span>
                    <span className="ml-1 text-xs text-gray-500">(100)</span>
                  </div>
                </div>
                <div className="mb-2 flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  {trainer.region}
                </div>
                <div className="mb-3 flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {trainer.specialty}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{trainer.bio}</p>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 p-4">
                <Button asChild className="w-full">
                  <Link href={`/trainer/${encodeURIComponent(trainer.id)}`}>プロフィールを見る</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
