"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function PresentationStep5() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    preferredColors: "",
    avoidColors: "",
    successfulExamples: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    if (existingData) {
      setFormData({
        preferredColors: existingData.preferredColors || "",
        avoidColors: existingData.avoidColors || "",
        successfulExamples: existingData.successfulExamples || "",
      })
    }
  }, [])

  // ВАЛИДАЦИЯ - ВСЕ ПОЛЯ ОБЯЗАТЕЛЬНЫЕ!
  const isFormValid = () => {
    return formData.preferredColors.trim() !== "" &&
        formData.avoidColors.trim() !== "" &&
        formData.successfulExamples.trim() !== ""
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-6")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-4")
  }

  return (
      <BriefLayout currentStep={5} totalSteps={7} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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

        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>
        <Card className="bg-[#F0F9FA] shadow-none border-none p-0">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* Preferred Colors */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What colors do you want to see in the presentation? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.preferredColors ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.preferredColors}
                          onChange={(e) => setFormData({ ...formData, preferredColors: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.preferredColors.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Colors to Avoid */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What colors should absolutely not be used? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.avoidColors ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.avoidColors}
                          onChange={(e) => setFormData({ ...formData, avoidColors: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.avoidColors.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Successful Examples */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Examples of successful presentations, if any: <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.successfulExamples ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.successfulExamples}
                          onChange={(e) => setFormData({ ...formData, successfulExamples: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.successfulExamples.length}/300</div>
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