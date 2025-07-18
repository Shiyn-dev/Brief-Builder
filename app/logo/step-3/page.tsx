"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function LogoStep3() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    colors: [] as string[],
    customColor: "",
    unacceptableImages: [] as string[],
    customUnacceptable: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    if (existingData) {
      setFormData({
        colors: existingData.colors || [],
        customColor: existingData.customColor || "",
        unacceptableImages: existingData.unacceptableImages || [],
        customUnacceptable: existingData.customUnacceptable || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        (formData.colors.length > 0 || formData.customColor.trim() !== "") &&
        (formData.unacceptableImages.length > 0 || formData.customUnacceptable.trim() !== "")
    )
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem("logoBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/logo/complete")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem("logoBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
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
      <BriefLayout
          currentStep={3}
          totalSteps={3}
          onNext={handleNext}
          onPrev={handlePrev}
          nextText="Complete the Brief"
          isNextDisabled={!isFormValid()}
      >
        <style jsx>{`
          .animated-input-container {
            position: relative;
            margin: 20px 0;
            width: 100%;
          }

          .animated-input-container input {
            font-size: 16px;
            width: 100%;
            border: none;
            border-bottom: 2px solid #ccc;
            padding: 8px 0;
            background-color: transparent;
            outline: none;
            color: #333;
            font-family: inherit;
          }

          .animated-input-container .label {
            position: absolute;
            top: 8px;
            left: 0;
            color: #999;
            transition: all 0.3s ease;
            pointer-events: none;
            font-size: 16px;
          }

          .animated-input-container input:focus ~ .label,
          .animated-input-container.has-value .label {
            top: -20px;
            font-size: 14px;
            color: #038196;
          }

          .animated-input-container .underline {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100%;
            background-color: #038196;
            transform: scaleX(0);
            transition: all 0.3s ease;
          }

          .animated-input-container input:focus ~ .underline {
            transform: scaleX(1);
          }

          .char-count {
            position: absolute;
            bottom: -20px;
            right: 0;
            font-size: 12px;
            color: #999;
          }
        `}</style>

        <div className="space-y-8">
          <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Logo:</h1>

          <div className="space-y-6">
            {/* Colors */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
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

                  <div className={`animated-input-container ${formData.customColor ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.customColor}
                        onChange={(e) => setFormData({ ...formData, customColor: e.target.value.slice(0, 300) })}
                        maxLength={300}
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.customColor.length}/300</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unacceptable Images */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
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

                  <div className={`animated-input-container ${formData.customUnacceptable ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.customUnacceptable}
                        onChange={(e) => setFormData({ ...formData, customUnacceptable: e.target.value.slice(0, 300) })}
                        maxLength={300}
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.customUnacceptable.length}/300</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </BriefLayout>
  )
}