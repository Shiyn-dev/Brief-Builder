"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingStep2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    usp: [] as string[],
    customUsp: "",
    goal: [] as string[],
    customGoal: "",
    currentLandingLink: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    if (existingData) {
      setFormData({
        usp: existingData.usp || [],
        customUsp: existingData.customUsp || "",
        goal: existingData.goal || [],
        customGoal: existingData.customGoal || "",
        currentLandingLink: existingData.currentLandingLink || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
      (formData.usp.length > 0 || formData.customUsp.trim() !== "") &&
      (formData.goal.length > 0 || formData.customGoal.trim() !== "")
      // currentLandingLink is optional
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
    router.push("/landing/step-3")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem(
      "landingBrief",
      JSON.stringify({
        ...existingData,
        ...formData,
      }),
    )
    router.push("/landing/step-1")
  }

  const handleUspChange = (option: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        usp: [...formData.usp, option],
      })
    } else {
      setFormData({
        ...formData,
        usp: formData.usp.filter((item) => item !== option),
      })
    }
  }

  const handleGoalChange = (option: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        goal: [...formData.goal, option],
      })
    } else {
      setFormData({
        ...formData,
        goal: formData.goal.filter((item) => item !== option),
      })
    }
  }

  const uspOptions = [
    "Only unique products",
    "Set of the best global marketing practices",
    "Lowest prices in the city",
    "Largest assortment",
  ]

  const goalOptions = ["Develop a new landing page", "Redesign the old one", "Improve the existing"]

  return (
    <BriefLayout currentStep={2} totalSteps={6} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
      <div className="space-y-8">
        {/* Заголовок отдельно по центру */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>

        <div className="space-y-6">
          {/* Question 4 - USP */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">
                  Unique selling proposition (USP) of the company/service?
                </Label>
                <div className="space-y-2">
                  {uspOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={formData.usp.includes(option)}
                        onCheckedChange={(checked) => handleUspChange(option, checked as boolean)}
                      />
                      <Label htmlFor={option} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
                <Input
                  placeholder="Your option"
                  value={formData.customUsp}
                  onChange={(e) => setFormData({ ...formData, customUsp: e.target.value.slice(0, 300) })}
                  className="w-full"
                  maxLength={300}
                />
                <div className="text-xs text-gray-500 text-right">{formData.customUsp.length}/300</div>
              </div>
            </CardContent>
          </Card>

          {/* Question 5 - Goal */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">You want to:</Label>
                <div className="space-y-2">
                  {goalOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={formData.goal.includes(option)}
                        onCheckedChange={(checked) => handleGoalChange(option, checked as boolean)}
                      />
                      <Label htmlFor={option} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
                <Input
                  placeholder="Your option"
                  value={formData.customGoal}
                  onChange={(e) => setFormData({ ...formData, customGoal: e.target.value.slice(0, 300) })}
                  className="w-full"
                  maxLength={300}
                />
                <div className="text-xs text-gray-500 text-right">{formData.customGoal.length}/300</div>
              </div>
            </CardContent>
          </Card>

          {/* Question 6 - Current Landing Link */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-3">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </BriefLayout>
  )
}
