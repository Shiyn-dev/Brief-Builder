"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Instagram, Linkedin } from "lucide-react"
import { GoogleLogin } from "@/components/google-login"
import { Logo } from "@/components/logo"

export default function LandingComplete() {
  const [briefData, setBriefData] = useState<any>({})
  const [formData, setFormData] = useState({
    yourName: "",
    sendToEmail: "",
    agreeToTerms: false,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    try {
      const data = localStorage.getItem("landingBrief")
      console.log("🔥 Raw localStorage data:", data)

      if (data && data !== "null" && data !== "undefined") {
        const parsedData = JSON.parse(data)
        console.log("🔥 Parsed brief data:", parsedData)
        setBriefData(parsedData)
      }
    } catch (error) {
      console.error("🔥 Error loading data:", error)
    }
  }, [])

  const isFormValid = () => {
    return formData.yourName.trim() !== "" &&
        formData.sendToEmail.trim() !== "" &&
        formData.agreeToTerms
  }

  const handleSend = () => {
    if (!isFormValid()) return
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // ВОЗВРАЩАЮ старую логику, но с 1/ в начале
  const getPageNumbers = () => {
    let filledSteps = 0

    // Step 1 - если хотя бы одно поле заполнено
    if (briefData.companyName?.trim() ||
        briefData.fieldOfActivity ||
        briefData.customFieldOfActivity?.trim() ||
        briefData.ideaAndMission?.trim()) {
      filledSteps = Math.max(filledSteps, 1)
    }

    // Step 2 - если хотя бы одно поле заполнено
    if ((briefData.usp?.length > 0 || briefData.customUsp?.trim()) ||
        (briefData.goal?.length > 0 || briefData.customGoal?.trim()) ||
        briefData.currentLandingLink?.trim()) {
      filledSteps = Math.max(filledSteps, 2)
    }

    // Step 3 - если хотя бы одно поле заполнено
    if (briefData.currentDesignLikes?.trim() ||
        briefData.purpose ||
        briefData.customPurpose?.trim() ||
        briefData.whyBuyFromYou?.trim()) {
      filledSteps = Math.max(filledSteps, 3)
    }

    // Step 4 - если хотя бы одно поле заполнено
    if (briefData.audience ||
        briefData.customAudience?.trim() ||
        briefData.mainCompetitor?.trim() ||
        briefData.successfulCompetitors?.trim()) {
      filledSteps = Math.max(filledSteps, 4)
    }

    // Step 5 - если хотя бы одно поле заполнено
    if (briefData.dislikedWebsites?.trim() ||
        briefData.colorScheme?.trim() ||
        briefData.landingBlocks?.length > 0 ||
        briefData.customBlocks?.trim()) {
      filledSteps = Math.max(filledSteps, 5)
    }

    // ВСЕГДА показываем 1/ + количество заполненных степов
    return `1/${filledSteps}`
  }

  return (
      <div className="min-h-screen" style={{ backgroundColor: "#F0F9FA" }}>
        <header className="px-6 py-4" style={{ backgroundColor: "#F0F9FA" }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <GoogleLogin />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Brief Summary */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Brief for the Landing:</h2>

                <div className="space-y-6">
                  {/* Company Name */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Company name</h3>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#68B3C0" }}></div>
                      <span className="text-gray-700">{briefData.companyName || "Not specified"}</span>
                    </div>
                    <hr className="mt-3 border-gray-200" />
                  </div>

                  {/* Field of Activity */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">The company's field of activity?</h3>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#68B3C0" }}></div>
                      <span className="text-gray-700">
                        {briefData.fieldOfActivity === "info-services" ? "Info services" :
                            briefData.fieldOfActivity === "physical-services" ? "Physical services" :
                                briefData.fieldOfActivity === "other" && briefData.customFieldOfActivity ? briefData.customFieldOfActivity :
                                    (briefData.fieldOfActivity || "Not specified")}
                      </span>
                    </div>
                    <hr className="mt-3 border-gray-200" />
                  </div>

                  {/* Company Mission */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">What is the idea and mission of your Company?</h3>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: "#68B3C0" }}></div>
                      <span className="text-gray-700">{briefData.ideaAndMission || "Not specified"}</span>
                    </div>
                    <hr className="mt-3 border-gray-200" />
                  </div>

                  {/* USP */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Unique selling proposition (USP) of the company/service?</h3>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: "#68B3C0" }}></div>
                      <span className="text-gray-700">
                        {Array.isArray(briefData.usp) && briefData.usp.length > 0 ? briefData.usp.join(", ") : ""}
                        {briefData.customUsp && (briefData.usp?.length > 0 ? `, ${briefData.customUsp}` : briefData.customUsp)}
                        {!briefData.usp?.length && !briefData.customUsp && "Not specified"}
                      </span>
                    </div>
                    <hr className="mt-3 border-gray-200" />
                  </div>

                  {/* Goal */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">You want to:</h3>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: "#68B3C0" }}></div>
                      <span className="text-gray-700">
                        {Array.isArray(briefData.goal) && briefData.goal.length > 0 ? briefData.goal.join(", ") : ""}
                        {briefData.customGoal && (briefData.goal?.length > 0 ? `, ${briefData.customGoal}` : briefData.customGoal)}
                        {!briefData.goal?.length && !briefData.customGoal && "Not specified"}
                      </span>
                    </div>
                    <hr className="mt-3 border-gray-200" />
                  </div>

                  {/* Purpose */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">What is the purpose of developing a landing page:</h3>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: "#68B3C0" }}></div>
                      <span className="text-gray-700">
                        {briefData.purpose === "sale-goods-services" ? "Sale of goods/services/training" :
                            briefData.purpose === "event-registration" ? "Registration for the event" :
                                briefData.purpose === "business-card" ? "Landing page business card" :
                                    briefData.purpose === "other" && briefData.customPurpose ? briefData.customPurpose :
                                        (briefData.purpose || "Not specified")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ИСПРАВЛЕННЫЕ цифры: всегда 1/ + количество заполненных степов */}
                <div className="mt-6 text-center">
                  <span className="text-gray-400 text-sm">{getPageNumbers()}</span>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                  className="w-full text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#68B3C0" }}
                  asChild
              >
                <Link href="/landing/step-1">Edit</Link>
              </Button>
            </div>

            {/* Right Column - Form */}
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Congratulation!</h1>
                <p className="text-xl text-gray-700">Your brief for the Landing is ready!</p>
              </div>

              <div className="space-y-6">
                {/* Your Name */}
                <div className="space-y-2">
                  <Label htmlFor="yourName" className="text-base font-medium text-gray-700">
                    Your name
                  </Label>
                  <Input
                      id="yourName"
                      type="text"
                      value={formData.yourName}
                      onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                      placeholder="Your name"
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{
                        focusRingColor: "#68B3C0",
                        "--tw-ring-color": "#68B3C0"
                      } as React.CSSProperties}
                  />
                </div>

                {/* Send to Email */}
                <div className="space-y-2">
                  <Label htmlFor="sendToEmail" className="text-base font-medium text-gray-700">
                    Send to your email:
                  </Label>
                  <Input
                      id="sendToEmail"
                      type="email"
                      value={formData.sendToEmail}
                      onChange={(e) => setFormData({ ...formData, sendToEmail: e.target.value })}
                      placeholder="Email"
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{
                        focusRingColor: "#68B3C0",
                        "--tw-ring-color": "#68B3C0"
                      } as React.CSSProperties}
                  />
                </div>

                {/* Send Button */}
                <Button
                    onClick={handleSend}
                    disabled={!isFormValid()}
                    className={`w-full py-4 text-white rounded-lg text-lg font-medium transition-opacity ${
                        !isFormValid() ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                    }`}
                    style={{ backgroundColor: "#68B3C0" }}
                    size="lg"
                >
                  Send
                </Button>

                {/* Agreement */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                      className="mt-1"
                      style={{
                        accentColor: "#68B3C0"
                      }}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link href="#" className="underline" style={{ color: "#68B3C0" }}>
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="underline" style={{ color: "#68B3C0" }}>
                      privacy policy
                    </Link>
                  </Label>
                </div>

                {showSuccess && <div className="text-center text-green-600 font-medium">Check your email!</div>}
              </div>

              {/* Footer Section */}
              <div className="text-center space-y-6 pt-8">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your opinion matters</p>
                  <Link href="#" className="text-sm underline hover:opacity-80" style={{ color: "#68B3C0" }}>
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