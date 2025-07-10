"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function LogoStep4() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    logoTypes: [] as string[],
    email: "",
  })

  // Load existing data on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    if (existingData) {
      setFormData({
        logoTypes: existingData.logoTypes || [],
        email: existingData.email || "",
      })
    }
  }, [])

  const handleComplete = () => {
    const existingData = JSON.parse(localStorage.getItem("logoBrief") || "{}")
    const finalData = {
      ...existingData,
      ...formData,
    }
    localStorage.setItem("logoBrief", JSON.stringify(finalData))
    router.push("/logo/complete")
  }

  const handlePrev = () => {
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

  const handleLogoTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        logoTypes: [...formData.logoTypes, type],
      })
    } else {
      setFormData({
        ...formData,
        logoTypes: formData.logoTypes.filter((t) => t !== type),
      })
    }
  }

  const logoTypes = [
    { id: "font", name: "Font", brands: ["MANGO", "Google", "BRAUN"] },
    { id: "form-counterform", name: "Form and counterform", brands: ["MANGO", "Google", "BRAUN"] },
    { id: "abstract", name: "Abstract", brands: ["MANGO", "Google", "BRAUN"] },
    { id: "minimalism", name: "Minimalism", brands: ["MANGO", "Google", "BRAUN"] },
  ]

  return (
    <BriefLayout
      currentStep={4}
      totalSteps={4}
      onNext={handleComplete}
      onPrev={handlePrev}
      nextText="Complete the Brief"
    >
      <div className="space-y-8">
        <h1 className="text-xl font-semibold text-gray-900 border-b border-dotted border-gray-400 pb-2">
          Brief for the Logo:
        </h1>

        <div className="space-y-6">
          {/* Logo Types */}
          <div className="space-y-4">
            <Label className="text-base font-medium">What Logos do you like?</Label>
            <div className="grid grid-cols-2 gap-4">
              {logoTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all ${
                    formData.logoTypes.includes(type.id) ? "ring-2 ring-teal-500 bg-teal-50" : "hover:shadow-md"
                  }`}
                  onClick={() => handleLogoTypeChange(type.id, !formData.logoTypes.includes(type.id))}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-medium mb-3">{type.name}</h3>
                      <div className="bg-gray-100 rounded-lg p-4 mb-3">
                        <div className="grid grid-cols-3 gap-2">
                          {type.brands.map((brand, index) => (
                            <div key={index} className="bg-white rounded p-2 text-xs font-bold text-center">
                              {brand}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Label htmlFor="email" className="text-base font-medium">
              Please provide your email address to receive the brief
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 300) })}
              className="w-full"
              placeholder="Your email"
              required
              maxLength={300}
            />
            <div className="text-xs text-gray-500 text-right">{formData.email.length}/300</div>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600 mb-2">Our social media</p>
            <div className="flex justify-center space-x-4">{/* Social media icons would go here */}</div>
          </div>
        </div>
      </div>
    </BriefLayout>
  )
}
