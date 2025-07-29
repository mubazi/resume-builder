"use client"

import type React from "react"

import { useState } from "react"
import { useResumeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addEducation(formData)
    setFormData({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    })
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <Card key={edu.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-medium">
                {edu.degree} in {edu.field}
              </h4>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Institution</Label>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
              />
            </div>
            <div>
              <Label>Degree</Label>
              <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} />
            </div>
            <div>
              <Label>Field of Study</Label>
              <Input value={edu.field} onChange={(e) => updateEducation(edu.id, { field: e.target.value })} />
            </div>
            <div>
              <Label>GPA (Optional)</Label>
              <Input
                value={edu.gpa || ""}
                onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                placeholder="3.8"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
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
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="Bachelor of Science"
                  required
                />
              </div>
              <div>
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  placeholder="Computer Science"
                  required
                />
              </div>
              <div>
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  placeholder="3.8"
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
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Education</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button onClick={() => setShowForm(true)} variant="outline" className="w-full flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      )}
    </div>
  )
}
