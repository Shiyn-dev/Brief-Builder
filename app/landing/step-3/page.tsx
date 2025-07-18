"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingStep3() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentDesignLikes: "",
    purpose: "",
    customPurpose: "",
    whyBuyFromYou: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    if (existingData) {
      setFormData({
        currentDesignLikes: existingData.currentDesignLikes || "",
        purpose: existingData.purpose || "",
        customPurpose: existingData.customPurpose || "",
        whyBuyFromYou: existingData.whyBuyFromYou || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        formData.currentDesignLikes.trim() !== "" &&
        (formData.purpose !== "" && formData.purpose !== "custom" ||
            formData.purpose === "custom" && formData.customPurpose.trim() !== "") &&
        formData.whyBuyFromYou.trim() !== ""
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
    router.push("/landing/step-4")
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
    router.push("/landing/step-2")
  }

  return (
      <BriefLayout currentStep={3} totalSteps={6} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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
              {/* Current Design Likes */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What do you like about your current landing page design? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.currentDesignLikes ? 'has-value' : ''}`}>
                      <textarea
                          value={formData.currentDesignLikes}
                          onChange={(e) => setFormData({ ...formData, currentDesignLikes: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          rows={4}
                          required
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.currentDesignLikes.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Purpose */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What is the purpose of developing a landing page: <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.purpose}
                        onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sale-goods-services" id="sale-goods-services" />
                        <Label htmlFor="sale-goods-services">Sale of goods/services/training</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="event-registration" id="event-registration" />
                        <Label htmlFor="event-registration">Registration for the event</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business-card" id="business-card" />
                        <Label htmlFor="business-card">Landing page business card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="custom">Other</Label>
                      </div>
                    </RadioGroup>

                    <div className={`animated-input-container ${formData.customPurpose ? 'has-value' : ''} ${formData.purpose !== 'custom' ? 'opacity-50' : ''}`}>
                      <input
                          type="text"
                          value={formData.customPurpose}
                          onChange={(e) => setFormData({ ...formData, customPurpose: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          disabled={formData.purpose !== 'custom'}
                          style={{
                            color: formData.purpose !== 'custom' ? '#999' : '#333'
                          }}
                          required
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customPurpose.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Buy From You */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Why should a person buy from you? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.whyBuyFromYou ? 'has-value' : ''}`}>
                      <textarea
                          value={formData.whyBuyFromYou}
                          onChange={(e) => setFormData({ ...formData, whyBuyFromYou: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          rows={4}
                          required
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.whyBuyFromYou.length}/300</div>
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