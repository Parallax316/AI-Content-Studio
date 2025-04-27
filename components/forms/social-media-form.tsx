"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

interface SocialMediaFormProps {
  onSubmit: (data: any) => void
  isGenerating: boolean
}

export default function SocialMediaForm({ onSubmit, isGenerating }: SocialMediaFormProps) {
  const [formData, setFormData] = useState({
    platform: "instagram",
    postType: "regular",
    topic: "",
    hashtags: "",
    mediaRequirements: "",
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
          <Label htmlFor="platform" className="text-primary">
            Platform
          </Label>
          <Select value={formData.platform} onValueChange={(value) => handleSelectChange("platform", value)}>
            <SelectTrigger className="bg-background/50 border-white/10 focus:ring-primary/50">
              <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-white/10">
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter/X</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="postType" className="text-primary">
            Post Type
          </Label>
          <Select value={formData.postType} onValueChange={(value) => handleSelectChange("postType", value)}>
            <SelectTrigger className="bg-background/50 border-white/10 focus:ring-primary/50">
              <SelectValue placeholder="Select post type" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-white/10">
              <SelectItem value="regular">Regular Post</SelectItem>
              <SelectItem value="thread">Thread</SelectItem>
              <SelectItem value="carousel">Carousel</SelectItem>
              <SelectItem value="story">Story</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="topic" className="text-primary">
            Topic/Theme
          </Label>
          <Textarea
            id="topic"
            name="topic"
            placeholder="What is your post about?"
            value={formData.topic}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50 min-h-[100px]"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="hashtags" className="text-primary">
            Hashtag Preferences
          </Label>
          <Input
            id="hashtags"
            name="hashtags"
            placeholder="Enter hashtag preferences (e.g., trending, niche, etc.)"
            value={formData.hashtags}
            onChange={handleChange}
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="mediaRequirements" className="text-primary">
            Media Requirements
          </Label>
          <Textarea
            id="mediaRequirements"
            name="mediaRequirements"
            placeholder="Describe any media that should accompany the post"
            value={formData.mediaRequirements}
            onChange={handleChange}
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
          Generate Social Media Post
        </Button>
      </motion.div>
    </motion.form>
  )
}

