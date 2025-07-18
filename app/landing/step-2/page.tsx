"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
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
        (formData.goal.length > 0 || formData.customGoal.trim() !== "") &&
        formData.currentLandingLink.trim() !== ""
    )
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem("landingBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/landing/step-3")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem("landingBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
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
        <style jsx global>{`
          .animated-input-container {
            position: relative;
            margin: 20px 0;
            width: 100%;
          }

          .animated-input-container input {
            font-size: 16px !important;
            width: 100% !important;
            border: none !important;
            border-bottom: 2px solid #ccc !important;
            padding: 12px 0 8px 0 !important;
            background-color: transparent !important;
            outline: none !important;
            color: #333 !important;
            font-family: inherit !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .animated-input-container .label {
            position: absolute !important;
            top: 12px !important;
            left: 0 !important;
            color: #999 !important;
            transition: all 0.3s ease !important;
            pointer-events: none !important;
            font-size: 16px !important;
            background: transparent !important;
          }

          .animated-input-container input:focus ~ .label,
          .animated-input-container.has-value .label {
            top: -16px !important;
            font-size: 12px !important;
            color: #68B3C0 !important;
          }

          .animated-input-container .underline {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            height: 2px !important;
            width: 100% !important;
            background-color: #68B3C0 !important;
            transform: scaleX(0) !important;
            transition: all 0.3s ease !important;
          }

          .animated-input-container input:focus ~ .underline {
            transform: scaleX(1) !important;
          }

          .char-count {
            position: absolute;
            bottom: -20px;
            right: 0;
            font-size: 12px;
            color: #999;
          }
        `}</style>

        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>
        <Card className="bg-[#F0F9FA] shadow-none border-none p-0">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* Question 4 - USP - ЧЕКБОКСЫ ПО ГОРИЗОНТАЛИ */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Unique selling proposition (USP) of the company/service? <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
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

                    <div className={`animated-input-container ${formData.customUsp ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customUsp}
                          onChange={(e) => setFormData({ ...formData, customUsp: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customUsp.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question 5 - Goal - ЧЕКБОКСЫ ПО ГОРИЗОНТАЛИ */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">You want to: <span className="text-red-500">*</span></Label>
                    <div className="flex flex-row gap-6 flex-wrap">
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

                    <div className={`animated-input-container ${formData.customGoal ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customGoal}
                          onChange={(e) => setFormData({ ...formData, customGoal: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customGoal.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question 6 - Current Landing Link */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">If you have a landing page, provide a link to it: <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.currentLandingLink ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.currentLandingLink}
                          onChange={(e) => setFormData({ ...formData, currentLandingLink: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.currentLandingLink.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </BriefLayout>
  )
}