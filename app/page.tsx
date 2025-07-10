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
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <GoogleLogin />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8 max-w-2xl mx-auto leading-relaxed">
            I can frame what you share. In the form of a Landing page, Logo and Presentation. Shape them in different
            ways and in different colors.
          </h1>
          <h2 className="text-xl font-medium text-gray-900 mb-12">What are you interested in?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Landing Page Card */}
          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <Image
                  src="/images/landing-illustration.png"
                  alt="Landing Page illustration"
                  width={240}
                  height={180}
                  className="mx-auto"
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
          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <Image
                  src="/images/logo-illustration.png"
                  alt="Logo illustration"
                  width={240}
                  height={180}
                  className="mx-auto"
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
          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <Image
                  src="/images/presentation-illustration.png"
                  alt="Presentation illustration"
                  width={240}
                  height={180}
                  className="mx-auto"
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
