"use client"

import { useState, useEffect } from "react"
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

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    if (existingData) {
      setFormData({
        companyName: existingData.companyName || "",
        companyActivity: existingData.companyActivity || "",
        companyValue: existingData.companyValue || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return formData.companyName.trim() !== "" && formData.companyActivity !== "" && formData.companyValue.trim() !== ""
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    localStorage.setItem(
      "presentationBrief",
      JSON.stringify({
        ...existingData,
        ...formData,
      }),
    )
    router.push("/presentation/step-2")
  }

  return (
    <BriefLayout currentStep={1} totalSteps={9} onNext={handleNext} showPrev={false} isNextDisabled={!isFormValid()}>
      <div className="space-y-8">
        <h1 className="text-xl font-semibold text-gray-900 border-b border-dotted border-gray-400 pb-2">
          Brief for the Presentation:
        </h1>

        <div className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-base font-medium">
              Company name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder=""
              maxLength={300}
              required
            />
            <div className="text-xs text-gray-500 text-right">{formData.companyName.length}/300</div>
          </div>

          {/* Company Activity */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              What does your company do? <span className="text-red-500">*</span>
            </Label>
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
          </div>

          {/* Company Value */}
          <div className="space-y-2">
            <Label htmlFor="companyValue" className="text-base font-medium">
              What is your company's value? <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-gray-600">Briefly formulate your company's mission and values.</p>
            <Textarea
              id="companyValue"
              value={formData.companyValue}
              onChange={(e) => setFormData({ ...formData, companyValue: e.target.value.slice(0, 300) })}
              className="w-full min-h-[100px]"
              placeholder=""
              maxLength={300}
              required
            />
            <div className="text-xs text-gray-500 text-right">{formData.companyValue.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
