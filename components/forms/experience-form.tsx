"use client"

import type React from "react"

import { useState } from "react"
import { useResumeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export function ExperienceForm() {
  const { experiences, addExperience, updateExperience, removeExperience } = useResumeStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addExperience(formData)
    setFormData({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <Card key={exp.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-medium">
                {exp.position} at {exp.company}
              </h4>
              <p className="text-sm text-gray-600">
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company</Label>
              <Input value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} />
            </div>
            <div>
              <Label>Position</Label>
              <Input value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                disabled={exp.current}
              />
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) => updateExperience(exp.id, { current: checked as boolean })}
              />
              <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
              />
            </div>
          </div>
        </Card>
      ))}

      {showForm ? (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  disabled={formData.current}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={formData.current}
                onCheckedChange={(checked) => setFormData({ ...formData, current: checked as boolean })}
              />
              <Label htmlFor="current">Currently working here</Label>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Experience</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button onClick={() => setShowForm(true)} variant="outline" className="w-full flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      )}
    </div>
  )
}
