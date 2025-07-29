"use client"

import type React from "react"

import { useState } from "react"
import { useResumeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"

export function SkillsForm() {
  const { skills, addSkill, updateSkill, removeSkill } = useResumeStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    level: "Intermediate" as const,
    category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addSkill(formData)
    setFormData({
      name: "",
      level: "Intermediate",
      category: "",
    })
    setShowForm(false)
  }

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  return (
    <div className="space-y-4">
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <Card key={category} className="p-4">
          <h4 className="font-medium mb-3">{category}</h4>
          <div className="space-y-2">
            {categorySkills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <span>{skill.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {skill.level}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={skill.level} onValueChange={(value) => updateSkill(skill.id, { level: value as any })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {showForm ? (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="JavaScript"
                  required
                />
              </div>
              <div>
                <Label htmlFor="skillLevel">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="skillCategory">Category</Label>
                <Input
                  id="skillCategory"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Programming Languages"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Skill</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button onClick={() => setShowForm(true)} variant="outline" className="w-full flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      )}
    </div>
  )
}
