"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function PresentationStep1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    companyActivity: "",
    companyValue: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    if (existingData) {
      setFormData({
        companyName: existingData.companyName || "",
        companyActivity: existingData.companyActivity || "",
        companyValue: existingData.companyValue || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return formData.companyName.trim() !== "" &&
        formData.companyActivity !== "" &&
        formData.companyValue.trim() !== ""
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-2")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/")
  }

  return (
      <BriefLayout currentStep={1} totalSteps={7} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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

        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>
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
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 300) })}
                        maxLength={300}
                        required
                    />
                    <label className="label">Company name *</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.companyName.length}/300</div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Activity */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What does your company do? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.companyActivity}
                        onValueChange={(value) => setFormData({ ...formData, companyActivity: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manufacturing" id="manufacturing" />
                        <Label htmlFor="manufacturing">Manufacturing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="services" id="services" />
                        <Label htmlFor="services">Services</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="retail" id="retail" />
                        <Label htmlFor="retail">Retail</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Company Value */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">What is your company's value? <span className="text-red-500">*</span></Label>
                    <p className="text-sm text-gray-600">Briefly formulate your company's mission and values.</p>
                    <div className={`animated-input-container ${formData.companyValue ? 'has-value' : ''}`}>
                      <textarea
                          value={formData.companyValue}
                          onChange={(e) => setFormData({ ...formData, companyValue: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          rows={4}
                          required
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.companyValue.length}/300</div>
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