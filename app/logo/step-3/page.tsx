"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Violet", "White", "Grey", "Black"]
const unacceptableItems = ["Bright colors", "Dark colors", "Cartoonishness", "Sophistication"]
const logoStyles = ["font", "form-counterform", "abstract", "minimalism"]

const LogoSVG = ({ style }: { style: string }) => {
  if (style === "font") {
    return <img src="/image.svg" alt="Font style logo" width="320" height="280" />
  }

  return <img src="/image.svg" alt={`${style} style logo`} width="320" height="280" />
}

export default function LogoStep3() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    colors: [] as string[],
    customColor: "",
    unacceptableImages: [] as string[],
    customUnacceptable: "",
    logoStyle: "",
  })

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    setFormData({
      colors: existing.colors || [],
      customColor: existing.customColor || "",
      unacceptableImages: existing.unacceptableImages || [],
      customUnacceptable: existing.customUnacceptable || "",
      logoStyle: existing.logoStyle || "",
    })
  }, [])

  const isFormValid = () =>
      (formData.colors.length > 0 || formData.customColor.trim() !== "") &&
      (formData.unacceptableImages.length > 0 || formData.customUnacceptable.trim() !== "") &&
      formData.logoStyle !== ""

  const handleNext = () => {
    if (!isFormValid()) return
    const existing = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem("logoBrief", JSON.stringify({ ...existing, ...formData }))
    router.push("/logo/complete")
  }

  const handlePrev = () => {
    const existing = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem("logoBrief", JSON.stringify({ ...existing, ...formData }))
    router.push("/logo/step-2")
  }

  const toggleValue = (list: string[], value: string, checked: boolean) =>
      checked ? [...list, value] : list.filter((v) => v !== value)

  return (
      <BriefLayout
          currentStep={3}
          totalSteps={3}
          onNext={handleNext}
          onPrev={handlePrev}
          nextText="Complete the Brief"
          isNextDisabled={!isFormValid()}
      >
        <div className="space-y-8">
          <h1 className="text-2xl font-semibold text-center text-gray-900">Brief for the Logo:</h1>

          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-base font-medium">
                What colors suit it best? <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-4">
                {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                          id={`color-${color}`}
                          checked={formData.colors.includes(color)}
                          onCheckedChange={(checked) =>
                              setFormData({ ...formData, colors: toggleValue(formData.colors, color, checked as boolean) })
                          }
                      />
                      <Label htmlFor={`color-${color}`}>{color}</Label>
                    </div>
                ))}
              </div>
              <input
                  type="text"
                  value={formData.customColor}
                  onChange={(e) => setFormData({ ...formData, customColor: e.target.value.slice(0, 300) })}
                  placeholder="Other color option"
                  className="border-b w-full focus:outline-none focus:border-blue-500 p-2"
              />
              <div className="text-right text-xs text-gray-500">{formData.customColor.length}/300</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-base font-medium">
                What images and solutions are unacceptable? <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-4">
                {unacceptableItems.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                          id={`unacceptable-${item}`}
                          checked={formData.unacceptableImages.includes(item)}
                          onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                unacceptableImages: toggleValue(formData.unacceptableImages, item, checked as boolean),
                              })
                          }
                      />
                      <Label htmlFor={`unacceptable-${item}`}>{item}</Label>
                    </div>
                ))}
              </div>
              <input
                  type="text"
                  value={formData.customUnacceptable}
                  onChange={(e) =>
                      setFormData({ ...formData, customUnacceptable: e.target.value.slice(0, 300) })
                  }
                  placeholder="Other unacceptable options"
                  className="border-b w-full focus:outline-none focus:border-blue-500 p-2"
              />
              <div className="text-right text-xs text-gray-500">{formData.customUnacceptable.length}/300</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-base font-medium">
                What Logos do you like? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                  value={formData.logoStyle}
                  onValueChange={(val) => setFormData({ ...formData, logoStyle: val })}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {logoStyles.map((style) => (
                    <div key={style} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={style} id={`style-${style}`} />
                        <Label htmlFor={`style-${style}`} className="capitalize">{style.replace("-", " ")}</Label>
                      </div>
                      <div className="flex justify-center">
                        <LogoSVG style={style} />
                      </div>
                    </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </BriefLayout>
  )
}