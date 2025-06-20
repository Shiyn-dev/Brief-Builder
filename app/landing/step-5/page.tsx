"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function LandingStep5() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    dislikedWebsites: "",
    colorScheme: "",
    landingBlocks: [] as string[],
  })

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem(
      "landingBrief",
      JSON.stringify({
        ...existingData,
        ...formData,
      }),
    )
    router.push("/landing/step-6")
  }

  const handlePrev = () => {
    router.push("/landing/step-4")
  }

  const handleBlockChange = (block: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        landingBlocks: [...formData.landingBlocks, block],
      })
    } else {
      setFormData({
        ...formData,
        landingBlocks: formData.landingBlocks.filter((b) => b !== block),
      })
    }
  }

  const blocks = [
    "Main screen",
    "About the company/expert",
    "About the product/service/product",
    "For whom is the product/service/goods",
    "Program (if courses, events...)",
    "Cost/Rates",
    "Reviews",
    "Frequently asked questions",
  ]

  return (
    <BriefLayout currentStep={5} totalSteps={6} title="Brief for the Landing:" onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>

        <div className="space-y-6">
          {/* Disliked Websites */}
          <div className="space-y-2">
            <Label htmlFor="dislikedWebsites" className="text-base font-medium">
              Are there any examples of websites that you don't like? Why?
            </Label>
            <Textarea
              id="dislikedWebsites"
              value={formData.dislikedWebsites}
              onChange={(e) => setFormData({ ...formData, dislikedWebsites: e.target.value })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
            />
          </div>

          {/* Color Scheme */}
          <div className="space-y-2">
            <Label htmlFor="colorScheme" className="text-base font-medium">
              Is there a preferred color scheme or code for the landing page?
            </Label>
            <Input
              id="colorScheme"
              value={formData.colorScheme}
              onChange={(e) => setFormData({ ...formData, colorScheme: e.target.value })}
              className="w-full"
              placeholder="Your option"
            />
          </div>

          {/* Landing Blocks */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What blocks should your landing page consist of?</Label>
            <div className="grid grid-cols-2 gap-3">
              {blocks.map((block) => (
                <div key={block} className="flex items-center space-x-2">
                  <Checkbox
                    id={block}
                    checked={formData.landingBlocks.includes(block)}
                    onCheckedChange={(checked) => handleBlockChange(block, checked as boolean)}
                  />
                  <Label htmlFor={block} className="text-sm">
                    {block}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Your option"
              className="w-full mt-2"
              onChange={(e) => {
                if (e.target.value) {
                  setFormData({
                    ...formData,
                    landingBlocks: [...formData.landingBlocks, e.target.value],
                  })
                }
              }}
            />
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
