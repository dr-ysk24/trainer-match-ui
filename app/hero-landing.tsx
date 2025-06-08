import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, MapPin, Clock, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            {/* 左側テキストエリア */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit bg-orange-100 text-orange-700">
                  🎯 理想のトレーナーと出会える
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  あなたにぴったりの <span className="text-orange-600">パーソナルトレーナー</span> を見つけよう
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  あなたの目標・スケジュール・予算に合ったトレーナーと簡単につながれます。今日から、あなただけのトレーニングを始めましょう。
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold">10,000+</span>
                  <span className="text-gray-600">アクティブユーザー</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-600">平均評価</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">500+</span>
                  <span className="text-gray-600">対応エリア</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                  <Link href="/trainer-search">トレーナーを探す</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 border-orange-600 text-orange-600 hover:bg-orange-50"
                >
                  <Link href="/trainer/register">トレーナーとして参加</Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  <span>全トレーナー認証済み</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  <span>返金保証あり</span>
                </div>
              </div>
            </div>

            {/* 右側画像エリア */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/hero.png"
                  width={500}
                  height={600}
                  alt="パーソナルトレーナーのイメージ"
                  className="mx-auto aspect-[5/6] overflow-hidden rounded-xl object-cover shadow-2xl"
                />

                {/* Floating cards */}
                <Card className="absolute right-4 top-6 w-48 shadow-lg bg-white/80 backdrop-blur-sm border border-orange-100">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-orange-700">スピードマッチ</p>
                        <p className="text-xs text-gray-600">最短2分で見つかる</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="absolute left-4 bottom-6 w-48 shadow-lg bg-white/80 backdrop-blur-sm border border-orange-100">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Star className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-orange-700">高評価</p>
                        <p className="text-xs text-gray-600">平均4.9★の信頼</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 認定済み・スケジュール案内 */}
      <section className="grid gap-6 px-4 md:px-6 lg:grid-cols-2">
        <Card className="text-center p-6">
          <CardContent className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-orange-700">認定済みトレーナー</h3>
            <p className="text-gray-600">
              すべてのトレーナーが資格を持ち、身元確認・レビューをクリアしています。
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardContent className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-orange-700">柔軟なスケジュール</h3>
            <p className="text-gray-600">
              あなたのスケジュールに合わせて、簡単に予約・再予約ができます。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Social Proof */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">多くのユーザーに選ばれています</h2>
            <p className="text-gray-600">フィットネスを変えたいあなたに。リアルな声を紹介。</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "さやかさん", role: "ランナー", comment: "「マラソンに向けてぴったりのトレーナーを見つけられました。マッチングが的確！」" },
              { name: "たくみさん", role: "認定トレーナー", comment: "「トレ結びでクライアントが増えました。やる気のある人が集まってきます！」" },
              { name: "じゅんこさん", role: "ダイエット成功者", comment: "「30キロの減量に成功！トレ結びのおかげで一歩踏み出せました。」" },
            ].map((user, i) => (
              <Card className="p-6" key={i}>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">{user.comment}</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-12 md:py-24 bg-orange-600">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
              フィットネスを始める準備はできていますか？
            </h2>
            <p className="text-orange-100 max-w-2xl mx-auto text-lg">
              あなたに合ったトレーナーとの出会いが、ここから始まります。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 bg-white text-orange-600 hover:bg-orange-100">
                今すぐ探す
              </Button>
              <Button size="lg" className="px-8 bg-white text-orange-600 hover:bg-orange-100">
                トレーナー登録はこちら
              </Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
