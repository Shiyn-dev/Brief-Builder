"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PresentationStep8() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hasReadyStructure: "",
    slidesCount: "",
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
    router.push("/presentation/step-9")
  }

  const handlePrev = () => {
    router.push("/presentation/step-7")
  }

  return (
    <BriefLayout currentStep={8} totalSteps={9} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* Ready Structure */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Is there a ready-made presentation structure?</Label>
            <RadioGroup
              value={formData.hasReadyStructure}
              onValueChange={(value) => setFormData({ ...formData, hasReadyStructure: value })}
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
          </div>

          {/* Slides Count */}
          <div className="space-y-3">
            <Label className="text-base font-medium">How many slides will your presentation have?</Label>
            <RadioGroup
              value={formData.slidesCount}
              onValueChange={(value) => setFormData({ ...formData, slidesCount: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="up-to-5" id="up-to-5" />
                <Label htmlFor="up-to-5">Up to 5</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="up-to-10" id="up-to-10" />
                <Label htmlFor="up-to-10">Up to 10</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="more" id="more" />
                <Label htmlFor="more">More</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
