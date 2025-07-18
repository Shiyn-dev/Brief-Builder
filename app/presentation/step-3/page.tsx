"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function PresentationStep3() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    targetAudience: [] as string[],
    customAudience: "",
    presentationUsage: [] as string[],
    customUsage: "",
    presentationFormat: [] as string[],
    customFormat: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    if (existingData) {
      setFormData({
        targetAudience: existingData.targetAudience || [],
        customAudience: existingData.customAudience || "",
        presentationUsage: existingData.presentationUsage || [],
        customUsage: existingData.customUsage || "",
        presentationFormat: existingData.presentationFormat || [],
        customFormat: existingData.customFormat || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (formData.targetAudience.length > 0 || formData.customAudience.trim() !== "") &&
        (formData.presentationUsage.length > 0 || formData.customUsage.trim() !== "") &&
        (formData.presentationFormat.length > 0 || formData.customFormat.trim() !== "")
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-4")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem("presentationBrief", JSON.stringify({
      ...existingData,
      ...formData,
    }))
    router.push("/presentation/step-2")
  }

  const handleAudienceChange = (audience: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        targetAudience: [...formData.targetAudience, audience],
      })
    } else {
      setFormData({
        ...formData,
        targetAudience: formData.targetAudience.filter((a) => a !== audience),
      })
    }
  }

  const handleUsageChange = (usage: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        presentationUsage: [...formData.presentationUsage, usage],
      })
    } else {
      setFormData({
        ...formData,
        presentationUsage: formData.presentationUsage.filter((u) => u !== usage),
      })
    }
  }

  const handleFormatChange = (format: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        presentationFormat: [...formData.presentationFormat, format],
      })
    } else {
      setFormData({
        ...formData,
        presentationFormat: formData.presentationFormat.filter((f) => f !== format),
      })
    }
  }

  const audiences = [
    "Clients",
    "Company employees",
    "Retail chains",
    "Investors/Shareholders",
    "Partners/contractors",
  ]

  const usageOptions = [
    "With a speaker (large audience, screen)",
    "Send by email for self-study",
    "Slideshow (exhibition/conference)",
    "Internet presentation",
  ]

  const formatOptions = [
    "PowerPoint (*.pptx)",
    "Animated presentation (*.pptx)",
    "PDF for printing",
    "HTML version (online)",
    "Video presentation",
  ]

  return (
      <BriefLayout currentStep={3} totalSteps={7} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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
              {/* Target Audience */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Who is the presentation being created for?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {audiences.map((audience) => (
                          <div key={audience} className="flex items-center space-x-2">
                            <Checkbox
                                id={audience}
                                checked={formData.targetAudience.includes(audience)}
                                onCheckedChange={(checked) => handleAudienceChange(audience, checked as boolean)}
                            />
                            <Label htmlFor={audience} className="text-sm">
                              {audience}
                            </Label>
                          </div>
                      ))}
                    </div>

                    {/* Your option для audience */}
                    <div className={`animated-input-container ${formData.customAudience ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customAudience}
                          onChange={(e) => setFormData({ ...formData, customAudience: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customAudience.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Presentation Usage */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">How will the presentation be used?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {usageOptions.map((usage) => (
                          <div key={usage} className="flex items-center space-x-2">
                            <Checkbox
                                id={usage}
                                checked={formData.presentationUsage.includes(usage)}
                                onCheckedChange={(checked) => handleUsageChange(usage, checked as boolean)}
                            />
                            <Label htmlFor={usage} className="text-sm">
                              {usage}
                            </Label>
                          </div>
                      ))}
                    </div>

                    {/* Your option для usage */}
                    <div className={`animated-input-container ${formData.customUsage ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customUsage}
                          onChange={(e) => setFormData({ ...formData, customUsage: e.target.value.slice(0, 300) })}
                          maxLength={300}
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customUsage.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Presentation Format */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What format of presentation do you need?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {formatOptions.map((format) => (
                          <div key={format} className="flex items-center space-x-2">
                            <Checkbox
                                id={format}
                                checked={formData.presentationFormat.includes(format)}
                                onCheckedChange={(checked) => handleFormatChange(format, checked as boolean)}
                            />
                            <Label htmlFor={format} className="text-sm">
                              {format}
                            </Label>
                          </div>
                      ))}
                    </div>

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