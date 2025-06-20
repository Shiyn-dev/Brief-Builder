"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

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
}: BriefLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-teal-600">
            BRIEF BUILDER
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Projects
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Contacts
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">{children}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {showPrev ? (
            prevHref ? (
              <Link href={prevHref}>
                <Button variant="ghost" size="lg" className="text-gray-600">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" size="lg" onClick={onPrev} className="text-gray-600">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )
          ) : (
            <div />
          )}

          {/* Progress Bar */}
          <div className="flex-1 mx-8">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-teal-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {showNext ? (
            nextHref ? (
              <Link href={nextHref}>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  {nextText}
                  {nextText === "Next" && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </Link>
            ) : (
              <Button size="lg" onClick={onNext} className="bg-teal-600 hover:bg-teal-700 text-white">
                {nextText}
                {nextText === "Next" && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            )
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  )
}
