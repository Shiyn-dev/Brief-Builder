"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function PresentationStep1() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        companyName: "",
        companyActivity: "",
        customCompanyActivity: "",
        companyValue: "",
    })

    // Load existing data on component mount
    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
        if (existingData) {
            setFormData({
                companyName: existingData.companyName || "",
                companyActivity: existingData.companyActivity || "",
                customCompanyActivity: existingData.customCompanyActivity || "",
                companyValue: existingData.companyValue || "",
            })
        }
    }, [])

    // Validation function
    const isFormValid = () => {
        return formData.companyName.trim() !== "" &&
            formData.companyActivity !== "" &&
            formData.companyValue.trim() !== ""
    }

    const handleNext = () => {
        if (!isFormValid()) return

        const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
        localStorage.setItem("presentationBrief", JSON.stringify({
            ...existingData,
            ...formData,
        }))
        router.push("/presentation/step-2")
    }

    const handlePrev = () => {
        const existingData = JSON.parse(localStorage.getItem("presentationBrief") || "{}")
        localStorage.setItem("presentationBrief", JSON.stringify({
            ...existingData,
            ...formData,
        }))
        router.push("/")
    }

    return (
        <BriefLayout currentStep={1} totalSteps={7} onNext={handleNext} onPrev={handlePrev} isNextDisabled={!isFormValid()}>
            <style jsx global>{`
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
                }

                .animated-textarea-container {
                    position: relative;
                    margin: 20px 0;
                    width: 100%;
                    border-bottom: 2px solid #ccc;
                }

                .animated-textarea-container textarea {
                    font-size: 16px !important;
                    width: 100% !important;
                    border: none !important;
                    padding: 12px 0 8px 0 !important;
                    background-color: transparent !important;
                    outline: none !important;
                    color: #333 !important;
                    font-family: inherit !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    resize: none !important;
                    line-height: 1.5 !important;
                    min-height: 80px !important;
                }

                .animated-input-container .label,
                .animated-textarea-container .label {
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
                .animated-input-container.has-value .label,
                .animated-textarea-container textarea:focus ~ .label,
                .animated-textarea-container.has-value .label {
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

                .animated-textarea-container .underline {
                    position: absolute !important;
                    bottom: 0 !important;
                    left: 0 !important;
                    height: 2px !important;
                    width: 100% !important;
                    background-color: #68B3C0 !important;
                    transform: scaleX(0) !important;
                    transition: all 0.3s ease !important;
                }

                .animated-input-container input:focus ~ .underline,
                .animated-textarea-container textarea:focus ~ .underline {
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

            <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Brief for the Presentation:</h1>
            <Card className="bg-[#F0F9FA] shadow-none border-none p-0">
                <CardContent className="p-0">
                    <div className="space-y-6">
                        {/* Company Name */}
                        <Card className="bg-white shadow rounded-xl border-none">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">Company name <span className="text-red-500">*</span></Label>
                                    <div className={`animated-input-container ${formData.companyName ? 'has-value' : ''}`}>
                                        <input
                                            type="text"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value.slice(0, 300) })}
                                            maxLength={300}
                                            title="Please fill out this field"
                                        />
                                        <label className="label">Your option</label>
                                        <div className="underline"></div>
                                        <div className="char-count">{formData.companyName.length}/300</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Company Activity - РАДИОКНОПКИ ПО ГОРИЗОНТАЛИ */}
                        <Card className="bg-white shadow rounded-xl border-none">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">What does your company do? <span className="text-red-500">*</span></Label>
                                    <RadioGroup
                                        value={formData.companyActivity}
                                        onValueChange={(value) => setFormData({ ...formData, companyActivity: value })}
                                        className="flex flex-row gap-6 flex-wrap"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="manufacturing" id="manufacturing" />
                                            <Label htmlFor="manufacturing">Manufacturing</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="services" id="services" />
                                            <Label htmlFor="services">Services</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="retail" id="retail" />
                                            <Label htmlFor="retail">Retail</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="other" id="other" />
                                            <Label htmlFor="other">Other</Label>
                                        </div>
                                    </RadioGroup>

                                    {/* Your option для company activity */}
                                    <div className={`animated-input-container ${formData.customCompanyActivity ? 'has-value' : ''}`}>
                                        <input
                                            type="text"
                                            value={formData.customCompanyActivity}
                                            onChange={(e) => setFormData({ ...formData, customCompanyActivity: e.target.value.slice(0, 300) })}
                                            maxLength={300}
                                            title="Please fill out this field"
                                        />
                                        <label className="label">Your option</label>
                                        <div className="underline"></div>
                                        <div className="char-count">{formData.customCompanyActivity.length}/300</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Company Value - ОТДЕЛЬНЫЙ КОНТЕЙНЕР ДЛЯ TEXTAREA */}
                        <Card className="bg-white shadow rounded-xl border-none">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">What is your company's value? <span className="text-red-500">*</span></Label>
                                    <p className="text-sm text-gray-600">Briefly formulate your company's mission and values.</p>
                                    <div className={`animated-textarea-container ${formData.companyValue ? 'has-value' : ''}`}>
                                        <textarea
                                            value={formData.companyValue}
                                            onChange={(e) => setFormData({ ...formData, companyValue: e.target.value.slice(0, 300) })}
                                            maxLength={300}
                                            rows={4}
                                            title="Please fill out this field"
                                        />
                                        <label className="label">Your option</label>
                                        <div className="underline"></div>
                                        <div className="char-count">{formData.companyValue.length}/300</div>
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