"use client"

import type React from "react"

import { useState } from "react"
import { useResumeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from "lucide-react"

export function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    technologies: [] as string[],
    url: "",
    github: "",
  })
  const [newTech, setNewTech] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addProject(formData)
    setFormData({
      name: "",
      description: "",
      technologies: [],
      url: "",
      github: "",
    })
    setShowForm(false)
  }

  const addTechnology = (projectId?: string) => {
    if (newTech.trim()) {
      if (projectId) {
        const project = projects.find((p) => p.id === projectId)
        if (project) {
          updateProject(projectId, {
            technologies: [...project.technologies, newTech.trim()],
          })
        }
      } else {
        setFormData({
          ...formData,
          technologies: [...formData.technologies, newTech.trim()],
        })
      }
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string, projectId?: string) => {
    if (projectId) {
      const project = projects.find((p) => p.id === projectId)
      if (project) {
        updateProject(projectId, {
          technologies: project.technologies.filter((t) => t !== tech),
        })
      }
    } else {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter((t) => t !== tech),
      })
    }
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-medium">{project.name}</h4>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Project Name</Label>
              <Input value={project.name} onChange={(e) => updateProject(project.id, { name: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Project URL (Optional)</Label>
                <Input
                  value={project.url || ""}
                  onChange={(e) => updateProject(project.id, { url: e.target.value })}
                  placeholder="https://project.com"
                />
              </div>
              <div>
                <Label>GitHub URL (Optional)</Label>
                <Input
                  value={project.github || ""}
                  onChange={(e) => updateProject(project.id, { github: e.target.value })}
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>
            <div>
              <Label>Technologies</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTechnology(tech, project.id)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology(project.id))}
                />
                <Button type="button" variant="outline" onClick={() => addTechnology(project.id)}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {showForm ? (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="projectDescription">Description</Label>
              <Textarea
                id="projectDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectUrl">Project URL (Optional)</Label>
                <Input
                  id="projectUrl"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://project.com"
                />
              </div>
              <div>
                <Label htmlFor="projectGithub">GitHub URL (Optional)</Label>
                <Input
                  id="projectGithub"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>
            <div>
              <Label>Technologies</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" variant="outline" onClick={() => addTechnology()}>
                  Add
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Project</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button onClick={() => setShowForm(true)} variant="outline" className="w-full flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      )}
    </div>
  )
}
