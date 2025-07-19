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
        <style jsx global>{`
          /* ГЛОБАЛЬНОЕ ОТКЛЮЧЕНИЕ ВСЕХ ПОДЧЕРКИВАНИЙ */
          * {
            text-decoration: none !important;
            -webkit-text-decoration: none !important;
            -moz-text-decoration: none !important;
            -ms-text-decoration: none !important;
          }

          input {
            text-decoration: none !important;
            -webkit-text-decoration: none !important;
            -moz-text-decoration: none !important;
            -ms-text-decoration: none !important;
            text-decoration-line: none !important;
            -webkit-text-decoration-line: none !important;
            text-decoration-style: none !important;
            -webkit-text-decoration-style: none !important;
            text-decoration-color: transparent !important;
            -webkit-text-decoration-color: transparent !important;
            text-underline-offset: unset !important;
            -webkit-text-underline-offset: unset !important;
          }

          .animated-input-container {
            position: relative;
            margin: 20px 0;
            width: 100%;
          }

          .animated-input-container input {
            font-size: 16px !important;
            width: 100% !important;
            border: none !important;
            border-bottom: 2px solid #ccc !important;
            padding: 12px 0 8px 0 !important;
            background-color: transparent !important;
            outline: none !important;
            color: #333 !important;
            font-family: inherit !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            text-decoration: none !important;
            -webkit-text-decoration: none !important;
            -moz-text-decoration: none !important;
            -ms-text-decoration: none !important;
            text-decoration-line: none !important;
            -webkit-text-decoration-line: none !important;
            text-decoration-style: none !important;
            -webkit-text-decoration-style: none !important;
            text-decoration-color: transparent !important;
            -webkit-text-decoration-color: transparent !important;
            text-underline-offset: unset !important;
            -webkit-text-underline-offset: unset !important;
          }

          .animated-input-container input:disabled {
            color: #999 !important;
            cursor: not-allowed !important;
          }

          .animated-input-container .label {
            position: absolute !important;
            top: 12px !important;
            left: 0 !important;
            color: #999 !important;
            transition: all 0.3s ease !important;
            pointer-events: none !important;
            font-size: 16px !important;
            background: transparent !important;
          }

          .animated-input-container input:focus ~ .label,
          .animated-input-container.has-value .label {
            top: -16px !important;
            font-size: 12px !important;
            color: #68B3C0 !important;
          }

          .animated-input-container .underline {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            height: 2px !important;
            width: 100% !important;
            background-color: #68B3C0 !important;
            transform: scaleX(0) !important;
            transition: all 0.3s ease !important;
          }

          .animated-input-container input:focus ~ .underline {
            transform: scaleX(1) !important;
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
              {/* Disliked Websites - ТЕПЕРЬ INPUT ВМЕСТО TEXTAREA */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Are there any examples of websites that you don't like? Why? <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.dislikedWebsites ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.dislikedWebsites}
                          onChange={(e) => setFormData({ ...formData, dislikedWebsites: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
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
                          title="Please fill out this field"
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
                          title="Please fill out this field"
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