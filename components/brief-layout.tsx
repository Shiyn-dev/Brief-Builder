"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { GoogleLogin } from "@/components/google-login"
import { Logo } from "@/components/logo"

interface BriefLayoutProps {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  onNext?: () => void
  onPrev?: () => void
  nextHref?: string
  prevHref?: string
  showNext?: boolean
  showPrev?: boolean
  nextText?: string
  isNextDisabled?: boolean
}

export default function BriefLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  nextHref,
  prevHref,
  showNext = true,
  showPrev = true,
  nextText = "Next",
  isNextDisabled = false,
}: BriefLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F9FA" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <GoogleLogin />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 pb-32">
        {/* Form without border */}
        <div className="bg-white rounded-lg p-8 mb-8">{children}</div>
      </main>

      {/* Fixed Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            {showPrev ? (
              prevHref ? (
                <Link href={prevHref}>
                  <Button variant="ghost" size="lg" className="text-gray-600 p-6">
                    <ArrowLeft className="w-8 h-8" />
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="lg" onClick={onPrev} className="text-gray-600 p-6">
                  <ArrowLeft className="w-8 h-8" />
                </Button>
              )
            ) : (
              <div />
            )}

            {/* Progress Bar */}
            <div className="flex-1 mx-8">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "#038196",
                    width: `${(currentStep / totalSteps) * 100}%`,
                  }}
                />
              </div>
            </div>

            {showNext ? (
              nextHref ? (
                <Link href={nextHref}>
                  <Button
                    size="lg"
                    className="text-white px-8 py-3"
                    style={{ backgroundColor: "#038196" }}
                    disabled={isNextDisabled}
                  >
                    {nextText}
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={onNext}
                  className="text-white px-8 py-3"
                  style={{ backgroundColor: "#038196" }}
                  disabled={isNextDisabled}
                >
                  {nextText}
                </Button>
              )
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
