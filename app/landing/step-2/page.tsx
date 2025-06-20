"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function LandingStep2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    usp: "",
    customUsp: "",
    goal: "",
    customGoal: "",
    currentLandingLink: "",
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
    router.push("/landing/step-3")
  }

  const handlePrev = () => {
    router.push("/landing/step-1")
  }

  return (
    <BriefLayout currentStep={2} totalSteps={6} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>

        <div className="space-y-6">
          {/* USP */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Unique selling proposition (USP) of the company/service?</Label>
            <RadioGroup value={formData.usp} onValueChange={(value) => setFormData({ ...formData, usp: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unique-products" id="unique-products" />
                <Label htmlFor="unique-products">Only unique products</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="best-practices" id="best-practices" />
                <Label htmlFor="best-practices">Set of the best global marketing practices</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lowest-prices" id="lowest-prices" />
                <Label htmlFor="lowest-prices">Lowest prices in the city</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="largest-assortment" id="largest-assortment" />
                <Label htmlFor="largest-assortment">Largest assortment</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              value={formData.customUsp}
              onChange={(e) => setFormData({ ...formData, customUsp: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customUsp.length}/300</div>
          </div>

          {/* Goal */}
          <div className="space-y-3">
            <Label className="text-base font-medium">You want to:</Label>
            <RadioGroup value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="develop-new" id="develop-new" />
                <Label htmlFor="develop-new">Develop a new landing page</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="redesign-old" id="redesign-old" />
                <Label htmlFor="redesign-old">Redesign the old one</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="improve-existing" id="improve-existing" />
                <Label htmlFor="improve-existing">Improve the existing</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              value={formData.customGoal}
              onChange={(e) => setFormData({ ...formData, customGoal: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customGoal.length}/300</div>
          </div>

          {/* Current Landing Link */}
          <div className="space-y-2">
            <Label htmlFor="currentLandingLink" className="text-base font-medium">
              If you have a landing page, provide a link to it:
            </Label>
            <Input
              id="currentLandingLink"
              value={formData.currentLandingLink}
              onChange={(e) => setFormData({ ...formData, currentLandingLink: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.currentLandingLink.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
