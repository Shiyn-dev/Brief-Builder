"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function PresentationStep3() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    mainMessage: "",
    desiredResult: "",
    customResult: "",
    targetAudience: [] as string[],
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
    router.push("/presentation/step-4")
  }

  const handlePrev = () => {
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

  const audiences = [
    "Clients",
    "Company employees",
    "Retail chains",
    "Investors/Shareholders",
    "Company employees",
    "Partners/contractors",
  ]

  return (
    <BriefLayout currentStep={3} totalSteps={9} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* Main Message */}
          <div className="space-y-2">
            <Label htmlFor="mainMessage" className="text-base font-medium">
              What is the main message of the presentation?
            </Label>
            <Input
              id="mainMessage"
              value={formData.mainMessage}
              onChange={(e) => setFormData({ ...formData, mainMessage: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.mainMessage.length}/300</div>
          </div>

          {/* Desired Result */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              What kind of result do you want to get from the presentation?
            </Label>
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
            </RadioGroup>
            <Input
              placeholder="Your option"
              value={formData.customResult}
              onChange={(e) => setFormData({ ...formData, customResult: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customResult.length}/300</div>
          </div>

          {/* Target Audience */}
          <div className="space-y-3">
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
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
