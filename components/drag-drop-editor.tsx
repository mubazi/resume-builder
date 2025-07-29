"use client"

import { useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useResumeStore } from "@/lib/store"
import { PersonalInfoForm } from "./forms/personal-info-form"
import { ExperienceForm } from "./forms/experience-form"
import { EducationForm } from "./forms/education-form"
import { ProjectsForm } from "./forms/projects-form"
import { SkillsForm } from "./forms/skills-form"
import { CustomBlockForm } from "./forms/custom-block-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Eye, EyeOff, Plus } from "lucide-react"

interface DraggableSectionProps {
  section: any
  index: number
  moveSection: (dragIndex: number, hoverIndex: number) => void
}

function DraggableSection({ section, index, moveSection }: DraggableSectionProps) {
  const { toggleSectionVisibility } = useResumeStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const [{ isDragging }, drag] = useDrag({
    type: "section",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "section",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveSection(item.index, index)
        item.index = index
      }
    },
  })

  const renderForm = () => {
    switch (section.type) {
      case "personal":
        return <PersonalInfoForm />
      case "experience":
        return <ExperienceForm />
      case "education":
        return <EducationForm />
      case "projects":
        return <ProjectsForm />
      case "skills":
        return <SkillsForm />
      case "custom":
        return <CustomBlockForm />
      default:
        return null
    }
  }

  return (
    <div ref={(node) => drag(drop(node))} className={`transition-opacity ${isDragging ? "opacity-50" : "opacity-100"}`}>
      <Card className="mb-4">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
            <h3 className="font-medium">{section.title}</h3>
            <Badge variant={section.visible ? "default" : "secondary"}>{section.visible ? "Visible" : "Hidden"}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => toggleSectionVisibility(section.id)}>
              {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
        {isExpanded && <div className="p-4">{renderForm()}</div>}
      </Card>
    </div>
  )
}

export function DragDropEditor() {
  const { sections, updateSectionOrder, addCustomBlock } = useResumeStore()

  const moveSection = (dragIndex: number, hoverIndex: number) => {
    const draggedSection = sections[dragIndex]
    const newSections = [...sections]
    newSections.splice(dragIndex, 1)
    newSections.splice(hoverIndex, 0, draggedSection)

    // Update order property
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
    }))

    updateSectionOrder(updatedSections)
  }

  const addCustomSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      type: "custom" as const,
      title: "Custom Section",
      visible: true,
      order: sections.length,
    }

    updateSectionOrder([...sections, newSection])
    addCustomBlock({ title: "Custom Section", content: "" })
  }

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-4">
      {sortedSections.map((section, index) => (
        <DraggableSection key={section.id} section={section} index={index} moveSection={moveSection} />
      ))}

      <Button onClick={addCustomSection} variant="outline" className="w-full flex items-center gap-2 bg-transparent">
        <Plus className="w-4 h-4" />
        Add Custom Section
      </Button>
    </div>
  )
}
