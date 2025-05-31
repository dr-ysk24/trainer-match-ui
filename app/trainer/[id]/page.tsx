"use client"

import * as React from "react"
import { ArrowLeft, Calendar, Clock, Heart, MapPin, MessageCircle, Star, Users, Verified } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample trainer data
const trainer = {
  id: 1,
  name: "田中 健太",
  heroImage: "/placeholder.svg?height=400&width=800",
  profileImage: "/placeholder.svg?height=150&width=150",
  rating: 4.9,
  totalReviews: 124,
  location: "東京都渋谷区",
  experience: "10年",
  verified: true,
  tags: ["ウェイトトレーニング", "ボディビル", "ダイエット", "筋力向上"],
  hourlyRate: "¥8,000",
  responseTime: "1時間以内",
  bio: "10年以上の経験を持つ認定パーソナルトレーナーです。ボディビル競技での実績を活かし、筋肉増強とボディメイクを専門としています。初心者から上級者まで、一人ひとりの目標に合わせたトレーニングプログラムを提供します。",
  specialties: ["ウェイトトレーニング指導", "ボディビル競技指導", "ダイエットサポート", "栄養指導", "姿勢改善"],
  certifications: ["NSCA-CPT（全米ストレングス&コンディショニング協会認定）", "JBBF公認指導員", "栄養士"],
  stats: {
    totalClients: 200,
    successRate: 95,
    repeatRate: 88,
  },
}

// Sample reviews data
const reviews = [
  {
    id: 1,
    user: "山田 花子",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024年1月15日",
    comment:
      "田中さんのおかげで3ヶ月で10kg減量できました！丁寧な指導と的確なアドバイスで、無理なく続けることができました。",
  },
  {
    id: 2,
    user: "佐藤 太郎",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024年1月10日",
    comment:
      "筋トレ初心者でしたが、基礎から丁寧に教えてもらえました。フォームの指導が特に素晴らしく、怪我なく続けられています。",
  },
  {
    id: 3,
    user: "鈴木 美咲",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024年1月5日",
    comment:
      "ボディメイクの知識が豊富で、食事指導も含めて総合的にサポートしてもらえます。結果が目に見えて分かるので続けやすいです。",
  },
]

// Sample calendar data (simplified)
const availableSlots = [
  { date: "2024年2月1日", time: "09:00", available: true },
  { date: "2024年2月1日", time: "10:00", available: false },
  { date: "2024年2月1日", time: "11:00", available: true },
  { date: "2024年2月1日", time: "14:00", available: true },
  { date: "2024年2月1日", time: "15:00", available: true },
  { date: "2024年2月1日", time: "16:00", available: false },
]

export default function TrainerProfile() {
  const [activeTab, setActiveTab] = React.useState("profile")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[400px] relative overflow-hidden">
          <Image
            src={trainer.heroImage || "/placeholder.svg"}
            alt={`${trainer.name}のプロフィール画像`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link href="/search">
            <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          </Link>
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="container mx-auto">
            <div className="flex items-end gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white">
                  <AvatarImage src={trainer.profileImage || "/placeholder.svg"} alt={trainer.name} />
                  <AvatarFallback className="text-2xl">{trainer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {trainer.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1">
                    <Verified className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{trainer.name}</h1>
                  {trainer.verified && (
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      認証済み
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{trainer.rating}</span>
                    <span className="text-gray-200">({trainer.totalReviews}件のレビュー)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{trainer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>経験{trainer.experience}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trainer.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-white/20 text-white border-white/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white mb-1">{trainer.hourlyRate}</div>
                <div className="text-gray-200 text-sm">1時間あたり</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">プロフィール</TabsTrigger>
                <TabsTrigger value="reviews">レビュー</TabsTrigger>
                <TabsTrigger value="calendar">カレンダー</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>自己紹介</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{trainer.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>専門分野</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {trainer.specialties.map((specialty, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-blue-600 rounded-full" />
                          <span>{specialty}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>資格・認定</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {trainer.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Verified className="h-4 w-4 text-green-600" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>実績</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{trainer.stats.totalClients}+</div>
                        <div className="text-sm text-gray-600">指導実績</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{trainer.stats.successRate}%</div>
                        <div className="text-sm text-gray-600">目標達成率</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{trainer.stats.repeatRate}%</div>
                        <div className="text-sm text-gray-600">継続率</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>レビュー ({trainer.totalReviews}件)</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{trainer.rating}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Rating Breakdown */}
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="text-sm w-8">{stars}★</span>
                            <Progress value={stars === 5 ? 80 : stars === 4 ? 15 : 5} className="flex-1" />
                            <span className="text-sm text-gray-600 w-8">
                              {stars === 5 ? "80%" : stars === 4 ? "15%" : "5%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="font-semibold">{review.user}</div>
                                <div className="text-sm text-gray-600">{review.date}</div>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Calendar Tab */}
              <TabsContent value="calendar" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>予約可能な時間</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600 mb-4">2024年2月1日（木）の空き状況</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableSlots.map((slot, index) => (
                          <Button
                            key={index}
                            variant={slot.available ? "outline" : "secondary"}
                            disabled={!slot.available}
                            className={`h-12 ${
                              slot.available
                                ? "hover:bg-blue-50 hover:border-blue-300"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 border border-gray-300 rounded" />
                          <span>予約可能</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-gray-300 rounded" />
                          <span>予約済み</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{trainer.hourlyRate}</div>
                    <div className="text-sm text-gray-600">1時間あたり</div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">返信時間</span>
                      <span>{trainer.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">レッスン形式</span>
                      <span>対面・オンライン</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Calendar className="h-4 w-4 mr-2" />
                      予約する
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      メッセージを送る
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      お気に入りに追加
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">トレーナー情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">指導実績: {trainer.stats.totalClients}人以上</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">平均評価: {trainer.rating}/5.0</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">経験年数: {trainer.experience}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{trainer.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Verified className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">安心・安全</div>
                    <div className="text-sm text-blue-800">
                      すべてのトレーナーは身元確認と資格認証を完了しています。
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
