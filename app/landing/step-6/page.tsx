"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function LandingStep6() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    style: "",
    customStyle: "",
    content: "",
    email: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    console.log("Step-6: Loading existing data:", existingData)
    if (existingData) {
      setFormData({
        style: existingData.style || "",
        customStyle: existingData.customStyle || "",
        content: existingData.content || "",
        email: existingData.email || "",
      })
    }
  }, [])

  const handleComplete = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    const finalData = {
      ...existingData,
      ...formData,
    }
    console.log("Step-6: Saving final data:", finalData)
    localStorage.setItem("landingBrief", JSON.stringify(finalData))
    router.push("/landing/complete")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    const updatedData = {
      ...existingData,
      ...formData,
    }
    console.log("Step-6: Saving data before going back:", updatedData)
    localStorage.setItem("landingBrief", JSON.stringify(updatedData))
    router.push("/landing/step-5")
  }

  return (
    <BriefLayout
      currentStep={6}
      totalSteps={6}
      onNext={handleComplete}
      onPrev={handlePrev}
      nextText="Complete the Brief"
    >
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>

        <div className="space-y-6">
          {/* Style */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What style do you want for your landing page?</Label>
            <RadioGroup value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="minimalism" id="minimalism" className="mt-1" />
                <Label htmlFor="minimalism" className="text-sm leading-relaxed">
                  Minimalism: simple and laconic, minimum color scheme
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="hand-drawn" id="hand-drawn" className="mt-1" />
                <Label htmlFor="hand-drawn" className="text-sm leading-relaxed">
                  Hand drawn: use of illustrations, varied color schemes
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="brutalism" id="brutalism" className="mt-1" />
                <Label htmlFor="brutalism" className="text-sm leading-relaxed">
                  Brutalism: use of rough shapes, contrasting colours, minimalist elements
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="typography" id="typography" className="mt-1" />
                <Label htmlFor="typography" className="text-sm leading-relaxed">
                  Typography: text and graphic elements, simple fonts
                </Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              value={formData.customStyle}
              onChange={(e) => setFormData({ ...formData, customStyle: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customStyle.length}/300</div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-base font-medium">
              Upload or write a text for your landing page, if available.
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value.slice(0, 300) })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.content.length}/300</div>
            <div className="text-sm text-gray-500 mt-1">Возможность прикрепить файл с контентом</div>
          </div>

          {/* Email */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Label htmlFor="email" className="text-base font-medium">
              Please provide your email address to receive the brief
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your email"
              required
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.email.length}/300</div>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600 mb-2">Our social media</p>
            <div className="flex justify-center space-x-4">{/* Social media icons would go here */}</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
