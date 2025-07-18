"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingStep6() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    style: "",
    customStyle: "",
    content: "",
    email: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    if (existingData) {
      setFormData({
        style: existingData.style || "",
        customStyle: existingData.customStyle || "",
        content: existingData.content || "",
        email: existingData.email || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        (formData.style !== "" && formData.style !== "custom" ||
            formData.style === "custom" && formData.customStyle.trim() !== "") &&
        formData.content.trim() !== "" &&
        formData.email.trim() !== ""
    )
  }

  const handleComplete = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem("landingBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/landing/complete")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("landingBrief") || "{}")
    localStorage.setItem("landingBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/landing/step-5")
  }

  return (
      <BriefLayout
          currentStep={6}
          totalSteps={6}
          onNext={handleComplete}
          onPrev={handlePrev}
          nextText="Complete the Brief"
          isNextDisabled={!isFormValid()}
      >
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
              {/* Style - РАДИОКНОПКИ ПО ГОРИЗОНТАЛИ */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">What style do you want for your landing page? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.style}
                        onValueChange={(value) => setFormData({ ...formData, style: value })}
                        className="grid grid-cols-2 gap-3"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="minimalism" id="minimalism" className="mt-1" />
                        <Label htmlFor="minimalism" className="text-sm leading-relaxed">
                          Minimalism: simple and laconic, minimum color scheme
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="hand-drawn" id="hand-drawn" className="mt-1" />
                        <Label htmlFor="hand-drawn" className="text-sm leading-relaxed">
                          Hand drawn: use of illustrations, varied color schemes
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="brutalism" id="brutalism" className="mt-1" />
                        <Label htmlFor="brutalism" className="text-sm leading-relaxed">
                          Brutalism: use of rough shapes, contrasting colours, minimalist elements
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="typography" id="typography" className="mt-1" />
                        <Label htmlFor="typography" className="text-sm leading-relaxed">
                          Typography: text and graphic elements, simple fonts
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 col-span-2">
                        <RadioGroupItem value="custom" id="custom" className="mt-1" />
                        <Label htmlFor="custom" className="text-sm leading-relaxed">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className={`animated-input-container ${formData.customStyle ? 'has-value' : ''} ${formData.style !== 'custom' ? 'opacity-50' : ''}`}>
                      <input
                          type="text"
                          value={formData.customStyle}
                          onChange={(e) => setFormData({ ...formData, customStyle: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          disabled={formData.style !== 'custom'}
                          style={{
                            color: formData.style !== 'custom' ? '#999' : '#333'
                          }}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.customStyle.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content - ТЕПЕРЬ ТОЖЕ INPUT ВМЕСТО TEXTAREA */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Upload or write a text for your landing page, if available. <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.content ? 'has-value' : ''}`}>
                      <input
                          type="text"
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.content.length}/300</div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Возможность прикрепить файл с контентом</div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Please provide your email address to receive the brief <span className="text-red-500">*</span></Label>
                    <div className={`animated-input-container ${formData.email ? 'has-value' : ''}`}>
                      <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          title="Please fill out this field"
                      />
                      <label className="label">Your option</label>
                      <div className="underline"></div>
                      <div className="char-count">{formData.email.length}/300</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 mb-2">Our social media</p>
                <div className="flex justify-center space-x-4">{/* Social media icons would go here */}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </BriefLayout>
  )
}