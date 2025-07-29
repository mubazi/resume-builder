"use client"

import type React from "react"

import { useState } from "react"
import { useResumeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export function CustomBlockForm() {
  const { customBlocks, addCustomBlock, updateCustomBlock, removeCustomBlock } = useResumeStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addCustomBlock(formData)
    setFormData({
      title: "",
      content: "",
    })
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      {customBlocks.map((block) => (
        <Card key={block.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">{block.title}</h4>
            <Button variant="ghost" size="sm" onClick={() => removeCustomBlock(block.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={block.title} onChange={(e) => updateCustomBlock(block.id, { title: e.target.value })} />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={block.content}
                onChange={(e) => updateCustomBlock(block.id, { content: e.target.value })}
                rows={4}
                placeholder="Enter your custom content here..."
              />
            </div>
          </div>
        </Card>
      ))}

      {showForm ? (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="blockTitle">Title</Label>
              <Input
                id="blockTitle"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Custom Section Title"
                required
              />
            </div>
            <div>
              <Label htmlFor="blockContent">Content</Label>
              <Textarea
                id="blockContent"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                placeholder="Enter your custom content here..."
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Custom Block</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button onClick={() => setShowForm(true)} variant="outline" className="w-full flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Custom Block
        </Button>
      )}
    </div>
  )
}
