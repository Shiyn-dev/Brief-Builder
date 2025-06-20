"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function LogoStep1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyNameType: "",
    customCompanyName: "",
    companyArea: [] as string[],
    customArea: "",
    logoUsage: [] as string[],
  })

  const handleNext = () => {
    localStorage.setItem(
      "logoBrief",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("logoBrief") || "{}"),
        ...formData,
      }),
    )
    router.push("/logo/step-2")
  }

  const handleAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        companyArea: [...formData.companyArea, area],
      })
    } else {
      setFormData({
        ...formData,
        companyArea: formData.companyArea.filter((a) => a !== area),
      })
    }
  }

  const handleUsageChange = (usage: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        logoUsage: [...formData.logoUsage, usage],
      })
    } else {
      setFormData({
        ...formData,
        logoUsage: formData.logoUsage.filter((u) => u !== usage),
      })
    }
  }

  const areas = ["Game", "Food", "Health", "Nature", "Technology", "Travel", "Sport"]

  return (
    <BriefLayout currentStep={1} totalSteps={4} onNext={handleNext} showPrev={false}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Logo:</h1>

        <div className="space-y-6">
          {/* Company Name Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Company name</Label>
            <RadioGroup
              value={formData.companyNameType}
              onValueChange={(value) => setFormData({ ...formData, companyNameType: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-name" id="full-name" />
                <Label htmlFor="full-name">Full name</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="abbreviation" id="abbreviation" />
                <Label htmlFor="abbreviation">Abbreviation</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              value={formData.customCompanyName}
              onChange={(e) => setFormData({ ...formData, customCompanyName: e.target.value.slice(0, 300) })}
              className="w-full"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customCompanyName.length}/300</div>
          </div>

          {/* Company Area */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Which area is closest to your Company?</Label>
            <div className="grid grid-cols-4 gap-3">
              {areas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.companyArea.includes(area)}
                    onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
                  />
                  <Label htmlFor={area} className="text-sm">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Your option"
              value={formData.customArea}
              onChange={(e) => setFormData({ ...formData, customArea: e.target.value.slice(0, 300) })}
              className="w-full"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customArea.length}/300</div>
          </div>

          {/* Logo Usage */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Where will the Logo be used:</Label>
            <div className="space-y-2">
              {["In the digital space", "On the packaging", "In printing"].map((usage) => (
                <div key={usage} className="flex items-center space-x-2">
                  <Checkbox
                    id={usage}
                    checked={formData.logoUsage.includes(usage)}
                    onCheckedChange={(checked) => handleUsageChange(usage, checked as boolean)}
                  />
                  <Label htmlFor={usage} className="text-sm">
                    {usage}
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
