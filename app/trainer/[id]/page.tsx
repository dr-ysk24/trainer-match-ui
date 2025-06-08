import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft, Calendar, Clock, Heart, MapPin,
  MessageCircle, Star, Users, Verified
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReviewForm from "@/components/ReviewForm"

export default async function TrainerDetailPage({ params }: { params: { id: string } }) {
  const trainer = await prisma.trainerProfile.findUnique({
    where: { id: params.id },
    include: { user: true },
  })

  if (!trainer) return notFound()

  const reviews = await prisma.review.findMany({
    where: { trainerId: trainer.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative">
        <div className="h-[400px] relative overflow-hidden">
          <Image
            src={trainer.user.image || "/placeholder.svg"}
            alt={`${trainer.user.name}のプロフィール画像`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="absolute top-4 left-4">
          <Link href="/trainer-search">
            <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="container mx-auto">
            <div className="flex items-end gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white">
                  <AvatarImage src={trainer.user.image || "/placeholder.svg"} alt={trainer.user.name} />
                  <AvatarFallback className="text-2xl">{trainer.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1">
                  <Verified className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{trainer.user.name}</h1>
                  <Badge variant="secondary" className="bg-blue-600 text-white">認証済み</Badge>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-200">（{reviews.length}件のレビュー）</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{trainer.region}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>経験{trainer.experience}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                    {trainer.specialty}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-white mb-1">¥{trainer.hourlyRate}</div>
                <div className="text-gray-200 text-sm">1時間あたり</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profile">プロフィール</TabsTrigger>
            <TabsTrigger value="reviews">レビュー</TabsTrigger>
            <TabsTrigger value="calendar">カレンダー</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{trainer.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewForm trainerId={trainer.id} />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>レビュー ({reviews.length}件)</span>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.map((review) => (
                  <div key={review.id} className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.userImage || "/placeholder.svg"} alt={review.userName} />
                        <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-sm">{review.userName}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>予約カレンダー（仮）</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">カレンダー機能は今後実装予定です。</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
