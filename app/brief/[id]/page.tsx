"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import BriefLayout from "@/components/brief-layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Types from API schema
interface QuestionOption {
  id: number
  name: string
  logoUrl?: string
  questionId: number
}

interface Question {
  id: number
  name: string
  type: "TEXT" | "SINGLE_CHOICE" | "MULTIPLE_CHOICE"
  briefId: number
  position: number
  options?: QuestionOption[]
}

export default function BriefPage() {
  const { id: briefId } = useParams()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [briefName, setBriefName] = useState("Brief")

  const questionsPerStep = 3

  useEffect(() => {
    const fetchData = async () => {
      if (!briefId) return

      try {
        setLoading(true)

        // Fetch brief info to get the name
        try {
          const briefRes = await fetch(`https://brief-builder.onrender.com/api/briefs/${briefId}`)
          if (briefRes.ok) {
            const briefData = await briefRes.json()
            if (briefData && briefData.name) {
              setBriefName(briefData.name)
            }
          }
        } catch (err) {
          console.error("Failed to load brief details:", err)
          // Continue anyway, as we're mostly interested in questions
        }

        // Fetch questions
        const res = await fetch(`https://brief-builder.onrender.com/api/questions/brief/${briefId}`)

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data: Question[] = await res.json()

        // Sort questions by position
        const sortedQuestions = data.sort((a, b) => a.position - b.position)
        setQuestions(sortedQuestions)
        setError(null)
      } catch (err) {
        console.error("❌ Failed to load questions:", err)
        setError("❌ Failed to load questions:")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [briefId])

  const currentQuestions = questions.slice(
      step * questionsPerStep,
      (step + 1) * questionsPerStep
  )

  const totalSteps = Math.ceil(questions.length / questionsPerStep)
  const isLastStep = step === totalSteps - 1

  const handleAnswerChange = (questionId: number, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (isLastStep) {
      // Save answers to localStorage and navigate to completion
      localStorage.setItem("briefAnswers", JSON.stringify(answers))
      router.push(`/complete-brief/${briefId}`)
    } else {
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  // Check if all required fields on the current step are filled
  const isCurrentStepValid = () => {
    return currentQuestions.every(question => {
      const answer = answers[question.id]
      if (question.type === "TEXT") {
        return answer && typeof answer === "string" && answer.trim().length > 0
      } else if (question.type === "SINGLE_CHOICE") {
        return answer && typeof answer === "string"
      } else if (question.type === "MULTIPLE_CHOICE") {
        return answer && Array.isArray(answer) && answer.length > 0
      }
      return false
    })
  }

  if (loading) {
    return (
        <BriefLayout currentStep={1} totalSteps={1}>
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading questions...</div>
          </div>
        </BriefLayout>
    )
  }

  if (error) {
    return (
        <BriefLayout currentStep={1} totalSteps={1}>
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </BriefLayout>
    )
  }

  if (questions.length === 0) {
    return (
        <BriefLayout currentStep={1} totalSteps={1}>
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Questions not found</div>
          </div>
        </BriefLayout>
    )
  }

  return (
      <BriefLayout
          currentStep={step + 1}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrev={handlePrev}
          showPrev={step > 0}
          showNext={true}
          nextText={isLastStep ? "Complete Brief" : "Next"}
          isNextDisabled={!isCurrentStepValid()}
      >
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          {briefName}
        </h1>

        <div className="space-y-6">
          {currentQuestions.map((question) => (
              <Card key={question.id} className="bg-white shadow rounded-xl border-none">
                <CardContent className="p-6">
                  <Label className="text-base font-medium block mb-4">
                    {question.name}
                  </Label>
                  <QuestionRenderer
                      question={question}
                      value={answers[question.id]}
                      onChange={(val) => handleAnswerChange(question.id, val)}
                  />
                </CardContent>
              </Card>
          ))}
        </div>
      </BriefLayout>
  )
}

function QuestionRenderer({
                            question,
                            value,
                            onChange,
                          }: {
  question: Question
  value: string | string[] | undefined
  onChange: (val: string | string[]) => void
}) {
  if (question.type === "TEXT") {
    return (
        <textarea
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#038196] focus:border-transparent"
            rows={4}
            placeholder="Your answer..."
        />
    )
  }

  if (question.type === "SINGLE_CHOICE") {
    return (
        <RadioGroup
            value={(value as string) || ""}
            onValueChange={onChange}
            className="flex flex-col gap-3"
        >
          {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <RadioGroupItem
                    value={option.name}
                    id={`${question.id}-${option.id}`}
                    className="text-[#038196] focus:ring-[#038196]"
                />
                <Label
                    htmlFor={`${question.id}-${option.id}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                >
                  {option.name}
                </Label>
                {option.logoUrl && (
                    <img
                        src={`https://brief-builder.onrender.com${option.logoUrl}`}
                        alt={option.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                    />
                )}
              </div>
          ))}
        </RadioGroup>
    )
  }

  if (question.type === "MULTIPLE_CHOICE") {
    const currentValues = Array.isArray(value) ? value : []

    const toggleOption = (optionName: string) => {
      if (currentValues.includes(optionName)) {
        onChange(currentValues.filter((v) => v !== optionName))
      } else {
        onChange([...currentValues, optionName])
      }
    }

    return (
        <div className="flex flex-col gap-3">
          {question.options?.map((option) => (
              <label
                  key={option.id}
                  className="flex items-center gap-3 cursor-pointer"
              >
                <input
                    type="checkbox"
                    checked={currentValues.includes(option.name)}
                    onChange={() => toggleOption(option.name)}
                    className="w-4 h-4 text-[#038196] bg-gray-100 border-gray-300 rounded focus:ring-[#038196] focus:ring-2"
                />
                <span className="text-sm font-normal flex-1">
                  {option.name}
                </span>
                {option.logoUrl && (
                    <img
                        src={`https://brief-builder.onrender.com${option.logoUrl}`}
                        alt={option.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                    />
                )}
              </label>
          ))}
        </div>
    )
  }

  return null
}