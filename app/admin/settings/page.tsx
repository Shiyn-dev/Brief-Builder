"use client"

import { useState } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Edit, HelpCircle } from "lucide-react"
import { AdminGuard } from "@/components/admin-guard" // Ensure AdminGuard is imported

function AdminSettingsPageContent() {
  const [settings, setSettings] = useState({
    projectName: "BRIEF BUILDER",
    projectId: "brief-builder",
    projectNumber: "743757028708",
    webApiKey: "AIzaSyDRBkz7jyJ-BAR-pqQuO4oV67rSOBrm3ss",
    environmentType: "Unspecified",
    publicFacingName: "project-743757028708",
  })

  return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/admin" className="text-xl font-medium text-white">
              Your project
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-8">
            {/* Project Settings */}
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div>
                  <Label className="text-gray-400 text-sm">Project name</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">{settings.projectName}</span>
                  <Edit className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Label className="text-gray-400 text-sm">Project ID</Label>
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <span className="text-white">{settings.projectId}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Label className="text-gray-400 text-sm">Project number</Label>
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <span className="text-white">{settings.projectNumber}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Label className="text-gray-400 text-sm">Web API Key</Label>
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <span className="text-white font-mono text-sm">{settings.webApiKey}</span>
                </div>
              </div>
            </div>

            {/* Environment Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-medium text-white mb-2">Environment</h2>
                <p className="text-gray-400 text-sm">
                  This setting customizes your project for different stages of the app lifecycle
                </p>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div>
                  <Label className="text-gray-400 text-sm">Environment type</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white">{settings.environmentType}</span>
                  <Edit className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Public Settings Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-medium text-white mb-2">Public settings</h2>
                <p className="text-gray-400 text-sm">
                  These settings control instances of your project shown to the public
                </p>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Label className="text-gray-400 text-sm">Public-facing name</Label>
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white">{settings.publicFacingName}</span>
                  <Edit className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}

export default function AdminSettingsPage() {
  return (
      <AdminGuard>
        <AdminSettingsPageContent />
      </AdminGuard>
  )
}
