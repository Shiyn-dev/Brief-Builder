"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function LandingStep4() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    audience: "",
    customAudience: "",
    mainCompetitor: "",
    successfulCompetitors: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    console.log("Step-4: Loading existing data:", existingData)
    if (existingData) {
      setFormData({
        audience: existingData.audience || "",
        customAudience: existingData.customAudience || "",
        mainCompetitor: existingData.mainCompetitor || "",
        successfulCompetitors: existingData.successfulCompetitors || "",
      })
    }
  }, [])

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    const updatedData = {
      ...existingData,
      ...formData,
    }
    console.log("Step-4: Saving data:", updatedData)
    localStorage.setItem("landingBrief", JSON.stringify(updatedData))
    router.push("/landing/step-5")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    const updatedData = {
      ...existingData,
      ...formData,
    }
    console.log("Step-4: Saving data before going back:", updatedData)
    localStorage.setItem("landingBrief", JSON.stringify(updatedData))
    router.push("/landing/step-3")
  }

  return (
    <BriefLayout currentStep={4} totalSteps={6} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>

        <div className="space-y-6">
          {/* Audience */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Who is your main audience?</Label>
            <RadioGroup
              value={formData.audience}
              onValueChange={(value) => setFormData({ ...formData, audience: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b2b" id="b2b" />
                <Label htmlFor="b2b">B2B segment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b2c" id="b2c" />
                <Label htmlFor="b2c">B2C segment</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              value={formData.customAudience}
              onChange={(e) => setFormData({ ...formData, customAudience: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customAudience.length}/300</div>
          </div>

          {/* Main Competitor */}
          <div className="space-y-2">
            <Label htmlFor="mainCompetitor" className="text-base font-medium">
              Who is your main competitor? Provide a name or link
            </Label>
            <Input
              id="mainCompetitor"
              value={formData.mainCompetitor}
              onChange={(e) => setFormData({ ...formData, mainCompetitor: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.mainCompetitor.length}/300</div>
          </div>

          {/* Successful Competitors */}
          <div className="space-y-2">
            <Label htmlFor="successfulCompetitors" className="text-base font-medium">
              What competitors' websites do you consider successful? Why?
            </Label>
            <Textarea
              id="successfulCompetitors"
              value={formData.successfulCompetitors}
              onChange={(e) => setFormData({ ...formData, successfulCompetitors: e.target.value.slice(0, 300) })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.successfulCompetitors.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
