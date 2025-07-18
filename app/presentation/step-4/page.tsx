"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function PresentationStep4() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    needAnimation: "",
    customAnimation: "",
    designStyle: [] as string[],
    customDesignStyle: "",
    presentationFormat: "",
    customFormat: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    if (existingData) {
      setFormData({
        needAnimation: existingData.needAnimation || "",
        customAnimation: existingData.customAnimation || "",
        designStyle: existingData.designStyle || [],
        customDesignStyle: existingData.customDesignStyle || "",
        presentationFormat: existingData.presentationFormat || "",
        customFormat: existingData.customFormat || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return formData.needAnimation !== "" &&
        (formData.designStyle.length > 0 || formData.customDesignStyle.trim() !== "") &&
        formData.presentationFormat !== ""
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-5")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-3")
  }

  const handleDesignStyleChange = (style: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        designStyle: [...formData.designStyle, style],
      })
    } else {
      setFormData({
        ...formData,
        designStyle: formData.designStyle.filter((s) => s !== style),
      })
    }
  }

  const designStyles = [
    "Infographics",
    "Lots of emotional photos",
    "Illustrations (flat style)",
    "Business style",
    "Minimalism",
  ]

  return (
      <BriefLayout currentStep={4} totalSteps={7} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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
              {/* Animation Question */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Do you need animation?</Label>
                    <RadioGroup
                        value={formData.needAnimation}
                        onValueChange={(value) => setFormData({ ...formData, needAnimation: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="animation-yes" />
                        <Label htmlFor="animation-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="animation-no" />
                        <Label htmlFor="animation-no">No</Label>
                      </div>
                    </RadioGroup>

                    {/* Your option для animation */}
                    <div className={`animated-input-container ${formData.customAnimation ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customAnimation}
                          onChange={(e) => setFormData({ ...formData, customAnimation: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customAnimation.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Design Style */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What design style do you prefer?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {designStyles.map((style) => (
                          <div key={style} className="flex items-center space-x-2">
                            <Checkbox
                                id={style}
                                checked={formData.designStyle.includes(style)}
                                onCheckedChange={(checked) => handleDesignStyleChange(style, checked as boolean)}
                            />
                            <Label htmlFor={style} className="text-sm">
                              {style}
                            </Label>
                          </div>
                      ))}
                    </div>

                    {/* Your option для design style */}
                    <div className={`animated-input-container ${formData.customDesignStyle ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customDesignStyle}
                          onChange={(e) => setFormData({ ...formData, customDesignStyle: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customDesignStyle.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Presentation Format */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What format of presentation do you need?</Label>
                    <RadioGroup
                        value={formData.presentationFormat}
                        onValueChange={(value) => setFormData({ ...formData, presentationFormat: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="16-9" id="format-16-9" />
                        <Label htmlFor="format-16-9">16:9</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="16-10" id="format-16-10" />
                        <Label htmlFor="format-16-10">16:10</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4-3" id="format-4-3" />
                        <Label htmlFor="format-4-3">4:3</Label>
                      </div>
                    </RadioGroup>

                    {/* Your option для format */}
                    <div className={`animated-input-container ${formData.customFormat ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customFormat}
                          onChange={(e) => setFormData({ ...formData, customFormat: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customFormat.length}/300</div>
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