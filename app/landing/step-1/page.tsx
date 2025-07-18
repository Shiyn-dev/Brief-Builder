"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingStep1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    fieldOfActivity: "",
    customFieldOfActivity: "",
    ideaAndMission: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    if (existingData) {
      setFormData({
        companyName: existingData.companyName || "",
        fieldOfActivity: existingData.fieldOfActivity || "",
        customFieldOfActivity: existingData.customFieldOfActivity || "",
        ideaAndMission: existingData.ideaAndMission || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        formData.companyName.trim() !== "" &&
        (formData.fieldOfActivity !== "" && formData.fieldOfActivity !== "other" ||
            formData.fieldOfActivity === "other" && formData.customFieldOfActivity.trim() !== "") &&
        formData.ideaAndMission.trim() !== ""
    )
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem("landingBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/landing/step-2")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem("landingBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/")
  }

  const handleFieldOfActivityChange = (value: string) => {
    setFormData({
      ...formData,
      fieldOfActivity: value,
      // НЕ СТИРАЕМ customFieldOfActivity! Просто меняем fieldOfActivity
    })
  }

  return (
      <BriefLayout currentStep={1} totalSteps={6} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
        <style jsx>{`
          .animated-input-container {
            position: relative;
            margin: 20px 0;
            width: 100%;
          }

          .animated-input-container input,
          .animated-input-container textarea {
            font-size: 16px;
            width: 100%;
            border: none;
            border-bottom: 2px solid #ccc;
            padding: 8px 0;
            background-color: transparent;
            outline: none;
            color: #333;
            font-family: inherit;
            resize: none;
          }

          .animated-input-container input:disabled,
          .animated-input-container textarea:disabled {
            color: #999;
            cursor: not-allowed;
          }

          .animated-input-container .label {
            position: absolute;
            top: 8px;
            left: 0;
            color: #999;
            transition: all 0.3s ease;
            pointer-events: none;
            font-size: 16px;
          }

          .animated-input-container input:focus ~ .label,
          .animated-input-container textarea:focus ~ .label,
          .animated-input-container.has-value .label {
            top: -20px;
            font-size: 14px;
            color: #68B3C0;
          }

          .animated-input-container .underline {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100%;
            background-color: #68B3C0;
            transform: scaleX(0);
            transition: all 0.3s ease;
          }

          .animated-input-container input:focus ~ .underline,
          .animated-input-container textarea:focus ~ .underline {
            transform: scaleX(1);
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
              {/* Company Name */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className={`animated-input-container ${formData.companyName ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 100) })}
                        maxLength={100}
                        required
                    />
                    <label className="label">Company name</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.companyName.length}/100</div>
                  </div>
                </CardContent>
              </Card>

              {/* Field of Activity */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">The company's field of activity:</Label>
                    <RadioGroup
                        value={formData.fieldOfActivity}
                        onValueChange={handleFieldOfActivityChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="info-services" id="info-services" />
                        <Label htmlFor="info-services">Info services</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="physical-services" id="physical-services" />
                        <Label htmlFor="physical-services">Physical services</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>

                    {/* ИСПРАВЛЕНО: НЕ стираем текст, просто делаем серым когда disabled */}
                    <div className={`animated-input-container ${formData.customFieldOfActivity ? 'has-value' : ''} ${formData.fieldOfActivity !== 'other' ? 'opacity-50' : ''}`}>
                      <input
                          type="text"
                          value={formData.customFieldOfActivity}
                          onChange={(e) => setFormData({ ...formData, customFieldOfActivity: e.target.value.slice(0, 100) })}
                          maxLength={100}
                          disabled={formData.fieldOfActivity !== 'other'}
                          style={{
                            color: formData.fieldOfActivity !== 'other' ? '#999' : '#333'
                          }}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customFieldOfActivity.length}/100</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Idea and Mission */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className={`animated-input-container ${formData.ideaAndMission ? 'has-value' : ''}`}>
                  <textarea
                      value={formData.ideaAndMission}
                      onChange={(e) => setFormData({ ...formData, ideaAndMission: e.target.value.slice(0, 500) })}
                      maxLength={500}
                      rows={4}
                      required
                  />
                    <label className="label">What is the idea and mission of your Company?</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.ideaAndMission.length}/500</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </BriefLayout>
  )
}