"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

interface ProductDescriptionFormProps {
  onSubmit: (data: any) => void
  isGenerating: boolean
}

export default function ProductDescriptionForm({ onSubmit, isGenerating }: ProductDescriptionFormProps) {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    keyFeatures: "",
    targetMarket: "",
    uniqueSellingPoints: "",
    tone: "professional",
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
          <Label htmlFor="productName" className="text-primary">
            Product Name
          </Label>
          <Input
            id="productName"
            name="productName"
            placeholder="Enter the name of your product"
            value={formData.productName}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="category" className="text-primary">
            Category
          </Label>
          <Input
            id="category"
            name="category"
            placeholder="What category does your product belong to?"
            value={formData.category}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="keyFeatures" className="text-primary">
            Key Features
          </Label>
          <Textarea
            id="keyFeatures"
            name="keyFeatures"
            placeholder="List the main features of your product"
            value={formData.keyFeatures}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50 min-h-[100px]"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="targetMarket" className="text-primary">
            Target Market
          </Label>
          <Input
            id="targetMarket"
            name="targetMarket"
            placeholder="Who is this product for?"
            value={formData.targetMarket}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="uniqueSellingPoints" className="text-primary">
            Unique Selling Points
          </Label>
          <Textarea
            id="uniqueSellingPoints"
            name="uniqueSellingPoints"
            placeholder="What makes your product stand out from competitors?"
            value={formData.uniqueSellingPoints}
            onChange={handleChange}
            required
            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/50 min-h-[100px]"
          />
        </motion.div>

        <motion.div variants={item}>
          <Label htmlFor="tone" className="text-primary">
            Tone/Style
          </Label>
          <Select value={formData.tone} onValueChange={(value) => handleSelectChange("tone", value)}>
            <SelectTrigger className="bg-background/50 border-white/10 focus:ring-primary/50">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-white/10">
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
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
          Generate Product Description
        </Button>
      </motion.div>
    </motion.form>
  )
}

