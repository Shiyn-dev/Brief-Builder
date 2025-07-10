"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingStep1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    activityField: "",
    companyMission: "",
    customActivityField: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    if (existingData) {
      setFormData({
        companyName: existingData.companyName || "",
        activityField: existingData.activityField || "",
        companyMission: existingData.companyMission || "",
        customActivityField: existingData.customActivityField || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
      formData.companyName.trim() !== "" &&
      formData.companyMission.trim() !== "" &&
      (formData.activityField !== "" || formData.customActivityField.trim() !== "")
    )
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem(
      "landingBrief",
      JSON.stringify({
        ...existingData,
        ...formData,
      }),
    )
    router.push("/landing/step-2")
  }

  return (
    <BriefLayout currentStep={1} totalSteps={6} onNext={handleNext} showPrev={false} isNextDisabled={!isFormValid()}>
      <div className="space-y-8">
        {/* Заголовок отдельно по центру */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>

        <div className="space-y-6">
          {/* Question 1 - Company Name */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-3">
                <Label htmlFor="companyName" className="text-base font-medium">
                  Company name
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 300) })}
                  className="w-full"
                  placeholder=""
                  maxLength={300}
                />
                <div className="text-xs text-gray-500 text-right">{formData.companyName.length}/300</div>
              </div>
            </CardContent>
          </Card>

          {/* Question 2 - Activity Field */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
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
                  value={formData.customActivityField}
                  onChange={(e) => setFormData({ ...formData, customActivityField: e.target.value.slice(0, 300) })}
                  className="w-full"
                  maxLength={300}
                />
                <div className="text-xs text-gray-500 text-right">{formData.customActivityField.length}/300</div>
              </div>
            </CardContent>
          </Card>

          {/* Question 3 - Company Mission */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-3">
                <Label htmlFor="companyMission" className="text-base font-medium">
                  What is the idea and mission of your Company?
                </Label>
                <Textarea
                  id="companyMission"
                  value={formData.companyMission}
                  onChange={(e) => setFormData({ ...formData, companyMission: e.target.value.slice(0, 300) })}
                  className="w-full min-h-[100px]"
                  placeholder="Your option"
                  maxLength={300}
                />
                <div className="text-xs text-gray-500 text-right">{formData.companyMission.length}/300</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BriefLayout>
  )
}
