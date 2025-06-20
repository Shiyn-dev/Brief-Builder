"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Instagram, Linkedin } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"

export default function LogoComplete() {
  const [briefData, setBriefData] = useState<any>({})
  const [designerEmail, setDesignerEmail] = useState("")
  const [copyEmail, setCopyEmail] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("logoBrief")
    if (data) {
      setBriefData(JSON.parse(data))
    }
  }, [])

  const handleSend = () => {
    // Here you would implement the actual email sending logic
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDownloadPDF = () => {
    const pdfData = {
      type: "logo" as const,
      ...briefData,
    }
    generatePDF(pdfData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-teal-600">
            BRIEF BUILDER
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Projects
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Contacts
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Brief Preview */}
          <div>
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Brief for the Logo:</h2>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <strong>Company name:</strong>
                    <div className="text-gray-600">{briefData.companyNameType || "Not specified"}</div>
                  </div>

                  <div>
                    <strong>Company area:</strong>
                    <div className="text-gray-600">
                      {briefData.companyArea?.join(", ") || briefData.customArea || "Not specified"}
                    </div>
                  </div>

                  <div>
                    <strong>Logo usage:</strong>
                    <div className="text-gray-600">{briefData.logoUsage?.join(", ") || "Not specified"}</div>
                  </div>

                  <div>
                    <strong>Emotions:</strong>
                    <div className="text-gray-600">
                      {briefData.emotions?.join(", ") || briefData.customEmotion || "Not specified"}
                    </div>
                  </div>

                  <div>
                    <strong>Colors:</strong>
                    <div className="text-gray-600">
                      {briefData.colors?.join(", ") || briefData.customColor || "Not specified"}
                    </div>
                  </div>

                  <div>
                    <strong>Logo types:</strong>
                    <div className="text-gray-600">{briefData.logoTypes?.join(", ") || "Not specified"}</div>
                  </div>
                </div>

                <div className="flex justify-center mt-6 text-sm text-gray-500">1/2 {">"}</div>

                <div className="flex space-x-4 mt-4">
                  <Link href="/logo/step-1">
                    <Button variant="outline" className="flex-1 bg-teal-100 text-teal-700 border-teal-300">
                      Edit
                    </Button>
                  </Link>
                  <Button onClick={handleDownloadPDF} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Completion Form */}
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulation!</h1>
              <p className="text-xl text-gray-700">You brief for the Logo is ready!</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="designerEmail" className="text-base font-medium">
                  Send to designer via email:
                </Label>
                <Input
                  id="designerEmail"
                  type="email"
                  value={designerEmail}
                  onChange={(e) => setDesignerEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="copyEmail" className="text-base font-medium">
                  Send a copy to me:
                </Label>
                <Input
                  id="copyEmail"
                  type="email"
                  value={copyEmail}
                  onChange={(e) => setCopyEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full"
                />
              </div>

              <Button onClick={handleSend} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3" size="lg">
                Send
              </Button>

              {showSuccess && <div className="text-center text-green-600 font-medium">Проверьте почту!</div>}
            </div>

            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Your opinion matters</p>
                <Link href="#" className="text-teal-600 hover:text-teal-700 text-sm underline">
                  Share your feedback about the product
                </Link>
                <span className="text-sm text-gray-600"> — we use every review to make improvements.</span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-3">Our social media</p>
                <div className="flex justify-center space-x-4">
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    <Linkedin className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
