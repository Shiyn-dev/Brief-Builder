"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PresentationStep6() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    presentationFormat: "",
    preferredColors: "",
    avoidColors: "",
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
    router.push("/presentation/step-7")
  }

  const handlePrev = () => {
    router.push("/presentation/step-5")
  }

  return (
    <BriefLayout currentStep={6} totalSteps={9} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* Presentation Format */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What format of presentation do you need?</Label>
            <RadioGroup
              value={formData.presentationFormat}
              onValueChange={(value) => setFormData({ ...formData, presentationFormat: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="16:9" id="16:9" />
                <Label htmlFor="16:9">16:9</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4:3" id="4:3" />
                <Label htmlFor="4:3">4:3</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              className="w-full mt-2"
              onChange={(e) => setFormData({ ...formData, presentationFormat: e.target.value.slice(0, 300) })}
              maxLength={300}
            />
          </div>

          {/* Preferred Colors */}
          <div className="space-y-2">
            <Label htmlFor="preferredColors" className="text-base font-medium">
              What colors do you want to see in the presentation?
            </Label>
            <Input
              id="preferredColors"
              value={formData.preferredColors}
              onChange={(e) => setFormData({ ...formData, preferredColors: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.preferredColors.length}/300</div>
          </div>

          {/* Colors to Avoid */}
          <div className="space-y-2">
            <Label htmlFor="avoidColors" className="text-base font-medium">
              What colors should absolutely not be used?
            </Label>
            <Input
              id="avoidColors"
              value={formData.avoidColors}
              onChange={(e) => setFormData({ ...formData, avoidColors: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.avoidColors.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
