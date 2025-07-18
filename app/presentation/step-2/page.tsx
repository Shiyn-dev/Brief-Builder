"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function PresentationStep2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    presentationPurpose: [] as string[],
    mainMessage: "",
    desiredResult: "",
    customResult: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    if (existingData) {
      setFormData({
        presentationPurpose: existingData.presentationPurpose || [],
        mainMessage: existingData.mainMessage || "",
        desiredResult: existingData.desiredResult || "",
        customResult: existingData.customResult || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return formData.presentationPurpose.length > 0 &&
        formData.mainMessage.trim() !== "" &&
        (formData.desiredResult !== "" && formData.desiredResult !== "other" ||
            formData.desiredResult === "other" && formData.customResult.trim() !== "")
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-3")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-1")
  }

  const handlePurposeChange = (purpose: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        presentationPurpose: [...formData.presentationPurpose, purpose],
      })
    } else {
      setFormData({
        ...formData,
        presentationPurpose: formData.presentationPurpose.filter((p) => p !== purpose),
      })
    }
  }

  const purposes = [
    "Providing information about goods/services",
    "Commercial offer",
    "Information support for clients",
    "Forming a general idea about the company",
    "Brand/product promotion",
    "Introducing a new product/service to the market",
    "Attracting partners, clients, sponsors",
  ]

  return (
      <BriefLayout currentStep={2} totalSteps={7} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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
        `}</style>

        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>
        <Card className="bg-[#F0F9FA] shadow-none border-none p-0">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* Presentation Purpose */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What is the purpose of creating a presentation? <span className="text-red-500">*</span></Label>
                    <div className="grid grid-cols-2 gap-3">
                      {purposes.map((purpose) => (
                          <div key={purpose} className="flex items-center space-x-2">
                            <Checkbox
                                id={purpose}
                                checked={formData.presentationPurpose.includes(purpose)}
                                onCheckedChange={(checked) => handlePurposeChange(purpose, checked as boolean)}
                            />
                            <Label htmlFor={purpose} className="text-sm">
                              {purpose}
                            </Label>
                          </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Message */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What is the main message of the presentation? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.mainMessage.trim() !== '' ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.mainMessage}
                          onChange={(e) => setFormData({ ...formData, mainMessage: e.target.value })}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Desired Result */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What kind of result do you want to get from the presentation? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.desiredResult}
                        onValueChange={(value) => setFormData({ ...formData, desiredResult: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="increasing-sales" id="increasing-sales" />
                        <Label htmlFor="increasing-sales">Increasing sales</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="attracting-investors" id="attracting-investors" />
                        <Label htmlFor="attracting-investors">Attracting investors</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>

                    <div className={`animated-input-container ${formData.customResult.trim() !== '' ? 'has-value' : ''} ${formData.desiredResult !== 'other' ? 'opacity-50' : ''}`}>
                      <input
                          type="text"
                          value={formData.customResult}
                          onChange={(e) => setFormData({ ...formData, customResult: e.target.value })}
                          disabled={formData.desiredResult !== 'other'}
                          style={{
                            color: formData.desiredResult !== 'other' ? '#999' : '#333'
                          }}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
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