"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Edit2, Trash2, Image, MoveUp, MoveDown } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

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

interface Brief {
    id: number
    name: string
    description?: string
    logoUrl?: string
    questions?: Question[]
}

export default function AdminBriefEditPage() {
    const params = useParams()
    const router = useRouter()
    const { user, logout } = useAuth()

    // More reliable way to get ID from parameters
    const briefId = params?.id ? Number(params.id) : null

    const [brief, setBrief] = useState<Brief | null>(null)
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Brief editing state
    const [briefForm, setBriefForm] = useState({
        name: "",
        description: "",
        logo: null as File | null
    })

    // New question state
    const [newQuestion, setNewQuestion] = useState({
        name: "",
        type: "TEXT" as Question["type"],
        adding: false
    })

    // Question editing state - UPDATED to include type
    const [editingQuestion, setEditingQuestion] = useState<{
        id: number
        name: string
        type: Question["type"]
        saving: boolean
    } | null>(null)

    // Option adding state
    const [addingOption, setAddingOption] = useState<{
        questionId: number
        name: string
        logo: File | null
        saving: boolean
    } | null>(null)

    // Logout handler
    const handleLogout = () => {
        logout();
        router.push("/");
    };

    useEffect(() => {
        console.log("🔍 Route parameters:", params)
        console.log("🔍 Brief ID:", briefId)

        if (briefId && briefId > 0) {
            fetchBrief()
            fetchQuestions()
        } else {
            setError("Invalid brief ID")
            setLoading(false)
        }
    }, [briefId, params])

    const fetchBrief = async () => {
        if (!briefId) return

        try {
            console.log(`🔄 Loading brief with ID: ${briefId}`)
            const response = await fetch(`https://brief-builder.onrender.com/api/briefs/${briefId}`)

            console.log(`📡 Server response:`, response.status, response.statusText)

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Brief with ID ${briefId} not found`)
                }
                throw new Error(`Server error: ${response.status} ${response.statusText}`)
            }

            const data: Brief = await response.json()
            console.log("✅ Brief loaded:", data)

            setBrief(data)
            setBriefForm({
                name: data.name,
                description: data.description || "",
                logo: null
            })
        } catch (err) {
            console.error("❌ Error loading brief:", err)
            setError(err instanceof Error ? err.message : "Failed to load brief")
        }
    }

    const fetchQuestions = async () => {
        if (!briefId) return

        try {
            setLoading(true)
            console.log(`🔄 Loading questions for brief ${briefId}`)

            const response = await fetch(`https://brief-builder.onrender.com/api/questions/brief/${briefId}`)

            console.log(`📡 Server response for questions:`, response.status, response.statusText)

            if (!response.ok) {
                if (response.status === 404) {
                    console.log("ℹ️ Questions not found, they might not exist yet")
                    setQuestions([])
                    return
                }
                throw new Error(`Error loading questions: ${response.status}`)
            }

            const data: Question[] = await response.json()
            console.log("✅ Questions loaded:", data)

            const sortedQuestions = data.sort((a, b) => a.position - b.position)
            setQuestions(sortedQuestions)
            setError(null)
        } catch (err) {
            console.error("❌ Error loading questions:", err)
            setError(err instanceof Error ? err.message : "Failed to load questions")
        } finally {
            setLoading(false)
        }
    }

    // Update brief
    const handleUpdateBrief = async () => {
        if (!briefId) return

        try {
            setSaving(true)
            setError(null)

            const formData = new FormData()

            // Add fields directly to FormData
            formData.append('name', briefForm.name)
            if (briefForm.description) {
                formData.append('description', briefForm.description)
            }

            // Add file if it exists
            if (briefForm.logo) {
                formData.append('logo', briefForm.logo)
            }

            const response = await fetch(`https://brief-builder.onrender.com/api/briefs/${briefId}`, {
                method: 'PUT',
                body: formData
                // DO NOT set Content-Type header - it will be set automatically as multipart/form-data
            })

            if (!response.ok) {
                console.error(`Server error: ${response.status} ${response.statusText}`)
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const updatedBrief: Brief = await response.json()
            setBrief(updatedBrief)
            alert('Brief successfully updated!')
        } catch (err: any) {
            console.error("❌ Error updating brief:", err)
            setError(`Error updating brief: ${err.message}`)
        } finally {
            setSaving(false)
        }
    }

    // Add question
    const handleAddQuestion = async () => {
        if (!briefId || !newQuestion.name.trim()) {
            alert("Please enter question text.")
            return
        }

        try {
            setNewQuestion(prev => ({ ...prev, adding: true }))
            setError(null)

            const questionData = {
                name: newQuestion.name,
                type: newQuestion.type,
                briefId: briefId,
                position: questions.length
            }

            const response = await fetch('https://brief-builder.onrender.com/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questionData)
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            setNewQuestion({ name: "", type: "TEXT", adding: false })
            await fetchQuestions()
        } catch (err: any) {
            console.error("❌ Error adding question:", err)
            setError(`Error adding question: ${err.message}`)
        } finally {
            setNewQuestion(prev => ({ ...prev, adding: false }))
        }
    }

    // Delete question
    const handleDeleteQuestion = async (questionId: number, questionName: string) => {
        if (!confirm(`Delete question "${questionName}"?`)) return

        try {
            const response = await fetch(`https://brief-builder.onrender.com/api/questions/${questionId}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            await fetchQuestions()
        } catch (err: any) {
            console.error("❌ Error deleting question:", err)
            setError(`Error deleting question: ${err.message}`)
        }
    }

    // Update question - UPDATED to include type
    const handleUpdateQuestion = async () => {
        if (!editingQuestion || !briefId) return

        try {
            setEditingQuestion(prev => prev ? { ...prev, saving: true } : null)

            const response = await fetch(`https://brief-builder.onrender.com/api/questions/${editingQuestion.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editingQuestion.name,
                    type: editingQuestion.type, // Now we send the updated type
                    briefId: briefId
                })
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            setEditingQuestion(null)
            await fetchQuestions()
        } catch (err: any) {
            console.error("❌ Error updating question:", err)
            setError(`Error updating question: ${err.message}`)
        }
    }

    // Change question position
    const handleMoveQuestion = async (questionId: number, newPosition: number) => {
        try {
            const response = await fetch(`https://brief-builder.onrender.com/api/questions/${questionId}/position`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: questionId,
                    position: newPosition
                })
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            await fetchQuestions()
        } catch (err: any) {
            console.error("❌ Error changing position:", err)
            setError(`Error changing position: ${err.message}`)
        }
    }

    // Add option to question
    const handleAddOption = async () => {
        if (!addingOption || !addingOption.name.trim()) return

        try {
            setAddingOption(prev => prev ? { ...prev, saving: true } : null)

            const formData = new FormData()

            // We DON'T add optionName to formData, it goes as a URL parameter
            // but we DO add the logo file to formData if it exists
            if (addingOption.logo) {
                formData.append('logo', addingOption.logo)
            }

            // Create URL with option name as a query parameter
            const url = new URL(`https://brief-builder.onrender.com/api/questions/${addingOption.questionId}/options`)
            url.searchParams.append('optionName', addingOption.name)

            const response = await fetch(url.toString(), {
                method: 'POST',
                body: formData
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            setAddingOption(null)
            await fetchQuestions()
        } catch (err: any) {
            console.error("❌ Error adding option:", err)
            setError(`Error adding option: ${err.message}`)
        }
    }

    // Delete option
    const handleDeleteOption = async (questionId: number, optionId: number, optionName: string) => {
        if (!confirm(`Delete option "${optionName}"?`)) return

        try {
            const response = await fetch(`https://brief-builder.onrender.com/api/questions/${questionId}/options/${optionId}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            await fetchQuestions()
        } catch (err: any) {
            console.error("❌ Error deleting option:", err)
            setError(`Error deleting option: ${err.message}`)
        }
    }

    // Handle case when ID is not valid
    if (!briefId || briefId <= 0) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/admin/main')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to list
                    </Button>
                    <h1 className="text-3xl font-bold text-red-600">Error</h1>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">Invalid brief ID. Check the URL.</p>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex justify-center items-center py-12">
                    <div className="text-lg text-gray-600">Loading...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/admin/main')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to list
                    </Button>
                    <h1 className="text-3xl font-bold">Edit Brief #{briefId}</h1>
                </div>

                {/* Add Logout button */}
                {user && (
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{error}</p>
                    <Button variant="outline" size="sm" onClick={() => setError(null)} className="mt-2">
                        Close
                    </Button>
                </div>
            )}

            {/* Show form only if brief is loaded */}
            {brief ? (
                <>
                    {/* Brief editing form */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Brief Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="brief-name">Brief Name</Label>
                                <Input
                                    id="brief-name"
                                    value={briefForm.name}
                                    onChange={(e) => setBriefForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter brief name"
                                />
                            </div>

                            <div>
                                <Label htmlFor="brief-description">Description</Label>
                                <Textarea
                                    id="brief-description"
                                    value={briefForm.description}
                                    onChange={(e) => setBriefForm(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Enter brief description"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="brief-logo">Logo</Label>
                                <div className="flex items-center gap-4">
                                    {brief?.logoUrl && (
                                        <img
                                            src={`https://brief-builder.onrender.com${brief.logoUrl}`}
                                            alt="Current logo"
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                    )}
                                    <Input
                                        id="brief-logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setBriefForm(prev => ({ ...prev, logo: e.target.files?.[0] || null }))}
                                    />
                                </div>
                            </div>

                            <Button onClick={handleUpdateBrief} disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* New question form */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Add New Question</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="new-question">Question Text</Label>
                                <Input
                                    id="new-question"
                                    value={newQuestion.name}
                                    onChange={(e) => setNewQuestion(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter question text"
                                />
                            </div>

                            <div>
                                <Label htmlFor="question-type">Question Type</Label>
                                <Select
                                    value={newQuestion.type}
                                    onValueChange={(value) => setNewQuestion(prev => ({ ...prev, type: value as Question["type"] }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TEXT">Text</SelectItem>
                                        <SelectItem value="SINGLE_CHOICE">Single Choice</SelectItem>
                                        <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button onClick={handleAddQuestion} disabled={newQuestion.adding}>
                                <Plus className="w-4 h-4 mr-2" />
                                {newQuestion.adding ? "Adding..." : "Add Question"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Questions list */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Questions ({questions.length})</h2>

                        {questions.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No questions. Add your first one!</p>
                        ) : (
                            questions.map((question, index) => (
                                <Card key={question.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                {editingQuestion?.id === question.id ? (
                                                    <div className="space-y-4">
                                                        <Input
                                                            value={editingQuestion.name}
                                                            onChange={(e) => setEditingQuestion(prev =>
                                                                prev ? { ...prev, name: e.target.value } : null
                                                            )}
                                                            className="flex-1"
                                                        />

                                                        {/* ADD TYPE SELECTION FOR EDITING */}
                                                        <div>
                                                            <Label htmlFor={`edit-question-type-${question.id}`}>Question Type</Label>
                                                            <Select
                                                                value={editingQuestion.type}
                                                                onValueChange={(value) => setEditingQuestion(prev =>
                                                                    prev ? { ...prev, type: value as Question["type"] } : null
                                                                )}
                                                            >
                                                                <SelectTrigger id={`edit-question-type-${question.id}`}>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="TEXT">Text</SelectItem>
                                                                    <SelectItem value="SINGLE_CHOICE">Single Choice</SelectItem>
                                                                    <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={handleUpdateQuestion}
                                                                disabled={editingQuestion.saving}
                                                                size="sm"
                                                            >
                                                                {editingQuestion.saving ? "Saving..." : "Save"}
                                                            </Button>
                                                            <Button
                                                                onClick={() => setEditingQuestion(null)}
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h3 className="text-lg font-semibold">{question.name}</h3>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Type: {question.type} | Position: {question.position}
                                                        </p>
                                                    </>
                                                )}
                                            </div>

                                            {/* Only show control buttons when not editing */}
                                            {editingQuestion?.id !== question.id && (
                                                <div className="flex gap-2">
                                                    {index > 0 && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleMoveQuestion(question.id, question.position - 1)}
                                                        >
                                                            <MoveUp className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    {index < questions.length - 1 && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleMoveQuestion(question.id, question.position + 1)}
                                                        >
                                                            <MoveDown className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setEditingQuestion({
                                                            id: question.id,
                                                            name: question.name,
                                                            type: question.type,  // Include the current type
                                                            saving: false
                                                        })}
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeleteQuestion(question.id, question.name)}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Question options - only show when not editing */}
                                        {editingQuestion?.id !== question.id &&
                                            (question.type === "SINGLE_CHOICE" || question.type === "MULTIPLE_CHOICE") && (
                                                <div className="mt-4 p-4 bg-gray-50 rounded">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h4 className="font-medium">Answer Options</h4>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setAddingOption({
                                                                questionId: question.id,
                                                                name: "",
                                                                logo: null,
                                                                saving: false
                                                            })}
                                                        >
                                                            <Plus className="w-4 h-4 mr-1" />
                                                            Add Option
                                                        </Button>
                                                    </div>

                                                    {/* Option adding form */}
                                                    {addingOption?.questionId === question.id && (
                                                        <div className="mb-4 p-3 bg-white rounded border space-y-2">
                                                            <Input
                                                                value={addingOption.name}
                                                                onChange={(e) => setAddingOption(prev =>
                                                                    prev ? { ...prev, name: e.target.value } : null
                                                                )}
                                                                placeholder="Option name"
                                                            />
                                                            <Input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => setAddingOption(prev =>
                                                                    prev ? { ...prev, logo: e.target.files?.[0] || null } : null
                                                                )}
                                                            />
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    onClick={handleAddOption}
                                                                    disabled={addingOption.saving}
                                                                    size="sm"
                                                                >
                                                                    {addingOption.saving ? "Adding..." : "Add"}
                                                                </Button>
                                                                <Button
                                                                    onClick={() => setAddingOption(null)}
                                                                    variant="outline"
                                                                    size="sm"
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Options list */}
                                                    <div className="space-y-2">
                                                        {question.options?.map((option) => (
                                                            <div key={option.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                                                <div className="flex items-center gap-3">
                                                                    {option.logoUrl && (
                                                                        <img
                                                                            src={`https://brief-builder.onrender.com${option.logoUrl}`}
                                                                            alt={option.name}
                                                                            className="w-8 h-8 object-cover rounded"
                                                                        />
                                                                    )}
                                                                    <span>{option.name}</span>
                                                                </div>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteOption(question.id, option.id, option.name)}
                                                                    className="text-red-600"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {(!question.options || question.options.length === 0) && (
                                                        <p className="text-gray-500 text-sm">No answer options</p>
                                                    )}
                                                </div>
                                            )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </>
            ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-600">Brief not loaded. Check if the ID is correct.</p>
                </div>
            )}
        </div>
    )
}