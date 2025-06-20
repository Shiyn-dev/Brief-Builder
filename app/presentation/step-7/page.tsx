"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function PresentationStep7() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    successfulExamples: "",
    unsuccessfulExamples: "",
    hasReadyContent: "",
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
    router.push("/presentation/step-8")
  }

  const handlePrev = () => {
    router.push("/presentation/step-6")
  }

  return (
    <BriefLayout currentStep={7} totalSteps={9} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* Successful Examples */}
          <div className="space-y-2">
            <Label htmlFor="successfulExamples" className="text-base font-medium">
              Examples of successful presentations, if any:
            </Label>
            <Textarea
              id="successfulExamples"
              value={formData.successfulExamples}
              onChange={(e) => setFormData({ ...formData, successfulExamples: e.target.value.slice(0, 300) })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.successfulExamples.length}/300</div>
          </div>

          {/* Unsuccessful Examples */}
          <div className="space-y-2">
            <Label htmlFor="unsuccessfulExamples" className="text-base font-medium">
              Examples of unsuccessful presentations, if you know:
            </Label>
            <Textarea
              id="unsuccessfulExamples"
              value={formData.unsuccessfulExamples}
              onChange={(e) => setFormData({ ...formData, unsuccessfulExamples: e.target.value.slice(0, 300) })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.unsuccessfulExamples.length}/300</div>
          </div>

          {/* Ready Content */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Is there ready-made content for the presentation?</Label>
            <RadioGroup
              value={formData.hasReadyContent}
              onValueChange={(value) => setFormData({ ...formData, hasReadyContent: value })}
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
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
