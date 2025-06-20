"use client"

import { useState } from "react"
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
    content: "",
    email: "",
  })

  const handleComplete = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    const finalData = {
      ...existingData,
      ...formData,
    }
    localStorage.setItem("landingBrief", JSON.stringify(finalData))
    router.push("/landing/complete")
  }

  const handlePrev = () => {
    router.push("/landing/step-5")
  }

  return (
    <BriefLayout
      currentStep={6}
      totalSteps={6}
      title="Brief for the Landing:"
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
              className="w-full mt-2"
              onChange={(e) => setFormData({ ...formData, style: e.target.value })}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-base font-medium">
              Upload or write a text for your landing page, if available.
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
            />
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full"
              placeholder="Your email"
              required
            />
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
