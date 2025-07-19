"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function LogoStep2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    emotions: [] as string[],
    customEmotion: "",
    sensations: [] as string[],
    customSensation: "",
    geometricFigure: [] as string[],
    customFigure: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    if (existingData) {
      setFormData({
        emotions: existingData.emotions || [],
        customEmotion: existingData.customEmotion || "",
        sensations: existingData.sensations || [],
        customSensation: existingData.customSensation || "",
        geometricFigure: existingData.geometricFigure || [],
        customFigure: existingData.customFigure || "",
      })
    }
  }, [])

  // Validation function
  const isFormValid = () => {
    return (
        (formData.emotions.length > 0 || formData.customEmotion.trim() !== "") &&
        (formData.sensations.length > 0 || formData.customSensation.trim() !== "") &&
        (formData.geometricFigure.length > 0 || formData.customFigure.trim() !== "")
    )
  }

  const handleNext = () => {
    if (!isFormValid()) return

    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem("logoBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/logo/step-3")
  }

  const handlePrev = () => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    localStorage.setItem("logoBrief", JSON.stringify({
      ...existingData,
      ...formData
    }))
    router.push("/logo/step-1")
  }

  const handleEmotionChange = (emotion: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        emotions: [...formData.emotions, emotion],
      })
    } else {
      setFormData({
        ...formData,
        emotions: formData.emotions.filter((e) => e !== emotion),
      })
    }
  }

  const handleSensationChange = (sensation: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        sensations: [...formData.sensations, sensation],
      })
    } else {
      setFormData({
        ...formData,
        sensations: formData.sensations.filter((s) => s !== sensation),
      })
    }
  }

  const handleFigureChange = (figure: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        geometricFigure: [...formData.geometricFigure, figure],
      })
    } else {
      setFormData({
        ...formData,
        geometricFigure: formData.geometricFigure.filter((f) => f !== figure),
      })
    }
  }

  const emotionOptions = [
    "Reliable and caring", "Modern and innovative", "Approachable and friendly"
  ]

  const sensationOptions = [
    "Fun", "Pleasure", "Call", "Dedication", "Drive", "Achievement", "Confidence", "Safety", "Calmness"
  ]

  const figureOptions = [
    "Circle", "Square", "Triangle", "Polyhedron"
  ]

  return (
      <BriefLayout currentStep={2} totalSteps={3} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
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
            {/* Emotions - В ОДНУ ЛИНИЮ */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">What emotions can it evoke? <span className="text-red-500">*</span></Label>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {emotionOptions.map((emotion) => (
                        <div key={emotion} className="flex items-center space-x-2">
                          <Checkbox
                              id={emotion}
                              checked={formData.emotions.includes(emotion)}
                              onCheckedChange={(checked) => handleEmotionChange(emotion, checked as boolean)}
                          />
                          <Label htmlFor={emotion} className="text-sm whitespace-nowrap">
                            {emotion}
                          </Label>
                        </div>
                    ))}
                  </div>

                  <div className={`animated-input-container ${formData.customEmotion ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.customEmotion}
                        onChange={(e) => setFormData({ ...formData, customEmotion: e.target.value.slice(0, 300) })}
                        maxLength={300}
                        title="Please fill out this field"
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.customEmotion.length}/300</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sensations - НА 2 ЛИНИИ: 6 + 3 */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">What sensations does it cause? <span className="text-red-500">*</span></Label>
                  <div className="space-y-2">
                    {/* ПЕРВАЯ ЛИНИЯ - 6 ЧЕКБОКСОВ */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {sensationOptions.slice(0, 6).map((sensation) => (
                          <div key={sensation} className="flex items-center space-x-2">
                            <Checkbox
                                id={sensation}
                                checked={formData.sensations.includes(sensation)}
                                onCheckedChange={(checked) => handleSensationChange(sensation, checked as boolean)}
                            />
                            <Label htmlFor={sensation} className="text-sm whitespace-nowrap">
                              {sensation}
                            </Label>
                          </div>
                      ))}
                    </div>
                    {/* ВТОРАЯ ЛИНИЯ - 3 ЧЕКБОКСА */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {sensationOptions.slice(6).map((sensation) => (
                          <div key={sensation} className="flex items-center space-x-2">
                            <Checkbox
                                id={sensation}
                                checked={formData.sensations.includes(sensation)}
                                onCheckedChange={(checked) => handleSensationChange(sensation, checked as boolean)}
                            />
                            <Label htmlFor={sensation} className="text-sm whitespace-nowrap">
                              {sensation}
                            </Label>
                          </div>
                      ))}
                    </div>
                  </div>

                  <div className={`animated-input-container ${formData.customSensation ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.customSensation}
                        onChange={(e) => setFormData({ ...formData, customSensation: e.target.value.slice(0, 300) })}
                        maxLength={300}
                        title="Please fill out this field"
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.customSensation.length}/300</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Geometric Figure - В ОДНУ ЛИНИЮ */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">If it were a geometric figure, what would it be? <span className="text-red-500">*</span></Label>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {figureOptions.map((figure) => (
                        <div key={figure} className="flex items-center space-x-2">
                          <Checkbox
                              id={figure}
                              checked={formData.geometricFigure.includes(figure)}
                              onCheckedChange={(checked) => handleFigureChange(figure, checked as boolean)}
                          />
                          <Label htmlFor={figure} className="text-sm whitespace-nowrap">
                            {figure}
                          </Label>
                        </div>
                    ))}
                  </div>

                  <div className={`animated-input-container ${formData.customFigure ? 'has-value' : ''}`}>
                    <input
                        type="text"
                        value={formData.customFigure}
                        onChange={(e) => setFormData({ ...formData, customFigure: e.target.value.slice(0, 300) })}
                        maxLength={300}
                        title="Please fill out this field"
                    />
                    <label className="label">Your option</label>
                    <div className="underline"></div>
                    <div className="char-count">{formData.customFigure.length}/300</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </BriefLayout>
  )
}