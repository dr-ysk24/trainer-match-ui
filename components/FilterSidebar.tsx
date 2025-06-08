"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function FilterSidebar({
  areas,
  selectedAreas,
  toggleArea,
  genders,
  selectedGender,
  setSelectedGender,
  tags,
  selectedTags,
  toggleTag,
  clearFilters,
}: {
  areas: string[]
  selectedAreas: string[]
  toggleArea: (area: string) => void
  genders: string[]
  selectedGender: string
  setSelectedGender: (g: string) => void
  tags: string[]
  selectedTags: string[]
  toggleTag: (tag: string) => void
  clearFilters: () => void
}) {
  return (
    <div className="space-y-6 w-[250px] border-r p-4 bg-white hidden md:block">
      <div>
        <h2 className="font-bold text-lg mb-2">エリア</h2>
        <ScrollArea className="h-[150px]">
          {areas.map((area) => (
            <div key={area} className="flex items-center gap-2 mb-1">
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
        </ScrollArea>
      </div>

      <Separator />

      <div>
        <h2 className="font-bold text-lg mb-2">性別</h2>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              id={`gender-${gender}`}
              name="gender"
              value={gender}
              checked={selectedGender === gender}
              onChange={() => setSelectedGender(gender)}
            />
            <Label htmlFor={`gender-${gender}`} className="text-sm">
              {gender}
            </Label>
          </div>
        ))}
      </div>

      <Separator />

      <div>
        <h2 className="font-bold text-lg mb-2">タグ</h2>
        <ScrollArea className="h-[200px]">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center gap-2 mb-1">
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
        </ScrollArea>
      </div>

      <Separator />

      <button onClick={clearFilters} className="text-sm text-blue-600 underline">
        フィルターをクリア
      </button>
    </div>
  )
}
