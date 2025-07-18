"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingStep5() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    dislikedWebsites: "",
    colorScheme: "",
    landingBlocks: [] as string[],
    customBlocks: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    if (existingData) {
      setFormData({
        dislikedWebsites: existingData.dislikedWebsites || "",
        colorScheme: existingData.colorScheme || "",
        landingBlocks: existingData.landingBlocks || [],
        customBlocks: existingData.customBlocks || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        formData.dislikedWebsites.trim() !== "" &&
        formData.colorScheme.trim() !== "" &&
        (formData.landingBlocks.length > 0 || formData.customBlocks.trim() !== "")
    )
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem(
        "landingBrief",
        JSON.stringify({
          ...existingData,
          ...formData,
        }),
    )
    router.push("/landing/step-6")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem(
        "landingBrief",
        JSON.stringify({
          ...existingData,
          ...formData,
        }),
    )
    router.push("/landing/step-4")
  }

  const handleBlockChange = (block: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        landingBlocks: [...formData.landingBlocks, block],
      })
    } else {
      setFormData({
        ...formData,
        landingBlocks: formData.landingBlocks.filter((b) => b !== block),
      })
    }
  }

  const blocks = [
    "Main screen",
    "About the company/expert",
    "About the product/service/product",
    "For whom is the product/service/goods",
    "Program (if courses, events...)",
    "Cost/Rates",
    "Reviews",
    "Frequently asked questions",
  ]

  return (
      <BriefLayout currentStep={5} totalSteps={6} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
        <style jsx>{`
          .animated-input-container {
            position: relative;
            margin: 20px 0;
            width: 100%;
          }

          .animated-input-container input,
          .animated-input-container textarea {
            font-size: 16px;
            width: 100%;
            border: none;
            border-bottom: 2px solid #ccc;
            padding: 8px 0;
            background-color: transparent;
            outline: none;
            color: #333;
            font-family: inherit;
            resize: none;
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
          .animated-input-container textarea:focus ~ .label,
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

          .animated-input-container textarea ~ .underline {
            bottom: 8px;
          }

          .animated-input-container input:focus ~ .underline,
          .animated-input-container textarea:focus ~ .underline {
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

        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Landing:</h1>
        <Card className="bg-[#F0F9FA] shadow-none border-none p-0">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* Disliked Websites */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Are there any examples of websites that you don't like? Why? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.dislikedWebsites ? 'has-value' : ''}`}>
                      <textarea
                          value={formData.dislikedWebsites}
                          onChange={(e) => setFormData({ ...formData, dislikedWebsites: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          rows={4}
                          required
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.dislikedWebsites.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Color Scheme */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Is there a preferred color scheme or code for the landing page? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.colorScheme ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.colorScheme}
                          onChange={(e) => setFormData({ ...formData, colorScheme: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          required
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.colorScheme.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Landing Blocks */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What blocks should your landing page consist of? <span className="text-red-500">*</span></Label>
                    <div className="grid grid-cols-2 gap-3">
                      {blocks.map((block) => (
                          <div key={block} className="flex items-center space-x-2">
                            <Checkbox
                                id={block}
                                checked={formData.landingBlocks.includes(block)}
                                onCheckedChange={(checked) => handleBlockChange(block, checked as boolean)}
                            />
                            <Label htmlFor={block} className="text-sm">
                              {block}
                            </Label>
                          </div>
                      ))}
                    </div>

                    <div className={`animated-input-container ${formData.customBlocks ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.customBlocks}
                          onChange={(e) => setFormData({ ...formData, customBlocks: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          required
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customBlocks.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </BriefLayout>
  )
}