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
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        formData.companyName.trim() !== "" &&
        formData.nameType !== "" &&
        (formData.closestArea.length > 0 || formData.customArea.trim() !== "") &&
        formData.logoUsage.length > 0
    )
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
            {/* Company Name */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Company name</Label>
                  <RadioGroup
                      value={formData.nameType}
                      onValueChange={(value) => setFormData({ ...formData, nameType: value })}
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

                  <div className={`animated-input-container ${formData.companyName ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 100) })}
                        maxLength={100}
                        required
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.companyName.length}/100</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Closest Area */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Which area is closest to your Company?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {areaOptions.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox
                              id={area}
                              checked={formData.closestArea.includes(area)}
                              onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
                          />
                          <Label htmlFor={area} className="text-sm">
                            {area}
                          </Label>
                        </div>
                    ))}
                  </div>

                  <div className={`animated-input-container ${formData.customArea ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.customArea}
                        onChange={(e) => setFormData({ ...formData, customArea: e.target.value.slice(0, 100) })}
                        maxLength={100}
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.customArea.length}/100</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logo Usage */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Where will the Logo be used:</Label>
                  <div className="space-y-2">
                    {usageOptions.map((usage) => (
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
              </CardContent>
            </Card>
          </div>
        </div>
      </BriefLayout>
  )
}