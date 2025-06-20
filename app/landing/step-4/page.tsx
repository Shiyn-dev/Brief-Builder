"use client"

import { useState } from "react"
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
    mainCompetitor: "",
    successfulCompetitors: "",
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
    router.push("/landing/step-5")
  }

  const handlePrev = () => {
    router.push("/landing/step-3")
  }

  return (
    <BriefLayout currentStep={4} totalSteps={6} title="Brief for the Landing:" onNext={handleNext} onPrev={handlePrev}>
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
              className="w-full mt-2"
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
            />
          </div>

          {/* Main Competitor */}
          <div className="space-y-2">
            <Label htmlFor="mainCompetitor" className="text-base font-medium">
              Who is your main competitor? Provide a name or link
            </Label>
            <Input
              id="mainCompetitor"
              value={formData.mainCompetitor}
              onChange={(e) => setFormData({ ...formData, mainCompetitor: e.target.value })}
              className="w-full"
              placeholder="Your option"
            />
          </div>

          {/* Successful Competitors */}
          <div className="space-y-2">
            <Label htmlFor="successfulCompetitors" className="text-base font-medium">
              What competitors' websites do you consider successful? Why?
            </Label>
            <Textarea
              id="successfulCompetitors"
              value={formData.successfulCompetitors}
              onChange={(e) => setFormData({ ...formData, successfulCompetitors: e.target.value })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
            />
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
