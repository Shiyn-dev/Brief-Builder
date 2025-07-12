"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { GoogleLogin } from "@/components/google-login"
import { Logo } from "@/components/logo"

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F9FA" }}>
      {/* Header */}
      <header className="px-6 py-4" style={{ backgroundColor: "#F0F9FA" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <GoogleLogin />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-3xl text-gray-900 mb-8 max-w-2xl text-left">
            I can frame what you share. In the form of a Landing page, Logo and Presentation. Shape them in different
            ways and in different colors.
          </h1>
          <h2 className="text-xl font-bold text-gray-900 mb-12 text-left">What are you interested in?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Landing Page Card */}
          <Card
            className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F0F9FA"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-6 h-48 flex items-center justify-center">
                <Image
                  src="/images/landing-illustration.png"
                  alt="Landing Page illustration"
                  width={200}
                  height={150}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <Link href="/landing/step-1">
                <Button className="w-full text-white" style={{ backgroundColor: "#038196" }}>
                  Landing Page
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Logo Card */}
          <Card
            className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F0F9FA"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-6 h-48 flex items-center justify-center">
                <Image
                  src="/images/logo-illustration.png"
                  alt="Logo illustration"
                  width={200}
                  height={150}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <Link href="/logo/step-1">
                <Button className="w-full text-white" style={{ backgroundColor: "#038196" }}>
                  Logo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Presentation Card */}
          <Card
            className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F0F9FA"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-6 h-48 flex items-center justify-center">
                <Image
                  src="/images/presentation-illustration.png"
                  alt="Presentation illustration"
                  width={200}
                  height={150}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <Link href="/presentation/step-1">
                <Button className="w-full text-white" style={{ backgroundColor: "#038196" }}>
                  Presentation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
