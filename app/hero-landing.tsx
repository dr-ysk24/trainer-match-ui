import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, MapPin, Clock, CheckCircle, Dumbbell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center justify-center">
          <Dumbbell className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">FitMatch</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
            How it Works
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Trainers
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🎯 Perfect Trainer Match Guaranteed
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find Your Perfect <span className="text-blue-600">Personal Trainer</span> in Minutes
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Connect with certified personal trainers who match your fitness goals, schedule, and budget. Start
                  your transformation journey today with expert guidance tailored just for you.
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">10,000+</span>
                  <span className="text-gray-600">Active Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-600">Average Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">500+</span>
                  <span className="text-gray-600">Cities</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Find My Trainer
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  Become a Trainer
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>All trainers verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  width="500"
                  height="600"
                  alt="Personal trainer working with client"
                  className="mx-auto aspect-[5/6] overflow-hidden rounded-xl object-cover shadow-2xl"
                />
                {/* Floating cards */}
                <Card className="absolute -left-4 top-20 w-48 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Quick Matching</p>
                        <p className="text-xs text-gray-600">Find trainers in 2 minutes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="absolute -right-4 bottom-20 w-48 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Star className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Top Rated</p>
                        <p className="text-xs text-gray-600">4.9★ average rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Why Choose FitMatch?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make finding the right personal trainer simple, safe, and effective
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Smart Matching</h3>
                <p className="text-gray-600">
                  Our algorithm matches you with trainers based on your goals, experience level, and preferences
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Verified Trainers</h3>
                <p className="text-gray-600">
                  All trainers are certified, background-checked, and reviewed by our community
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Book sessions that fit your schedule with easy online booking and rescheduling
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600">Join the community that's transforming their fitness journey</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "Found the perfect trainer for my marathon training. The matching process was spot-on!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-semibold text-sm">Sarah M.</p>
                    <p className="text-xs text-gray-600">Marathon Runner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "As a trainer, FitMatch helped me grow my client base with people who are serious about fitness."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-semibold text-sm">Mike T.</p>
                    <p className="text-xs text-gray-600">Certified Trainer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "Lost 30 pounds with my trainer from FitMatch. The platform made it so easy to get started."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-semibold text-sm">Jessica L.</p>
                    <p className="text-xs text-gray-600">Weight Loss Success</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-12 md:py-24 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Join thousands who have found their perfect trainer match. Your transformation starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Find My Trainer Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-white border-white hover:bg-white hover:text-blue-600"
              >
                Join as a Trainer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
