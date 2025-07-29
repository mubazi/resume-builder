import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
}

export interface Skill {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  category: string
}

export interface CustomBlock {
  id: string
  title: string
  content: string
}

export interface ResumeSection {
  id: string
  type: "personal" | "experience" | "education" | "projects" | "skills" | "custom"
  title: string
  visible: boolean
  order: number
}

interface ResumeStore {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skill[]
  customBlocks: CustomBlock[]
  sections: ResumeSection[]

  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addExperience: (experience: Omit<Experience, "id">) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: (education: Omit<Education, "id">) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  addSkill: (skill: Omit<Skill, "id">) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  addCustomBlock: (block: Omit<CustomBlock, "id">) => void
  updateCustomBlock: (id: string, block: Partial<CustomBlock>) => void
  removeCustomBlock: (id: string) => void
  updateSectionOrder: (sections: ResumeSection[]) => void
  toggleSectionVisibility: (id: string) => void
  exportToJSON: () => any
  loadFromJSON: (data: any) => void
}

const defaultSections: ResumeSection[] = [
  { id: "personal", type: "personal", title: "Personal Information", visible: true, order: 0 },
  { id: "experience", type: "experience", title: "Work Experience", visible: true, order: 1 },
  { id: "education", type: "education", title: "Education", visible: true, order: 2 },
  { id: "skills", type: "skills", title: "Skills", visible: true, order: 3 },
  { id: "projects", type: "projects", title: "Projects", visible: true, order: 4 },
]

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        location: "",
      },
      experiences: [],
      education: [],
      projects: [],
      skills: [],
      customBlocks: [],
      sections: defaultSections,

      updatePersonalInfo: (info) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),

      addExperience: (experience) =>
        set((state) => ({
          experiences: [...state.experiences, { ...experience, id: Date.now().toString() }],
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          experiences: state.experiences.map((exp) => (exp.id === id ? { ...exp, ...experience } : exp)),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        })),

      addEducation: (education) =>
        set((state) => ({
          education: [...state.education, { ...education, id: Date.now().toString() }],
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          education: state.education.map((edu) => (edu.id === id ? { ...edu, ...education } : edu)),
        })),

      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: Date.now().toString() }],
        })),

      updateProject: (id, project) =>
        set((state) => ({
          projects: state.projects.map((proj) => (proj.id === id ? { ...proj, ...project } : proj)),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((proj) => proj.id !== id),
        })),

      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, { ...skill, id: Date.now().toString() }],
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          skills: state.skills.map((sk) => (sk.id === id ? { ...sk, ...skill } : sk)),
        })),

      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((sk) => sk.id !== id),
        })),

      addCustomBlock: (block) =>
        set((state) => ({
          customBlocks: [...state.customBlocks, { ...block, id: Date.now().toString() }],
        })),

      updateCustomBlock: (id, block) =>
        set((state) => ({
          customBlocks: state.customBlocks.map((cb) => (cb.id === id ? { ...cb, ...block } : cb)),
        })),

      removeCustomBlock: (id) =>
        set((state) => ({
          customBlocks: state.customBlocks.filter((cb) => cb.id !== id),
        })),

      updateSectionOrder: (sections) => set({ sections }),

      toggleSectionVisibility: (id) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === id ? { ...section, visible: !section.visible } : section,
          ),
        })),

      exportToJSON: () => {
        const state = get()
        return {
          personalInfo: state.personalInfo,
          experiences: state.experiences,
          education: state.education,
          projects: state.projects,
          skills: state.skills,
          customBlocks: state.customBlocks,
          sections: state.sections,
        }
      },

      loadFromJSON: (data) =>
        set({
          personalInfo: data.personalInfo || get().personalInfo,
          experiences: data.experiences || [],
          education: data.education || [],
          projects: data.projects || [],
          skills: data.skills || [],
          customBlocks: data.customBlocks || [],
          sections: data.sections || defaultSections,
        }),
    }),
    {
      name: "resume-builder-storage",
    },
  ),
)
