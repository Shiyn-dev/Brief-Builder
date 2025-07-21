"use client"

import  React, { useEffect } from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
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

    // ПРИНУДИТЕЛЬНО УСТАНАВЛИВАЕМ ФОН
    useEffect(() => {
        document.body.style.backgroundColor = "#F0F9FA"
        document.documentElement.style.backgroundColor = "#F0F9FA"
        return () => {
            document.body.style.backgroundColor = ""
            document.documentElement.style.backgroundColor = ""
        }
    }, [])

    return (
        <>
            <style jsx global>{`
                html, body {
                    background-color: #F0F9FA !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
            `}</style>

            <div className="min-h-screen w-full" style={{backgroundColor: "#F0F9FA"}}>
                {/* Header */}
                <header className="px-6 py-4 w-full" style={{backgroundColor: "#F0F9FA"}}>
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/">
                            <Logo/>
                        </Link>
                        <GoogleLogin/>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-6 py-8 pb-32">
                    {children}
                </main>

                {/* ПРОГРЕСС БАР - С РАЗДЕЛЕНИЯМИ */}
                <div className="w-full pt-4 pb-2" style={{backgroundColor: "#F0F9FA"}}>
                    <div className="w-full flex px-2">
                        {Array.from({length: totalSteps}).map((_, idx) => (
                            <div
                                key={idx}
                                className={clsx(
                                    "h-1 flex-1 mx-1 rounded-full transition-all duration-300",
                                    idx < currentStep ? "bg-[#038196]" : "bg-gray-200"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* КНОПКИ - БЛИЖЕ К КРАЯМ */}
                <div className="w-full pl-2 pr-10 pb-1" style={{backgroundColor: "#F0F9FA"}}>
                    <div className="flex justify-between items-center w-full">
                        {/* ЛЕВЫЙ УГОЛ - КНОПКА НАЗАД */}
                        <div className="flex-shrink-0">
                            {showPrev ? (
                                prevHref ? (
                                    <Link href={prevHref}>
                                        <div className="text-gray-600 cursor-pointe ml-6">
                                            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.58578 29.5858C2.80474 30.3668 2.80474 31.6332 3.58578 32.4142L16.3137 45.1421C17.0948 45.9232 18.3611 45.9232 19.1421 45.1421C19.9232 44.3611 19.9232 43.0948 19.1421 42.3137L7.82843 31L19.1421 19.6863C19.9232 18.9052 19.9232 17.6389 19.1421 16.8579C18.3611 16.0768 17.0948 16.0768 16.3137 16.8579L3.58578 29.5858ZM57 31V29L5 29V31V33L57 33V31Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                    </Link>
                                ) : (
                                    <div onClick={onPrev} className="text-gray-600 cursor-pointer ml-6">
                                        <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.58578 29.5858C2.80474 30.3668 2.80474 31.6332 3.58578 32.4142L16.3137 45.1421C17.0948 45.9232 18.3611 45.9232 19.1421 45.1421C19.9232 44.3611 19.9232 43.0948 19.1421 42.3137L7.82843 31L19.1421 19.6863C19.9232 18.9052 19.9232 17.6389 19.1421 16.8579C18.3611 16.0768 17.0948 16.0768 16.3137 16.8579L3.58578 29.5858ZM57 31V29L5 29V31V33L57 33V31Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                )
                            ) : <div className="w-[62px] h-[62px]"></div>}
                        </div>

                        {/* ПРАВЫЙ УГОЛ - КНОПКА ВПЕРЕД */}
                        <div className="flex-shrink-0">
                            {showNext ? (
                                nextHref ? (
                                    <Link href={nextHref}>
                                        <Button
                                            size="lg"
                                            className="text-white px-10 py-3"
                                            style={{
                                                backgroundColor: isNextDisabled ? "#D9D9D9" : "#038196",
                                                cursor: isNextDisabled ? "not-allowed" : "pointer"
                                            }}
                                            disabled={isNextDisabled}
                                        >
                                            {nextText}
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        size="lg"
                                        onClick={onNext}
                                        className="text-white px-10 py-3"
                                        style={{
                                            backgroundColor: isNextDisabled ? "#D9D9D9" : "#038196",
                                            cursor: isNextDisabled ? "not-allowed" : "pointer"
                                        }}
                                        disabled={isNextDisabled}
                                    >
                                        {nextText}
                                    </Button>
                                )
                            ) : <div className="w-[100px] h-[48px]"></div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}