"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

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
    if (existingData) {
      setFormData({
        audience: existingData.audience || "",
        customAudience: existingData.customAudience || "",
        mainCompetitor: existingData.mainCompetitor || "",
        successfulCompetitors: existingData.successfulCompetitors || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        (formData.audience !== "" && formData.audience !== "custom" ||
            formData.audience === "custom" && formData.customAudience.trim() !== "") &&
        formData.mainCompetitor.trim() !== "" &&
        formData.successfulCompetitors.trim() !== ""
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
    router.push("/landing/step-5")
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
    router.push("/landing/step-3")
  }

  return (
      <BriefLayout currentStep={4} totalSteps={6} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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

          .animated-input-container input:disabled {
            color: #999 !important;
            cursor: not-allowed !important;
          }

          .animated-textarea-container {
            position: relative;
            margin: 20px 0;
            width: 100%;
            border-bottom: 2px solid #ccc;
          }

          .animated-textarea-container textarea {
            font-size: 16px !important;
            width: 100% !important;
            border: none !important;
            padding: 12px 0 8px 0 !important;
            background-color: transparent !important;
            outline: none !important;
            color: #333 !important;
            font-family: inherit !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            resize: none !important;
            line-height: 1.5 !important;
            min-height: 80px !important;
          }

          .animated-input-container .label,
          .animated-textarea-container .label {
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
          .animated-input-container.has-value .label,
          .animated-textarea-container textarea:focus ~ .label,
          .animated-textarea-container.has-value .label {
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

          .animated-textarea-container .underline {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            height: 2px !important;
            width: 100% !important;
            background-color: #68B3C0 !important;
            transform: scaleX(0) !important;
            transition: all 0.3s ease !important;
          }

          .animated-input-container input:focus ~ .underline,
          .animated-textarea-container textarea:focus ~ .underline {
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
              {/* Audience - РАДИОКНОПКИ ПО ГОРИЗОНТАЛИ */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Who is your main audience? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.audience}
                        onValueChange={(value) => setFormData({ ...formData, audience: value })}
                        className="flex flex-row gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="b2b" id="b2b" />
                        <Label htmlFor="b2b">B2B segment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="b2c" id="b2c" />
                        <Label htmlFor="b2c">B2C segment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="custom">Other</Label>
                      </div>
                    </RadioGroup>

                    <div className={`animated-input-container ${formData.customAudience ? 'has-value' : ''} ${formData.audience !== 'custom' ? 'opacity-50' : ''}`}>
                      <input
                          type="text"
                          value={formData.customAudience}
                          onChange={(e) => setFormData({ ...formData, customAudience: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          disabled={formData.audience !== 'custom'}
                          style={{
                            color: formData.audience !== 'custom' ? '#999' : '#333'
                          }}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customAudience.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Competitor */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Who is your main competitor? Provide a name or link <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.mainCompetitor ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.mainCompetitor}
                          onChange={(e) => setFormData({ ...formData, mainCompetitor: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.mainCompetitor.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Successful Competitors - ОТДЕЛЬНЫЙ КОНТЕЙНЕР ДЛЯ TEXTAREA */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What competitors' websites do you consider successful? Why? <span className="text-red-500">*</span></Label>
                    <div className={`animated-textarea-container ${formData.successfulCompetitors ? 'has-value' : ''}`}>
                      <textarea
                          value={formData.successfulCompetitors}
                          onChange={(e) => setFormData({ ...formData, successfulCompetitors: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          rows={4}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.successfulCompetitors.length}/300</div>
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