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
    })
  }

  return (
      <BriefLayout currentStep={1} totalSteps={6} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
        <style jsx global>{`
          /* ГЛОБАЛЬНОЕ ОТКЛЮЧЕНИЕ ВСЕХ ПОДЧЕРКИВАНИЙ */
          * {
            text-decoration: none !important;
            -webkit-text-decoration: none !important;
            -moz-text-decoration: none !important;
            -ms-text-decoration: none !important;
          }

          input {
            text-decoration: none !important;
            -webkit-text-decoration: none !important;
            -moz-text-decoration: none !important;
            -ms-text-decoration: none !important;
            text-decoration-line: none !important;
            -webkit-text-decoration-line: none !important;
            text-decoration-style: none !important;
            -webkit-text-decoration-style: none !important;
            text-decoration-color: transparent !important;
            -webkit-text-decoration-color: transparent !important;
            text-underline-offset: unset !important;
            -webkit-text-underline-offset: unset !important;
          }

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
            text-decoration: none !important;
            -webkit-text-decoration: none !important;
            -moz-text-decoration: none !important;
            -ms-text-decoration: none !important;
            text-decoration-line: none !important;
            -webkit-text-decoration-line: none !important;
            text-decoration-style: none !important;
            -webkit-text-decoration-style: none !important;
            text-decoration-color: transparent !important;
            -webkit-text-decoration-color: transparent !important;
            text-underline-offset: unset !important;
            -webkit-text-underline-offset: unset !important;
          }

          .animated-input-container input:disabled {
            color: #999 !important;
            cursor: not-allowed !important;
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
              {/* Company Name */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Company name <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.companyName ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.companyName.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Field of Activity - РАДИОКНОПКИ ПО ГОРИЗОНТАЛИ */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">The company's field of activity: <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.fieldOfActivity}
                        onValueChange={handleFieldOfActivityChange}
                        className="flex flex-row gap-6"
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

                    <div className={`animated-input-container ${formData.customFieldOfActivity ? 'has-value' : ''} ${formData.fieldOfActivity !== 'other' ? 'opacity-50' : ''}`}>
                      <input
                          type="text"
                          value={formData.customFieldOfActivity}
                          onChange={(e) => setFormData({ ...formData, customFieldOfActivity: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          disabled={formData.fieldOfActivity !== 'other'}
                          style={{
                            color: formData.fieldOfActivity !== 'other' ? '#999' : '#333'
                          }}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customFieldOfActivity.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Idea and Mission - ТЕПЕРЬ ТОЖЕ INPUT! */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What is the idea and mission of your Company? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.ideaAndMission ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.ideaAndMission}
                          onChange={(e) => setFormData({ ...formData, ideaAndMission: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.ideaAndMission.length}/300</div>
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