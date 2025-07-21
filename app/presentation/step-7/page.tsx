"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function PresentationStep7() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    slidesCount: "",
    customSlidesCount: "",
    needContentHelp: "",
    customContentHelp: "",
    visualMaterials: [] as string[],
    customVisualMaterials: "",
  })

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    if (existingData) {
      setFormData({
        slidesCount: existingData.slidesCount || "",
        customSlidesCount: existingData.customSlidesCount || "",
        needContentHelp: existingData.needContentHelp || "",
        customContentHelp: existingData.customContentHelp || "",
        visualMaterials: existingData.visualMaterials || [],
        customVisualMaterials: existingData.customVisualMaterials || "",
      })
    }
  }, [])

  const isFormValid = () => {
    return (formData.slidesCount !== "" || formData.customSlidesCount.trim() !== "") &&
        (formData.needContentHelp !== "" || formData.customContentHelp.trim() !== "") &&
        (formData.visualMaterials.length > 0 || formData.customVisualMaterials.trim() !== "")
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/complete")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-6")
  }

  const handleVisualMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        visualMaterials: [...formData.visualMaterials, material],
      })
    } else {
      setFormData({
        ...formData,
        visualMaterials: formData.visualMaterials.filter((m) => m !== material),
      })
    }
  }

  const visualMaterialOptions = [
    "Pictures",
    "Photographs",
    "Videos",
    "Etc",
  ]

  return (
      <BriefLayout
          currentStep={7}
          totalSteps={7}
          onNext={handleNext}
          onPrev={handlePrev}
          isNextDisabled={!isFormValid()}
          nextText="Complete the Brief"
      >
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
              {/* Slides Count */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">How many slides will your presentation have? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.slidesCount}
                        onValueChange={(value) => setFormData({ ...formData, slidesCount: value })}
                        className="flex flex-row gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="up-to-5" id="slides-5" />
                        <Label htmlFor="slides-5">Up to 5</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="up-to-10" id="slides-10" />
                        <Label htmlFor="slides-10">Up to 10</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="slides-other" />
                        <Label htmlFor="slides-other">Other</Label>
                      </div>
                    </RadioGroup>

                    <div className={`animated-input-container ${formData.customSlidesCount ? 'has-value' : ''} ${formData.slidesCount !== 'other' ? 'opacity-50' : ''}`}>
                      <input
                          type="text"
                          value={formData.customSlidesCount}
                          onChange={(e) => setFormData({ ...formData, customSlidesCount: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          disabled={formData.slidesCount !== 'other'}
                          style={{
                            color: formData.slidesCount !== 'other' ? '#999' : '#333'
                          }}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customSlidesCount.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Help */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Do you need help preparing content for your presentation? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.needContentHelp}
                        onValueChange={(value) => setFormData({ ...formData, needContentHelp: value })}
                        className="flex flex-row gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="help-yes" />
                        <Label htmlFor="help-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="help-no" />
                        <Label htmlFor="help-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="help-other" />
                        <Label htmlFor="help-other">Other</Label>
                      </div>
                    </RadioGroup>

                    <div className={`animated-input-container ${formData.customContentHelp ? 'has-value' : ''} ${formData.needContentHelp !== 'other' ? 'opacity-50' : ''}`}>
                      <input
                          type="text"
                          value={formData.customContentHelp}
                          onChange={(e) => setFormData({ ...formData, customContentHelp: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          disabled={formData.needContentHelp !== 'other'}
                          style={{
                            color: formData.needContentHelp !== 'other' ? '#999' : '#333'
                          }}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customContentHelp.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Materials */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What visual materials can you provide? <span className="text-red-500">*</span></Label>
                    <div className="grid grid-cols-2 gap-3">
                      {visualMaterialOptions.map((material) => (
                          <div key={material} className="flex items-center space-x-2">
                            <Checkbox
                                id={material}
                                checked={formData.visualMaterials.includes(material)}
                                onCheckedChange={(checked) => handleVisualMaterialChange(material, checked as boolean)}
                            />
                            <Label htmlFor={material} className="text-sm">
                              {material}
                            </Label>
                          </div>
                      ))}
                    </div>

                    <div className={`animated-input-container ${formData.customVisualMaterials ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customVisualMaterials}
                          onChange={(e) => setFormData({ ...formData, customVisualMaterials: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customVisualMaterials.length}/300</div>
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