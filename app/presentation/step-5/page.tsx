"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function PresentationStep5() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    needAnimation: "",
    designStyle: [] as string[],
    customStyle: "",
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
    router.push("/presentation/step-6")
  }

  const handlePrev = () => {
    router.push("/presentation/step-4")
  }

  const handleStyleChange = (style: string, checked: boolean) => {
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

  const styleOptions = [
    "Infographics",
    "Lots of emotional photos",
    "Illustrations (flat style)",
    "Business style",
    "Minimalism",
  ]

  return (
    <BriefLayout currentStep={5} totalSteps={9} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* Animation */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Do you need animation?</Label>
            <RadioGroup
              value={formData.needAnimation}
              onValueChange={(value) => setFormData({ ...formData, needAnimation: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Design Style */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What design style do you prefer?</Label>
            <div className="space-y-2">
              {styleOptions.map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox
                    id={style}
                    checked={formData.designStyle.includes(style)}
                    onCheckedChange={(checked) => handleStyleChange(style, checked as boolean)}
                  />
                  <Label htmlFor={style} className="text-sm">
                    {style}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Your option"
              value={formData.customStyle}
              onChange={(e) => setFormData({ ...formData, customStyle: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customStyle.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
