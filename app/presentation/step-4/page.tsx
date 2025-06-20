"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function PresentationStep4() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    presentationUsage: [] as string[],
    customUsage: "",
    presentationFormat: [] as string[],
    customFormat: "",
  })

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem(
      "presentationBrief",
      JSON.stringify({
        ...existingData,
        ...formData,
      }),
    )
    router.push("/presentation/step-5")
  }

  const handlePrev = () => {
    router.push("/presentation/step-3")
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
    <BriefLayout currentStep={4} totalSteps={9} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* Presentation Usage */}
          <div className="space-y-3">
            <Label className="text-base font-medium">How will the presentation be used?</Label>
            <div className="space-y-2">
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
            <Input
              placeholder="Your option"
              value={formData.customUsage}
              onChange={(e) => setFormData({ ...formData, customUsage: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customUsage.length}/300</div>
          </div>

          {/* Presentation Format */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What format of presentation do you need?</Label>
            <div className="space-y-2">
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
            <Input
              placeholder="Your option"
              value={formData.customFormat}
              onChange={(e) => setFormData({ ...formData, customFormat: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customFormat.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
