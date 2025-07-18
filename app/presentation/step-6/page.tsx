"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function PresentationStep6() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    unsuccessfulExamples: "",
    readyMadeContent: "",
    customContent: "",
    readyMadeStructure: "",
    customStructure: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    if (existingData) {
      setFormData({
        unsuccessfulExamples: existingData.unsuccessfulExamples || "",
        readyMadeContent: existingData.readyMadeContent || "",
        customContent: existingData.customContent || "",
        readyMadeStructure: existingData.readyMadeStructure || "",
        customStructure: existingData.customStructure || "",
      })
    }
  }, [])

  // ВАЛИДАЦИЯ - ВСЕ ПОЛЯ ОБЯЗАТЕЛЬНЫЕ! ИСПРАВЛЕНО!
  const isFormValid = () => {
    return formData.unsuccessfulExamples.trim() !== "" &&
        formData.readyMadeContent !== "" &&
        formData.readyMadeStructure !== ""
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-7")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-5")
  }

  return (
      <BriefLayout currentStep={6} totalSteps={7} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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
              {/* Unsuccessful Examples */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className={`animated-input-container ${formData.unsuccessfulExamples ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.unsuccessfulExamples}
                        onChange={(e) => setFormData({ ...formData, unsuccessfulExamples: e.target.value.slice(0, 300) })}
                        maxLength={300}
                    />
                    <label className="label">Examples of unsuccessful presentations, if you know:</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.unsuccessfulExamples.length}/300</div>
                  </div>
                </CardContent>
              </Card>

              {/* Ready-made Content */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Is there ready-made content for the presentation?</Label>
                    <RadioGroup
                        value={formData.readyMadeContent}
                        onValueChange={(value) => setFormData({ ...formData, readyMadeContent: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="content-yes" />
                        <Label htmlFor="content-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="content-no" />
                        <Label htmlFor="content-no">No</Label>
                      </div>
                    </RadioGroup>

                    {/* Your option для content */}
                    <div className={`animated-input-container ${formData.customContent ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customContent}
                          onChange={(e) => setFormData({ ...formData, customContent: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customContent.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ready-made Structure */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Is there a ready-made presentation structure?</Label>
                    <RadioGroup
                        value={formData.readyMadeStructure}
                        onValueChange={(value) => setFormData({ ...formData, readyMadeStructure: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="structure-yes" />
                        <Label htmlFor="structure-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="structure-no" />
                        <Label htmlFor="structure-no">No</Label>
                      </div>
                    </RadioGroup>

                    {/* Your option для structure */}
                    <div className={`animated-input-container ${formData.customStructure ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customStructure}
                          onChange={(e) => setFormData({ ...formData, customStructure: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customStructure.length}/300</div>
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