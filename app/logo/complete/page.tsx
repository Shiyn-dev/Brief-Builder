"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Instagram, Linkedin } from "lucide-react"
import { GoogleLogin } from "@/components/google-login"

export default function LogoComplete() {
  const [briefData, setBriefData] = useState<any>({})
  const [formData, setFormData] = useState({
    yourName: "",
    sendToEmail: "",
    agreeToTerms: false,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("logoBrief")
    if (data) {
      setBriefData(JSON.parse(data))
    }
  }, [])

  const isFormValid = formData.yourName.trim() !== "" && formData.sendToEmail.trim() !== "" && formData.agreeToTerms

  const handleSend = () => {
    if (!isFormValid) return

    // Here you would implement the actual email sending logic
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-teal-600">
            BRIEF BUILDER
          </Link>
          <GoogleLogin />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Brief Preview - No Card */}
          <div>
            <div className="bg-white p-6 rounded-lg">
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

              {/* Only Edit Button */}
              <div className="mt-4">
                <Link href="/logo/step-1">
                  <Button className="w-full text-white" style={{ backgroundColor: "#038196" }}>
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column WITHOUT Blue Border */}
          <div className="p-8 bg-white rounded-lg">
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulation!</h1>
                <p className="text-xl text-gray-700">Your brief for the Logo is ready!</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="yourName" className="text-base font-medium">
                    Your name
                  </Label>
                  <Input
                    id="yourName"
                    type="text"
                    value={formData.yourName}
                    onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                    placeholder="Name"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sendToEmail" className="text-base font-medium">
                    Send to your email:
                  </Label>
                  <Input
                    id="sendToEmail"
                    type="email"
                    value={formData.sendToEmail}
                    onChange={(e) => setFormData({ ...formData, sendToEmail: e.target.value })}
                    placeholder="Email"
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to{" "}
                    <Link href="#" className="text-teal-600 underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-teal-600 underline">
                      User Agreement
                    </Link>
                  </Label>
                </div>

                {/* Gray Send Button */}
                <Button
                  onClick={handleSend}
                  disabled={!isFormValid}
                  className={`w-full py-3 text-white ${
                    isFormValid ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-300 cursor-not-allowed"
                  }`}
                  size="lg"
                >
                  Send
                </Button>

                {showSuccess && <div className="text-center text-green-600 font-medium">Check your email!</div>}
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
        </div>
      </main>
    </div>
  )
}
