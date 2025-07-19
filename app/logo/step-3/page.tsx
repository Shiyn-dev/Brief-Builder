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

const LogoSVG = () => (
    <svg viewBox="0 0 547 155" xmlns="http://www.w3.org/2000/svg" width="80" height="30">
      <path d="M28.48 97.28v56H0V0h47.36q19.84 0 31.36 11.2t11.52 30.72q0 13.28-5.92 23.36t-16.64 15.36l26.56 17.92v-28h26.88v52.8L75.52 91.2q14.08 0 21.44-8.16t7.36-22.56q0-13.28-8-20.96T75.52 32H28.48v65.28zM147.36 0v153.28h-28.48V0h28.48zM210.72 0v153.28h-28.48V0h28.48zM274.4 97.28v56H246V0h47.36q19.84 0 31.36 11.2t11.52 30.72q0 13.28-5.92 23.36t-16.64 15.36l26.56 17.92v-28h26.88v52.8L321.44 91.2q14.08 0 21.44-8.16t7.36-22.56q0-13.28-8-20.96T321.44 32H274.4v65.28zM435.36 66.88q14.72 0 23.36 9.28t8.64 24.32q0 15.04-8.64 24.32T435.36 134.08q-14.72 0-23.36-9.28t-8.64-24.32q0-15.04 8.64-24.32t23.36-9.28zm0-27.52q-26.72 0-42.56 16.48t-15.84 44.64q0 28.16 15.84 44.64t42.56 16.48q26.72 0 42.56-16.48t15.84-44.64q0-28.16-15.84-44.64t-42.56-16.48zM546.88 0v28.48h-64v27.2h56.32v28.16h-56.32v69.44h-28.48V0h92.48z" fill="#000"/>
    </svg>
)

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

          {/* Colors */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-base font-medium">
                What colors suit it best? <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-4">
                {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                          id={color}
                          checked={formData.colors.includes(color)}
                          onCheckedChange={(checked) =>
                              setFormData({ ...formData, colors: toggleValue(formData.colors, color, checked as boolean) })
                          }
                      />
                      <Label htmlFor={color}>{color}</Label>
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

          {/* Unacceptable */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-base font-medium">
                What images and solutions are unacceptable? <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-4">
                {unacceptableItems.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                          id={item}
                          checked={formData.unacceptableImages.includes(item)}
                          onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                unacceptableImages: toggleValue(formData.unacceptableImages, item, checked as boolean),
                              })
                          }
                      />
                      <Label htmlFor={item}>{item}</Label>
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

          {/* Logo Style */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-base font-medium">
                What logo style do you prefer? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                  value={formData.logoStyle}
                  onValueChange={(val) => setFormData({ ...formData, logoStyle: val })}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {logoStyles.map((style) => (
                    <div key={style} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={style} id={style} />
                        <Label htmlFor={style} className="capitalize">{style.replace("-", " ")}</Label>
                      </div>
                      <div className="border rounded-md p-4 flex justify-center bg-white">
                        <LogoSVG />
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
