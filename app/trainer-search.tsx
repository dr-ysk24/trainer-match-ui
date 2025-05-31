"use client"

import * as React from "react"
import { Check, ChevronDown, Filter, MapPin, Search, Star } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar"

// Sample trainer data
const trainers = [
  {
    id: 1,
    name: "田中 健太",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 124,
    area: "東京",
    gender: "男性",
    tags: ["ウェイトトレーニング", "ボディビル", "ダイエット"],
    description: "10年以上の経験を持つトレーナー。筋肉増強とボディメイクが専門。",
  },
  {
    id: 2,
    name: "佐藤 美咲",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 98,
    area: "大阪",
    gender: "女性",
    tags: ["ヨガ", "ピラティス", "産後トレーニング"],
    description: "ヨガインストラクターの資格を持ち、女性に特化したトレーニングを提供。",
  },
  {
    id: 3,
    name: "鈴木 大輔",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 87,
    area: "東京",
    gender: "男性",
    tags: ["マラソン", "ランニング", "有酸素運動"],
    description: "元プロアスリート。マラソン完走を目指す方のサポートが得意。",
  },
  {
    id: 4,
    name: "山田 恵子",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 156,
    area: "福岡",
    gender: "女性",
    tags: ["ダイエット", "食事指導", "姿勢改善"],
    description: "栄養士の資格も持つトレーナー。食事と運動の両面からサポート。",
  },
  {
    id: 5,
    name: "伊藤 隆",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 65,
    area: "名古屋",
    gender: "男性",
    tags: ["格闘技", "機能的トレーニング", "コアトレーニング"],
    description: "格闘技の経験を活かした機能的なトレーニングが特徴。",
  },
  {
    id: 6,
    name: "高橋 由美",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 112,
    area: "大阪",
    gender: "女性",
    tags: ["シニアフィットネス", "リハビリ", "柔軟性向上"],
    description: "高齢者や怪我からの回復を目指す方向けのトレーニングが得意。",
  },
]

// Filter options
const areas = ["東京", "大阪", "名古屋", "福岡", "札幌", "仙台", "広島", "沖縄"]
const genders = ["男性", "女性", "その他"]
const tags = [
  "ウェイトトレーニング",
  "ボディビル",
  "ダイエット",
  "ヨガ",
  "ピラティス",
  "産後トレーニング",
  "マラソン",
  "ランニング",
  "有酸素運動",
  "食事指導",
  "姿勢改善",
  "格闘技",
  "機能的トレーニング",
  "コアトレーニング",
  "シニアフィットネス",
  "リハビリ",
  "柔軟性向上",
]

export default function TrainerSearch() {
  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([])
  const [selectedGender, setSelectedGender] = React.useState<string>("")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  // Filter trainers based on selected filters
  const filteredTrainers = trainers.filter((trainer) => {
    // Filter by search query
    if (
      searchQuery &&
      !trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !trainer.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by area
    if (selectedAreas.length > 0 && !selectedAreas.includes(trainer.area)) {
      return false
    }

    // Filter by gender
    if (selectedGender && trainer.gender !== selectedGender) {
      return false
    }

    // Filter by tags
    if (selectedTags.length > 0 && !trainer.tags.some((tag) => selectedTags.includes(tag))) {
      return false
    }

    return true
  })

  // Toggle area selection
  const toggleArea = (area: string) => {
    setSelectedAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]))
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedAreas([])
    setSelectedGender("")
    setSelectedTags([])
    setSearchQuery("")
  }

  // Sidebar filters for desktop
  const FiltersContent = () => (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>エリア</SidebarGroupLabel>
        <SidebarGroupContent>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {areas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={`area-${area}`}
                    checked={selectedAreas.includes(area)}
                    onCheckedChange={() => toggleArea(area)}
                  />
                  <Label htmlFor={`area-${area}`} className="text-sm">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SidebarGroupContent>
      </SidebarGroup>

      <Separator className="my-4" />

      <SidebarGroup>
        <SidebarGroupLabel>性別</SidebarGroupLabel>
        <SidebarGroupContent>
          <RadioGroup value={selectedGender} onValueChange={setSelectedGender}>
            {genders.map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <RadioGroupItem value={gender} id={`gender-${gender}`} />
                <Label htmlFor={`gender-${gender}`} className="text-sm">
                  {gender}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </SidebarGroupContent>
      </SidebarGroup>

      <Separator className="my-4" />

      <SidebarGroup>
        <SidebarGroupLabel>タグ</SidebarGroupLabel>
        <SidebarGroupContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SidebarGroupContent>
      </SidebarGroup>

      <div className="mt-6">
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          フィルターをクリア
        </Button>
      </div>
    </>
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" collapsible="offcanvas">
          <SidebarHeader className="border-b p-4">
            <h2 className="text-lg font-semibold">フィルター</h2>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <FiltersContent />
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto p-4">
            {/* Search and Filter Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-bold">トレーナーを探す</h1>

              <div className="flex w-full flex-1 flex-wrap items-center gap-2 sm:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="トレーナーを検索"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">フィルター</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>フィルター</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <FiltersContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      並び替え
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Check className="mr-2 h-4 w-4" />
                        評価が高い順
                      </DropdownMenuItem>
                      <DropdownMenuItem>レビュー数順</DropdownMenuItem>
                      <DropdownMenuItem>新着順</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedAreas.length > 0 || selectedGender || selectedTags.length > 0) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedAreas.map((area) => (
                  <Badge key={area} variant="secondary" className="cursor-pointer" onClick={() => toggleArea(area)}>
                    {area} ×
                  </Badge>
                ))}
                {selectedGender && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedGender("")}>
                    {selectedGender} ×
                  </Badge>
                )}
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => toggleTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearFilters}>
                  すべてクリア
                </Button>
              </div>
            )}

            {/* Results Count */}
            <p className="mb-4 text-sm text-gray-500">{filteredTrainers.length}人のトレーナーが見つかりました</p>

            {/* Trainer Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTrainers.map((trainer) => (
                <Card key={trainer.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">{trainer.name}</h3>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{trainer.rating}</span>
                        <span className="ml-1 text-xs text-gray-500">({trainer.reviews})</span>
                      </div>
                    </div>
                    <div className="mb-2 flex items-center text-sm text-gray-500">
                      <MapPin className="mr-1 h-4 w-4" />
                      {trainer.area}
                    </div>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {trainer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{trainer.description}</p>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 p-4">
                    <Button className="w-full">プロフィールを見る</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredTrainers.length === 0 && (
              <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="mb-4 rounded-full bg-gray-100 p-3">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mb-1 text-lg font-medium">トレーナーが見つかりませんでした</h3>
                <p className="mb-4 text-sm text-gray-500">検索条件を変更して、もう一度お試しください。</p>
                <Button variant="outline" onClick={clearFilters}>
                  フィルターをクリア
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
