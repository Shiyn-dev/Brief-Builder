"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LogoStep3() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    colors: [] as string[],
    customColor: "",
    unacceptableImages: [] as string[],
    customUnacceptable: "",
  })

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem(
      "logoBrief",
      JSON.stringify({
        ...existingData,
        ...formData,
      }),
    )
    router.push("/logo/step-4")
  }

  const handlePrev = () => {
    router.push("/logo/step-2")
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        colors: [...formData.colors, color],
      })
    } else {
      setFormData({
        ...formData,
        colors: formData.colors.filter((c) => c !== color),
      })
    }
  }

  const handleUnacceptableChange = (item: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        unacceptableImages: [...formData.unacceptableImages, item],
      })
    } else {
      setFormData({
        ...formData,
        unacceptableImages: formData.unacceptableImages.filter((i) => i !== item),
      })
    }
  }

  const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Violet", "White", "Grey", "Black"]
  const unacceptableItems = ["Bright colors", "Dark colors", "Cartoonishness", "Sophistication"]

  return (
    <BriefLayout currentStep={3} totalSteps={4} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Logo:</h1>

        <div className="space-y-6">
          {/* Colors */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What colors suit him best?</Label>
            <div className="grid grid-cols-3 gap-3">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={color}
                    checked={formData.colors.includes(color)}
                    onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                  />
                  <Label htmlFor={color} className="text-sm">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Your option"
              value={formData.customColor}
              onChange={(e) => setFormData({ ...formData, customColor: e.target.value.slice(0, 300) })}
              className="w-full"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customColor.length}/300</div>
          </div>

          {/* Unacceptable Images */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What images and solutions are unacceptable for use?</Label>
            <div className="grid grid-cols-2 gap-3">
              {unacceptableItems.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={item}
                    checked={formData.unacceptableImages.includes(item)}
                    onCheckedChange={(checked) => handleUnacceptableChange(item, checked as boolean)}
                  />
                  <Label htmlFor={item} className="text-sm">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Your option"
              value={formData.customUnacceptable}
              onChange={(e) => setFormData({ ...formData, customUnacceptable: e.target.value.slice(0, 300) })}
              className="w-full"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customUnacceptable.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
