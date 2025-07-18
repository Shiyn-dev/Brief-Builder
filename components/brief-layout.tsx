"use client"

import  React from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import {GoogleLogin} from "@/components/google-login"
import {Logo} from "@/components/logo"
import clsx from "clsx"

interface BriefLayoutProps {
    children: React.ReactNode,
    currentStep: number,
    totalSteps: number,
    onNext?: () => void,
    onPrev?: () => void,
    nextHref?: string,
    prevHref?: string,
    showNext?: boolean,
    showPrev?: boolean,
    nextText?: string,
    isNextDisabled?: boolean,
    nextButtonText?: string
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
                                        nextButtonText
                                    }: BriefLayoutProps) {
    return (
        <div className="min-h-screen" style={{backgroundColor: "#F0F9FA"}}>
            {/* Header */}
            <header className="px-6 py-4" style={{backgroundColor: "#F0F9FA"}}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <Logo/>
                    </Link>
                    <GoogleLogin/>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8 pb-32">
                {/* Здесь рендерятся children - каждая страница сама определяет свой заголовок */}
                {children}
            </main>

            {/* Прогрессбар */}
            <div className="w-full bg-[#F0F9FA] px-6 pt-2 pb-4">
                <div className="max-w-4xl mx-auto flex items-center justify-center">
                    <div className="w-full flex">
                        {Array.from({length: totalSteps}).map((_, idx) => (
                            <div
                                key={idx}
                                className={clsx(
                                    "h-1 flex-1 mx-0.5 rounded-full transition-all duration-300",
                                    idx < currentStep ? "bg-[#038196]" : "bg-gray-200"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Нижняя панель с кнопками */}
            <div className="w-full mb-8" style={{background: "#F0F9FA"}}>
                <div className="max-w-4xl mx-auto px-6 flex justify-between items-end min-h-[60px]">
                    <div>
                        {showPrev ? (
                            prevHref ? (
                                <Link href={prevHref}>
                                    <Button variant="ghost" size="lg" className="text-gray-600 p-6">
                                        <ArrowLeft className="w-8 h-8"/>
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="ghost" size="lg" onClick={onPrev} className="text-gray-600 p-6">
                                    <ArrowLeft className="w-8 h-8"/>
                                </Button>
                            )
                        ) : null}
                    </div>
                    <div>
                        {showNext ? (
                            nextHref ? (
                                <Link href={nextHref}>
                                    <Button
                                        size="lg"
                                        className="text-white px-8 py-3"
                                        style={{backgroundColor: "#038196"}}
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
                                    style={{backgroundColor: "#038196"}}
                                    disabled={isNextDisabled}
                                >
                                    {nextText}
                                </Button>
                            )
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}