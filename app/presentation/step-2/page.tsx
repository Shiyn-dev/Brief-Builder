"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function PresentationStep2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyDo: "",
    customCompanyDo: "",
    presentationPurpose: [] as string[],
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
    router.push("/presentation/step-3")
  }

  const handlePrev = () => {
    router.push("/presentation/step-1")
  }

  const handlePurposeChange = (purpose: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        presentationPurpose: [...formData.presentationPurpose, purpose],
      })
    } else {
      setFormData({
        ...formData,
        presentationPurpose: formData.presentationPurpose.filter((p) => p !== purpose),
      })
    }
  }

  const purposes = [
    "Providing information about goods/services",
    "Commercial offer",
    "Information support for clients",
    "Forming a general idea about the company",
    "Brand/product promotion",
    "Introducing a new product/service to the market",
    "Attracting partners, clients, sponsors",
  ]

  return (
    <BriefLayout currentStep={2} totalSteps={9} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* What does your company do */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What does your company do?</Label>
            <RadioGroup
              value={formData.companyDo}
              onValueChange={(value) => setFormData({ ...formData, companyDo: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="product" id="product" />
                <Label htmlFor="product">Product</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="service" id="service" />
                <Label htmlFor="service">Service</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="brand" id="brand" />
                <Label htmlFor="brand">Brand</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="project" id="project" />
                <Label htmlFor="project">Project</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              value={formData.customCompanyDo}
              onChange={(e) => setFormData({ ...formData, customCompanyDo: e.target.value.slice(0, 300) })}
              className="w-full mt-2"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customCompanyDo.length}/300</div>
          </div>

          {/* Presentation Purpose */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What is the purpose of creating a presentation?</Label>
            <div className="grid grid-cols-1 gap-3">
              {purposes.map((purpose) => (
                <div key={purpose} className="flex items-center space-x-2">
                  <Checkbox
                    id={purpose}
                    checked={formData.presentationPurpose.includes(purpose)}
                    onCheckedChange={(checked) => handlePurposeChange(purpose, checked as boolean)}
                  />
                  <Label htmlFor={purpose} className="text-sm">
                    {purpose}
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
