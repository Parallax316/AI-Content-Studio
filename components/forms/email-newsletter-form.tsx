"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

interface EmailNewsletterFormProps {
  onSubmit: (data: any) => void
  isGenerating: boolean
}

export default function EmailNewsletterForm({ onSubmit, isGenerating }: EmailNewsletterFormProps) {
  const [formData, setFormData] = useState({
    subject: "",
    purpose: "promotional",
    keyPoints: "",
    callToAction: "",
    targetAudience: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div className="space-y-4" variants={container}>
        <motion.div variants={item}>
          <Label htmlFor="subject" className="text-primary">
            Subject Line
          </Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Enter a compelling subject line"
            value={formData.subject}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="purpose" className="text-primary">
            Purpose
          </Label>
          <Select value={formData.purpose} onValueChange={(value) => handleSelectChange("purpose", value)}>
            <SelectTrigger className="bg-background/50 border-white/10 focus:ring-primary/50">
              <SelectValue placeholder="Select the purpose" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-white/10">
              <SelectItem value="promotional">Promotional</SelectItem>
              <SelectItem value="informational">Informational</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="welcome">Welcome</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="keyPoints" className="text-primary">
            Key Message Points
          </Label>
          <Textarea
            id="keyPoints"
            name="keyPoints"
            placeholder="What are the main points you want to communicate?"
            value={formData.keyPoints}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50 min-h-[100px]"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="callToAction" className="text-primary">
            Call-to-Action
          </Label>
          <Input
            id="callToAction"
            name="callToAction"
            placeholder="What action do you want readers to take?"
            value={formData.callToAction}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="targetAudience" className="text-primary">
            Target Audience
          </Label>
          <Input
            id="targetAudience"
            name="targetAudience"
            placeholder="Who is this email newsletter for?"
            value={formData.targetAudience}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg shadow-purple-600/20"
          disabled={isGenerating}
        >
          Generate Email Newsletter
        </Button>
      </motion.div>
    </motion.form>
  )
}

