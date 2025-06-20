"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function PresentationStep1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    companyActivity: "",
    companyValue: "",
  })

  const handleNext = () => {
    localStorage.setItem(
      "presentationBrief",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("presentationBrief") || "{}"),
        ...formData,
      }),
    )
    router.push("/presentation/step-2")
  }

  return (
    <BriefLayout currentStep={1} totalSteps={9} onNext={handleNext} showPrev={false}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-base font-medium">
              Company name
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.companyName.length}/300</div>
          </div>

          {/* Company Activity */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What does your company do?</Label>
            <RadioGroup
              value={formData.companyActivity}
              onValueChange={(value) => setFormData({ ...formData, companyActivity: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manufacturing" id="manufacturing" />
                <Label htmlFor="manufacturing">Manufacturing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="services" id="services" />
                <Label htmlFor="services">Services</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="retail" id="retail" />
                <Label htmlFor="retail">Retail</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              className="w-full mt-2"
              onChange={(e) => setFormData({ ...formData, companyActivity: e.target.value.slice(0, 300) })}
              maxLength={300}
            />
          </div>

          {/* Company Value */}
          <div className="space-y-2">
            <Label htmlFor="companyValue" className="text-base font-medium">
              What is your company's value?
            </Label>
            <p className="text-sm text-gray-600">Briefly formulate your company's mission and values.</p>
            <Textarea
              id="companyValue"
              value={formData.companyValue}
              onChange={(e) => setFormData({ ...formData, companyValue: e.target.value.slice(0, 300) })}
              className="w-full min-h-[100px]"
              placeholder="Your option"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.companyValue.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
