"use client"

import type React from "react"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useResumeStore } from "@/lib/store"
import { DragDropEditor } from "@/components/drag-drop-editor"
import { ResumePreview } from "@/components/resume-preview"
import { ExportPanel } from "@/components/export-panel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, Edit3, Download, Upload } from "lucide-react"

export default function ResumeBuilder() {
  const [mode, setMode] = useState<"edit" | "preview">("edit")
  const { sections, loadFromJSON, exportToJSON } = useResumeStore()

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          loadFromJSON(data)
        } catch (error) {
          console.error("Invalid JSON file:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleExportJSON = () => {
    const data = exportToJSON()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "resume-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>

            <div className="flex items-center gap-4">
              {/* Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={mode === "edit" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("edit")}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant={mode === "preview" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("preview")}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>

              {/* Import/Export */}
              <div className="flex items-center gap-2">
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" id="import-json" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("import-json")?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportJSON}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Download className="w-4 h-4" />
                  Export JSON
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-4">
          {mode === "edit" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Editor Panel */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Edit Resume Sections</h2>
                  <DragDropEditor />
                </Card>
              </div>

              {/* Preview Panel */}
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Live Preview</h2>
                    <ExportPanel />
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <ResumePreview />
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Resume Preview</h2>
                  <ExportPanel />
                </div>
                <ResumePreview />
              </Card>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  )
}
