"use client"

import * as React from "react"
import { Calendar, Edit, MapPin, Star, User } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample user data
const userData = {
  id: 1,
  name: "山田 太郎",
  email: "yamada@example.com",
  phone: "090-1234-5678",
  avatar: "/placeholder.svg?height=100&width=100",
  location: "東京都渋谷区",
  age: 28,
  gender: "男性",
  fitnessGoals: ["筋力向上", "ダイエット"],
  bio: "健康的な体作りを目指しています。週3回のトレーニングを継続中です。",
  joinDate: "2023年6月",
  totalSessions: 24,
  totalReviews: 8,
}

// Sample booking history
const bookingHistory = [
  {
    id: 1,
    trainer: "田中 健太",
    trainerAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024年1月20日",
    time: "14:00 - 15:00",
    type: "対面セッション",
    location: "FitGym 渋谷店",
    status: "完了",
    price: "¥8,000",
  },
  {
    id: 2,
    trainer: "佐藤 美咲",
    trainerAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024年1月18日",
    time: "10:00 - 11:00",
    type: "オンラインセッション",
    location: "オンライン",
    status: "完了",
    price: "¥6,000",
  },
  {
    id: 3,
    trainer: "田中 健太",
    trainerAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024年1月15日",
    time: "16:00 - 17:00",
    type: "対面セッション",
    location: "FitGym 渋谷店",
    status: "完了",
    price: "¥8,000",
  },
  {
    id: 4,
    trainer: "鈴木 大輔",
    trainerAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024年2月25日",
    time: "09:00 - 10:00",
    type: "対面セッション",
    location: "RunPark 新宿",
    status: "予約済み",
    price: "¥7,000",
  },
]

// Sample review history
const reviewHistory = [
  {
    id: 1,
    trainer: "田中 健太",
    trainerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024年1月20日",
    comment: "とても丁寧な指導で、フォームの改善ができました。次回も予約したいと思います。",
    sessionType: "ウェイトトレーニング",
  },
  {
    id: 2,
    trainer: "佐藤 美咲",
    trainerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024年1月18日",
    comment: "ヨガの基本から教えてもらい、体の柔軟性が向上しました。オンラインでも分かりやすかったです。",
    sessionType: "ヨガ",
  },
  {
    id: 3,
    trainer: "田中 健太",
    trainerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024年1月15日",
    comment: "筋トレのメニューが充実していて、効果的なトレーニングができました。",
    sessionType: "ウェイトトレーニング",
  },
]

const statusColors = {
  完了: "bg-green-100 text-green-800",
  予約済み: "bg-blue-100 text-blue-800",
  キャンセル: "bg-red-100 text-red-800",
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = React.useState("profile")
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    age: userData.age.toString(),
    gender: userData.gender,
    bio: userData.bio,
  })

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
      age: userData.age.toString(),
      gender: userData.gender,
      bio: userData.bio,
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">マイダッシュボード</h1>
            <Link href="/">
              <Button variant="outline">ホームに戻る</Button>
            </Link>
          </div>

          {/* User Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{userData.totalSessions}</div>
                <div className="text-sm text-gray-600">総セッション数</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{userData.totalReviews}</div>
                <div className="text-sm text-gray-600">レビュー投稿数</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">4.8</div>
                <div className="text-sm text-gray-600">平均評価</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{userData.joinDate}</div>
                <div className="text-sm text-gray-600">利用開始</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">プロフィール編集</TabsTrigger>
            <TabsTrigger value="bookings">予約履歴</TabsTrigger>
            <TabsTrigger value="reviews">レビュー履歴</TabsTrigger>
          </TabsList>

          {/* Profile Edit Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  プロフィール情報
                </CardTitle>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    編集
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} size="sm">
                      保存
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm">
                      キャンセル
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="text-xl">{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div>
                      <Button variant="outline" size="sm">
                        写真を変更
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG形式（最大5MB）</p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">お名前</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 text-sm">{userData.name}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 text-sm">{userData.email}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">電話番号</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 text-sm">{userData.phone}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">居住地</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 text-sm">{userData.location}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">年齢</Label>
                    {isEditing ? (
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 text-sm">{userData.age}歳</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">性別</Label>
                    {isEditing ? (
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="男性">男性</SelectItem>
                          <SelectItem value="女性">女性</SelectItem>
                          <SelectItem value="その他">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 text-sm">{userData.gender}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">フィットネス目標</Label>
                  <div className="flex flex-wrap gap-2">
                    {userData.fitnessGoals.map((goal) => (
                      <Badge key={goal} variant="secondary">
                        {goal}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + 目標を追加
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      placeholder="自己紹介を入力してください..."
                    />
                  ) : (
                    <div className="p-2 text-sm text-gray-700">{userData.bio}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking History Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  予約履歴
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>トレーナー</TableHead>
                      <TableHead>日時</TableHead>
                      <TableHead>タイプ</TableHead>
                      <TableHead>場所</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>料金</TableHead>
                      <TableHead>アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingHistory.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={booking.trainerAvatar || "/placeholder.svg"} alt={booking.trainer} />
                              <AvatarFallback>{booking.trainer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{booking.trainer}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{booking.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{booking.price}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {booking.status === "完了" && (
                              <Button variant="outline" size="sm">
                                レビュー
                              </Button>
                            )}
                            {booking.status === "予約済み" && (
                              <>
                                <Button variant="outline" size="sm">
                                  変更
                                </Button>
                                <Button variant="outline" size="sm">
                                  キャンセル
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Review History Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  レビュー履歴
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviewHistory.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={review.trainerAvatar || "/placeholder.svg"} alt={review.trainer} />
                          <AvatarFallback>{review.trainer.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.trainer}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Badge variant="outline">{review.sessionType}</Badge>
                                <span>•</span>
                                <span>{review.date}</span>
                              </div>
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

                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>

                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              編集
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              削除
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
