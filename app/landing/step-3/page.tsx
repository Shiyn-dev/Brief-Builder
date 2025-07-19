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
    currentDesign: "",
    purpose: "",
    customPurpose: "",
    whyBuyFromYou: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    if (existingData) {
      setFormData({
        currentDesign: existingData.currentDesign || "",
        purpose: existingData.purpose || "",
        customPurpose: existingData.customPurpose || "",
        whyBuyFromYou: existingData.whyBuyFromYou || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        formData.currentDesign.trim() !== "" &&
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
        <style jsx global>{`
          .animated-input-container {
            position: relative;
            margin: 20px 0;
            width: 100%;
          }

          .animated-input-container::after {
            content: '';
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #ccc;
            z-index: 0;
          }

          .animated-input-container input {
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
            text-decoration: none !important;
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
            bottom: 0px !important;
            left: 0 !important;
            height: 2px !important;
            width: 100% !important;
            background-color: #68B3C0 !important;
            transform: scaleX(0) !important;
            transition: all 0.3s ease !important;
            z-index: 1 !important;
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
              {/* Current Design */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What do you like about your current landing page design? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.currentDesign ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.currentDesign}
                          onChange={(e) => setFormData({ ...formData, currentDesign: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.currentDesign.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Purpose - Радиокнопки горизонтально как на макете */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What is the purpose of developing a landing page? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.purpose}
                        onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                        className="flex flex-row gap-6 flex-wrap"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sale" id="sale" />
                        <Label htmlFor="sale">Sale of goods/services/training</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="registration" id="registration" />
                        <Label htmlFor="registration">Registration for the event</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business_card" id="business_card" />
                        <Label htmlFor="business_card">Landing page - business card</Label>
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
                      <input
                          type="text"
                          value={formData.whyBuyFromYou}
                          onChange={(e) => setFormData({ ...formData, whyBuyFromYou: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
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