"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function PresentationStep9() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    needContentHelp: "",
    visualMaterials: [] as string[],
    email: "",
  })

  const handleComplete = () => {
    const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
    const finalData = {
      ...existingData,
      ...formData,
    }
    localStorage.setItem("presentationBrief", JSON.stringify(finalData))
    router.push("/presentation/complete")
  }

  const handlePrev = () => {
    router.push("/presentation/step-8")
  }

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        visualMaterials: [...formData.visualMaterials, material],
      })
    } else {
      setFormData({
        ...formData,
        visualMaterials: formData.visualMaterials.filter((m) => m !== material),
      })
    }
  }

  const materials = ["Pictures", "Photographs", "Videos", "Etc"]

  return (
    <BriefLayout
      currentStep={9}
      totalSteps={9}
      onNext={handleComplete}
      onPrev={handlePrev}
      nextText="Complete the Brief"
    >
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>

        <div className="space-y-6">
          {/* Content Help */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Do you need help preparing content for your presentation?</Label>
            <RadioGroup
              value={formData.needContentHelp}
              onValueChange={(value) => setFormData({ ...formData, needContentHelp: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="help-yes" />
                <Label htmlFor="help-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="help-no" />
                <Label htmlFor="help-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Visual Materials */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What visual materials can you provide?</Label>
            <div className="flex flex-wrap gap-4">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={formData.visualMaterials.includes(material)}
                    onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                  />
                  <Label htmlFor={material} className="text-sm">
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Label htmlFor="email" className="text-base font-medium">
              Please provide your email address to receive the brief
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your email"
              required
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.email.length}/300</div>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600 mb-2">Our social media</p>
            <div className="flex justify-center space-x-4">{/* Social media icons would go here */}</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
