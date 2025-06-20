"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function LandingStep1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    activityField: "",
    companyMission: "",
  })

  const handleNext = () => {
    localStorage.setItem(
      "landingBrief",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("landingBrief") || "{}"),
        ...formData,
      }),
    )
    router.push("/landing/step-2")
  }

  return (
    <BriefLayout currentStep={1} totalSteps={6} onNext={handleNext} showPrev={false}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>

        <div className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-base font-medium">
              Company name
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full"
              placeholder="Your option"
            />
          </div>

          {/* Activity Field */}
          <div className="space-y-3">
            <Label className="text-base font-medium">The company's field of activity?</Label>
            <RadioGroup
              value={formData.activityField}
              onValueChange={(value) => setFormData({ ...formData, activityField: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="info-services" id="info-services" />
                <Label htmlFor="info-services">Info services</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="physical-services" id="physical-services" />
                <Label htmlFor="physical-services">Physical services</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              className="w-full mt-2"
              onChange={(e) => setFormData({ ...formData, activityField: e.target.value })}
            />
          </div>

          {/* Company Mission */}
          <div className="space-y-2">
            <Label htmlFor="companyMission" className="text-base font-medium">
              What is the idea and mission of your Company?
            </Label>
            <Textarea
              id="companyMission"
              value={formData.companyMission}
              onChange={(e) => setFormData({ ...formData, companyMission: e.target.value })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
            />
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
