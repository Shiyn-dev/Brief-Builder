"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function LogoStep1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    nameType: "",
    closestArea: [] as string[],
    customArea: "",
    logoUsage: [] as string[],
    customUsage: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    if (existingData) {
      setFormData({
        companyName: existingData.companyName || "",
        nameType: existingData.nameType || "",
        closestArea: existingData.closestArea || [],
        customArea: existingData.customArea || "",
        logoUsage: existingData.logoUsage || [],
        customUsage: existingData.customUsage || "",
      })
    }
  }, [])

  // ВАЛИДАЦИЯ - ИСПРАВЛЕННАЯ
  const isFormValid = () => {
    const hasNameType = formData.nameType !== "" && (formData.nameType !== "other" || formData.companyName.trim() !== "")
    const hasArea = formData.closestArea.length > 0 || formData.customArea.trim() !== ""
    const hasUsage = formData.logoUsage.length > 0 || formData.customUsage.trim() !== ""

    return hasNameType && hasArea && hasUsage
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem("logoBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/logo/step-2")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem("logoBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/")
  }

  const handleAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        closestArea: [...formData.closestArea, area],
      })
    } else {
      setFormData({
        ...formData,
        closestArea: formData.closestArea.filter((item) => item !== area),
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
        logoUsage: formData.logoUsage.filter((item) => item !== usage),
      })
    }
  }

  const areaOptions = [
    "Game", "Food", "Health", "Nature", "Technology", "Travel", "Sport"
  ]

  const usageOptions = [
    "In the digital space", "On the packaging", "In printing"
  ]

  return (
      <BriefLayout currentStep={1} totalSteps={3} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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

          .animated-input-container input:disabled {
            color: #999;
            cursor: not-allowed;
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
            {/* Company Name - РАДИОКНОПКИ ПО ГОРИЗОНТАЛИ */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Company name <span className="text-red-500">*</span></Label>
                  <RadioGroup
                      value={formData.nameType}
                      onValueChange={(value) => setFormData({ ...formData, nameType: value })}
                      className="flex flex-row gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full-name" id="full-name" />
                      <Label htmlFor="full-name">Full name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="abbreviation" id="abbreviation" />
                      <Label htmlFor="abbreviation">Abbreviation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>

                  <div className={`animated-input-container ${formData.companyName ? 'has-value' : ''} ${formData.nameType !== 'other' ? 'opacity-50' : ''}`}>
                    <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 300) })}
                        maxLength={300}
                        disabled={formData.nameType !== 'other'}
                        title="Please fill out this field"
                        style={{
                          color: formData.nameType !== 'other' ? '#999' : '#333'
                        }}
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.companyName.length}/300</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Closest Area - ВСЕ ЧЕКБОКСЫ В ОДНУ ЛИНИЮ */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Which area is closest to your Company? <span className="text-red-500">*</span></Label>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {areaOptions.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox
                              id={area}
                              checked={formData.closestArea.includes(area)}
                              onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
                          />
                          <Label htmlFor={area} className="text-sm whitespace-nowrap">
                            {area}
                          </Label>
                        </div>
                    ))}
                  </div>

                  <div className={`animated-input-container ${formData.customArea ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.customArea}
                        onChange={(e) => setFormData({ ...formData, customArea: e.target.value.slice(0, 300) })}
                        maxLength={300}
                        title="Please fill out this field"
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.customArea.length}/300</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logo Usage - ВСЕ ЧЕКБОКСЫ В ОДНУ ЛИНИЮ */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Where will the Logo be used: <span className="text-red-500">*</span></Label>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {usageOptions.map((usage) => (
                        <div key={usage} className="flex items-center space-x-2">
                          <Checkbox
                              id={usage}
                              checked={formData.logoUsage.includes(usage)}
                              onCheckedChange={(checked) => handleUsageChange(usage, checked as boolean)}
                          />
                          <Label htmlFor={usage} className="text-sm whitespace-nowrap">
                            {usage}
                          </Label>
                        </div>
                    ))}
                  </div>

                  <div className={`animated-input-container ${formData.customUsage ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.customUsage}
                        onChange={(e) => setFormData({ ...formData, customUsage: e.target.value.slice(0, 300) })}
                        maxLength={300}
                        title="Please fill out this field"
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.customUsage.length}/300</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </BriefLayout>
  )
}