"use client"

import { useResumeStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from "lucide-react"

export function ResumePreview() {
  const { personalInfo, experiences, education, projects, skills, customBlocks, sections } = useResumeStore()

  const visibleSections = sections.filter((section) => section.visible).sort((a, b) => a.order - b.order)

  const renderPersonalInfo = () => (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.name}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        {personalInfo.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            {personalInfo.email}
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {personalInfo.phone}
          </div>
        )}
        {personalInfo.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {personalInfo.location}
          </div>
        )}
        {personalInfo.website && (
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            {personalInfo.website}
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </div>
        )}
        {personalInfo.github && (
          <div className="flex items-center gap-1">
            <Github className="w-4 h-4" />
            GitHub
          </div>
        )}
      </div>
    </div>
  )

  const renderExperience = () => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Work Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-700">{exp.company}</p>
              </div>
              <p className="text-sm text-gray-600">
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEducation = () => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Education</h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-gray-700">{edu.institution}</p>
              </div>
              <p className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
            {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Projects</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <div className="flex gap-2">
                {project.url && <ExternalLink className="w-4 h-4 text-gray-600" />}
                {project.github && <Github className="w-4 h-4 text-gray-600" />}
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSkills = () => {
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
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Skills</h2>
        <div className="space-y-4">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge key={skill.id} variant="outline" className="text-xs">
                    {skill.name} ({skill.level})
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderCustomBlocks = () => (
    <>
      {customBlocks.map((block) => (
        <div key={block.id} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">{block.title}</h2>
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{block.content}</div>
        </div>
      ))}
    </>
  )

  const renderSection = (section: any) => {
    switch (section.type) {
      case "personal":
        return renderPersonalInfo()
      case "experience":
        return renderExperience()
      case "education":
        return renderEducation()
      case "projects":
        return renderProjects()
      case "skills":
        return renderSkills()
      case "custom":
        return renderCustomBlocks()
      default:
        return null
    }
  }

  return (
    <div id="resume-preview" className="bg-white p-8 min-h-[800px] shadow-sm">
      {visibleSections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  )
}
