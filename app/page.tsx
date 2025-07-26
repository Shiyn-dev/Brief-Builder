"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GoogleLogin } from "@/components/google-login"
import { Logo } from "@/components/logo"

interface Brief {
  id: number
  name: string
  logoUrl?: string
}

export default function HomePage() {
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBriefs = async () => {
      try {
        const res = await fetch("https://brief-builder.onrender.com/api/briefs")
        const json = await res.json()

        if (!Array.isArray(json)) {
          throw new Error("Ответ от сервера не является массивом брифов")
        }

        setBriefs(json)
      } catch (err) {
        console.error("❌ Ошибка загрузки брифов:", err)
        setBriefs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBriefs()
  }, [])

  return (
      <div className="min-h-screen bg-[#F0F9FA]">
        {/* Header */}
        <header className="px-6 py-4 bg-[#F0F9FA]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Logo />
            <GoogleLogin />
          </div>
        </header>

        {/* Main */}
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-16">
            <h1 className="text-3xl text-gray-900 mb-8 max-w-2xl text-left">
              I can frame what you share. In the form of a Landing page, Logo and Presentation. Shape them in different
              ways and in different colors.
            </h1>
            <h2 className="text-xl font-bold text-gray-900 mb-12 text-left">
              What are you interested in?
            </h2>
          </div>

          {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#038196] mx-auto mb-4"></div>
                  <div className="text-lg text-gray-600">Загрузка брифов...</div>
                </div>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {briefs.map((brief) => (
                    <Card
                        key={brief.id}
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
                          {brief.logoUrl ? (
                              <img
                                  src={`https://brief-builder.onrender.com${brief.logoUrl}`}
                                  alt={brief.name + " illustration"}
                                  className="max-w-full max-h-full object-contain"
                                  onError={(e) => {
                                    e.currentTarget.src = "/images/default-illustration.png";
                                  }}
                              />
                          ) : (
                              <Image
                                  src="/images/default-illustration.png"
                                  alt={brief.name + " illustration"}
                                  width={200}
                                  height={150}
                                  className="max-w-full max-h-full object-contain"
                              />
                          )}
                        </div>
                        <Link href={`/brief/${brief.id}`}>
                          <Button className="w-full text-white" style={{ backgroundColor: "#038196" }}>
                            {brief.name}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                ))}
              </div>
          )}
        </main>
      </div>
  )
}