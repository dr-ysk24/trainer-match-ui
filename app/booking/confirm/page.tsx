"use client"

import * as React from "react"
import { ArrowLeft, Calendar, Clock, CreditCard, MapPin, Star, User, Verified } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Sample booking data
const bookingData = {
  trainer: {
    id: 1,
    name: "田中 健太",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 124,
    location: "東京都渋谷区",
    verified: true,
    tags: ["ウェイトトレーニング", "ボディビル", "ダイエット"],
    hourlyRate: 8000,
  },
  session: {
    date: "2024年2月15日",
    dayOfWeek: "木曜日",
    time: "14:00 - 15:00",
    duration: "60分",
    type: "対面セッション",
    location: "FitGym 渋谷店",
  },
  pricing: {
    sessionFee: 8000,
    platformFee: 800,
    total: 8800,
  },
}

const paymentMethods = [
  { id: "credit", name: "クレジットカード", icon: CreditCard },
  { id: "bank", name: "銀行振込", icon: CreditCard },
  { id: "paypal", name: "PayPal", icon: CreditCard },
]

export default function BookingConfirmPage() {
  const [selectedPayment, setSelectedPayment] = React.useState("credit")
  const [agreedToTerms, setAgreedToTerms] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConfirmBooking = async () => {
    if (!agreedToTerms) {
      alert("利用規約に同意してください。")
      return
    }

    setIsLoading(true)

    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, redirect to success page
      alert("予約が確定しました！")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/trainer/1">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">予約の確認</h1>
          </div>
          <p className="text-gray-600">予約内容をご確認の上、お支払い方法を選択してください。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trainer Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  トレーナー情報
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={bookingData.trainer.avatar || "/placeholder.svg"}
                      alt={bookingData.trainer.name}
                    />
                    <AvatarFallback className="text-lg">{bookingData.trainer.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{bookingData.trainer.name}</h3>
                      {bookingData.trainer.verified && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          <Verified className="h-3 w-3 mr-1" />
                          認証済み
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{bookingData.trainer.rating}</span>
                        <span>({bookingData.trainer.reviews}件)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{bookingData.trainer.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {bookingData.trainer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  セッション詳細
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">日時</div>
                      <div className="font-medium">
                        {bookingData.session.date} ({bookingData.session.dayOfWeek})
                      </div>
                      <div className="text-sm text-gray-600">{bookingData.session.time}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">時間</div>
                      <div className="font-medium">{bookingData.session.duration}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">セッション形式</div>
                      <div className="font-medium">{bookingData.session.type}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">場所</div>
                      <div className="font-medium">{bookingData.session.location}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  お支払い方法
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                          <method.icon className="h-5 w-5 text-gray-500" />
                          <span>{method.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    <Link href="#" className="text-blue-600 hover:underline">
                      利用規約
                    </Link>
                    および
                    <Link href="#" className="text-blue-600 hover:underline">
                      プライバシーポリシー
                    </Link>
                    に同意します。キャンセルポリシーについては
                    <Link href="#" className="text-blue-600 hover:underline">
                      こちら
                    </Link>
                    をご確認ください。
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>料金詳細</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Session Summary */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium text-sm">{bookingData.session.date}</div>
                      <div className="text-xs text-gray-600">{bookingData.session.time}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{bookingData.session.duration}セッション</div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">セッション料金</span>
                    <span className="text-sm">¥{bookingData.pricing.sessionFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">プラットフォーム手数料</span>
                    <span className="text-sm">¥{bookingData.pricing.platformFee.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>合計</span>
                    <span className="text-lg">¥{bookingData.pricing.total.toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                {/* Confirm Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleConfirmBooking}
                  disabled={!agreedToTerms || isLoading}
                >
                  {isLoading ? "処理中..." : "予約を確定する"}
                </Button>

                {/* Security Notice */}
                <div className="text-xs text-gray-500 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Verified className="h-3 w-3" />
                    <span>安全な決済</span>
                  </div>
                  <p>お支払い情報は暗号化されて保護されます</p>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">キャンセルポリシー</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div>
                  <div className="font-medium text-gray-900 mb-1">24時間前まで</div>
                  <div>全額返金</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">24時間以内</div>
                  <div>50%の手数料が発生</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">当日キャンセル</div>
                  <div>返金なし</div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="font-medium text-blue-900 mb-2">サポートが必要ですか？</div>
                  <div className="text-sm text-blue-800 mb-3">
                    ご質問やお困りのことがございましたら、お気軽にお問い合わせください。
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    サポートに連絡
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
