"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function LogoStep2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    emotions: [] as string[],
    customEmotion: "",
    sensations: [] as string[],
    customSensation: "",
    geometricFigure: "",
    customFigure: "",
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
    router.push("/logo/step-3")
  }

  const handlePrev = () => {
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

  const emotions = ["Reliable and caring", "Modern and innovative", "Approachable and friendly"]
  const sensations = [
    "Fun",
    "Pleasure",
    "Call",
    "Dedication",
    "Drive",
    "Achievement",
    "Confidence",
    "Safety",
    "Calmness",
  ]

  return (
    <BriefLayout currentStep={2} totalSteps={4} onNext={handleNext} onPrev={handlePrev}>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Logo:</h1>

        <div className="space-y-6">
          {/* Emotions */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What emotions can it evoke?</Label>
            <div className="space-y-2">
              {emotions.map((emotion) => (
                <div key={emotion} className="flex items-center space-x-2">
                  <Checkbox
                    id={emotion}
                    checked={formData.emotions.includes(emotion)}
                    onCheckedChange={(checked) => handleEmotionChange(emotion, checked as boolean)}
                  />
                  <Label htmlFor={emotion} className="text-sm">
                    {emotion}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Your option"
              value={formData.customEmotion}
              onChange={(e) => setFormData({ ...formData, customEmotion: e.target.value.slice(0, 300) })}
              className="w-full"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customEmotion.length}/300</div>
          </div>

          {/* Sensations */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What sensations does it cause?</Label>
            <div className="grid grid-cols-3 gap-3">
              {sensations.map((sensation) => (
                <div key={sensation} className="flex items-center space-x-2">
                  <Checkbox
                    id={sensation}
                    checked={formData.sensations.includes(sensation)}
                    onCheckedChange={(checked) => handleSensationChange(sensation, checked as boolean)}
                  />
                  <Label htmlFor={sensation} className="text-sm">
                    {sensation}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Your option"
              value={formData.customSensation}
              onChange={(e) => setFormData({ ...formData, customSensation: e.target.value.slice(0, 300) })}
              className="w-full"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customSensation.length}/300</div>
          </div>

          {/* Geometric Figure */}
          <div className="space-y-3">
            <Label className="text-base font-medium">If he were a geometric figure, what would he be?</Label>
            <RadioGroup
              value={formData.geometricFigure}
              onValueChange={(value) => setFormData({ ...formData, geometricFigure: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="circle" id="circle" />
                <Label htmlFor="circle">Circle</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="triangle" id="triangle" />
                <Label htmlFor="triangle">Triangle</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="square" id="square" />
                <Label htmlFor="square">Square</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="polyhedron" id="polyhedron" />
                <Label htmlFor="polyhedron">Polyhedron</Label>
              </div>
            </RadioGroup>
            <Input
              placeholder="Your option"
              value={formData.customFigure}
              onChange={(e) => setFormData({ ...formData, customFigure: e.target.value.slice(0, 300) })}
              className="w-full"
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.customFigure.length}/300</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
