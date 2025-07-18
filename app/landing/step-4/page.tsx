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
            color: #038196;
          }

          .animated-input-container .underline {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100%;
            background-color: #038196;
            transform: scaleX(0);
            transition: all 0.3s ease;
          }

          .animated-input-container textarea ~ .underline {
            bottom: 8px;
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
              {/* Audience */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Who is your main audience? <span className="text-red-500">*</span></Label>
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
                          required
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
                          required
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.mainCompetitor.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Successful Competitors */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What competitors' websites do you consider successful? Why? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.successfulCompetitors ? 'has-value' : ''}`}>
                      <textarea
                          value={formData.successfulCompetitors}
                          onChange={(e) => setFormData({ ...formData, successfulCompetitors: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          rows={4}
                          required
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