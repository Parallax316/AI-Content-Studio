"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

interface BlogPostFormProps {
  onSubmit: (data: any) => void
  isGenerating: boolean
}

export default function BlogPostForm({ onSubmit, isGenerating }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    targetAudience: "",
    tone: "informative",
    wordCount: "800",
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
          <Label htmlFor="title" className="text-primary">
            Blog Post Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter a title for your blog post"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="topic" className="text-primary">
            Topic/Keywords
          </Label>
          <Textarea
            id="topic"
            name="topic"
            placeholder="Enter the main topic and keywords"
            value={formData.topic}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50 min-h-[100px]"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="targetAudience" className="text-primary">
            Target Audience
          </Label>
          <Input
            id="targetAudience"
            name="targetAudience"
            placeholder="Who is this blog post for?"
            value={formData.targetAudience}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="tone" className="text-primary">
            Tone
          </Label>
          <Select value={formData.tone} onValueChange={(value) => handleSelectChange("tone", value)}>
            <SelectTrigger className="bg-background/50 border-white/10 focus:ring-primary/50">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-white/10">
              <SelectItem value="informative">Informative</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="humorous">Humorous</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="wordCount" className="text-primary">
            Word Count
          </Label>
          <Select value={formData.wordCount} onValueChange={(value) => handleSelectChange("wordCount", value)}>
            <SelectTrigger className="bg-background/50 border-white/10 focus:ring-primary/50">
              <SelectValue placeholder="Select word count" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-white/10">
              <SelectItem value="500">Short (~500 words)</SelectItem>
              <SelectItem value="800">Medium (~800 words)</SelectItem>
              <SelectItem value="1200">Long (~1200 words)</SelectItem>
              <SelectItem value="2000">Comprehensive (~2000 words)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg shadow-purple-600/20"
          disabled={isGenerating}
        >
          Generate Blog Post
        </Button>
      </motion.div>
    </motion.form>
  )
}

