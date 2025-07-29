"use client"

import { useResumeStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useResumeStore()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="New York, NY"
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={personalInfo.website || ""}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="https://johndoe.com"
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin || ""}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={personalInfo.github || ""}
          onChange={(e) => updatePersonalInfo({ github: e.target.value })}
          placeholder="https://github.com/johndoe"
        />
      </div>
    </div>
  )
}
