"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function LandingStep3() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentDesignLikes: "",
    purpose: "",
    whyBuyFromYou: "",
  })

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem(
      "landingBrief",
      JSON.stringify({
        ...existingData,
        ...formData,
      }),
    )
    router.push("/landing/step-4")
  }

  const handlePrev = () => {
    router.push("/landing/step-2")
  }

  return (
    <BriefLayout currentStep={3} totalSteps={6} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>

        <div className="space-y-6">
          {/* Current Design Likes */}
          <div className="space-y-2">
            <Label htmlFor="currentDesignLikes" className="text-base font-medium">
              What do you like about your current landing page design?
            </Label>
            <Textarea
              id="currentDesignLikes"
              value={formData.currentDesignLikes}
              onChange={(e) => setFormData({ ...formData, currentDesignLikes: e.target.value.slice(0, 300) })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.currentDesignLikes.length}/300</div>
          </div>

          {/* Purpose */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What is the purpose of developing a landing page:</Label>
            <RadioGroup
              value={formData.purpose}
              onValueChange={(value) => setFormData({ ...formData, purpose: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sale-goods-services" id="sale-goods-services" />
                <Label htmlFor="sale-goods-services">Sale of goods/services/training</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="event-registration" id="event-registration" />
                <Label htmlFor="event-registration">Registration for the event</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business-card" id="business-card" />
                <Label htmlFor="business-card">Landing page business card</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Why Buy From You */}
          <div className="space-y-2">
            <Label htmlFor="whyBuyFromYou" className="text-base font-medium">
              Why should a person buy from you?
            </Label>
            <Textarea
              id="whyBuyFromYou"
              value={formData.whyBuyFromYou}
              onChange={(e) => setFormData({ ...formData, whyBuyFromYou: e.target.value.slice(0, 300) })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.whyBuyFromYou.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
