"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Copy, Trash2, GripVertical } from "lucide-react"
import { GoogleLogin } from "@/components/google-login"
import { AdminGuard } from "@/components/admin-guard" // Ensure AdminGuard is imported

interface Question {
  id: number
  title: string
  type: string
  options: string[]
}

function NewTemplatePageContent() {
  const [templateName, setTemplateName] = useState("")
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: "Your question",
      type: "multiple-choice",
      options: ["Variant 1", ""],
    },
  ])

  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        title: "Your question",
        type: "multiple-choice",
        options: ["Variant 1", ""],
      },
    ])
  }

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const duplicateQuestion = (id: number) => {
    const questionToDuplicate = questions.find((q) => q.id === id)
    if (questionToDuplicate) {
      const newQuestion = {
        ...questionToDuplicate,
        id: Date.now(),
        title: questionToDuplicate.title + " (Copy)",
      }
      const index = questions.findIndex((q) => q.id === id)
      const newQuestions = [...questions]
      newQuestions.splice(index + 1, 0, newQuestion)
      setQuestions(newQuestions)
    }
  }

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault()
    if (draggedItem === null || draggedItem === targetId) return

    const draggedIndex = questions.findIndex((q) => q.id === draggedItem)
    const targetIndex = questions.findIndex((q) => q.id === targetId)

    const newQuestions = [...questions]
    const [draggedQuestion] = newQuestions.splice(draggedIndex, 1)
    newQuestions.splice(targetIndex, 0, draggedQuestion)

    setQuestions(newQuestions)
    setDraggedItem(null)
  }

  return (
      <div className="min-h-screen" style={{ backgroundColor: "#F0F9FA" }}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-teal-600">
              BRIEF BUILDER
            </Link>
            <GoogleLogin />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-semibold text-gray-900">New template:</h1>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
                <Card
                    key={question.id}
                    className="bg-white border border-gray-200 cursor-move"
                    draggable
                    onDragStart={(e) => handleDragStart(e, question.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, question.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-2">
                        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <Input
                              value={question.title}
                              onChange={(e) => {
                                const newQuestions = [...questions]
                                newQuestions[index].title = e.target.value
                                setQuestions(newQuestions)
                              }}
                              className="text-lg font-medium border-none p-0 focus:ring-0 flex-1"
                              placeholder="Your question"
                          />
                          <select className="border border-gray-300 rounded px-3 py-1 text-sm ml-4">
                            <option>Answer choice</option>
                            <option>Text</option>
                            <option>Multiple choice</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-3">
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                                <Input
                                    value={option}
                                    onChange={(e) => {
                                      const newQuestions = [...questions]
                                      newQuestions[index].options[optionIndex] = e.target.value
                                      setQuestions(newQuestions)
                                    }}
                                    placeholder={optionIndex === 0 ? "Variant 1" : "Add variant"}
                                    className="flex-1 border-none border-b border-gray-300 rounded-none p-0 focus:ring-0"
                                />
                              </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Copy
                                className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                                onClick={() => duplicateQuestion(question.id)}
                            />
                            <Trash2
                                className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500"
                                onClick={() => deleteQuestion(question.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}

            <div className="text-center">
              <Button onClick={addQuestion} variant="outline" className="text-teal-600 border-teal-600 bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add a question
              </Button>
            </div>
          </div>
        </main>
      </div>
  )
}

export default function NewTemplatePage() {
  return (
      <AdminGuard>
        <NewTemplatePageContent />
      </AdminGuard>
  )
}
