"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { AdminGuard } from "@/components/admin-guard"
import { GoogleLogin } from "@/components/google-login"

function AdminPageContent() {
  const [templates] = useState([
    { id: "landing", name: "Landing page", questions: 18 },
    { id: "logo", name: "Logo", questions: 10 },
    { id: "presentation", name: "Presentation", questions: 21 },
  ])

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
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Brief templates:</h1>
          </div>

          <div className="space-y-4 mb-8">
            {templates.map((template) => (
                <Card key={template.id} className="bg-white border border-gray-200">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {template.name} ({template.questions} questions)
                      </h3>
                    </div>
                    <Link href={`/admin/edit/${template.id}`}>
                      <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50 bg-transparent">
                        Edit
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/admin/new">
              <Button className="text-white" style={{ backgroundColor: "#038196" }}>
                <Plus className="w-4 h-4 mr-2" />
                Add new template
              </Button>
            </Link>
          </div>
        </main>
      </div>
  )
}

export default function AdminPage() {
  return (
      <AdminGuard>
        <AdminPageContent />
      </AdminGuard>
  )
}
