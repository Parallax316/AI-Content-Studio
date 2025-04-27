"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import BlogPostForm from "@/components/forms/blog-post-form"
import SocialMediaForm from "@/components/forms/social-media-form"
import ProductDescriptionForm from "@/components/forms/product-description-form"
import EmailNewsletterForm from "@/components/forms/email-newsletter-form"
import GeneratedContent from "@/components/generated-content"
import { useToast } from "@/hooks/use-toast"
import { fetchModels } from "@/lib/api"
import { useRouter } from "next/navigation"

export type ModelType = {
  id: string
  name: string
  provider: string
}

export default function GeneratePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("blog-post")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [models, setModels] = useState<ModelType[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("GPT-4")
  const { toast } = useToast()

  useEffect(() => {
    const getModels = async () => {
      try {
        const modelData = await fetchModels()
        if (modelData && modelData.length > 0) {
          setModels(modelData)
        }
      } catch (error) {
        console.error("Failed to fetch models:", error)
        toast({
          title: "Error",
          description: "Failed to load AI models. Using default models instead.",
          variant: "destructive",
        })
      }
    }

    getModels()
  }, [toast])

  const handleGenerate = async (formData: any) => {
    setIsGenerating(true)
    setGeneratedContent(null)

    try {
      let data
      const requestBody = {
        ...formData,
        contentType: activeTab,
        aiModel: selectedModel,
      }

      console.log("--- Preparing to send request to /api/generate ---");
      console.log("Request URL:", "/api/generate");
      console.log("Request Method:", "POST");
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        // Check if response is JSON
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Backend returned non-JSON response. Server might be unavailable.")
        }

        data = await response.json()
      } catch (error) {
        console.error("API error:", error)
        toast({
          title: "Connection Error",
          description: "Failed to connect to the AI service. Please make sure the backend server is running.",
          variant: "destructive",
        })
        return
      }

      if (data.success) {
        setGeneratedContent(data.content)
        toast({
          title: "Success",
          description: "Content generated successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to generate content",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate content",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>AI-Powered Content Generator</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            Generate <span className="gradient-text">Content</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Select a template and fill in the details to generate high-quality content
          </p>
        </motion.div>

        {generatedContent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GeneratedContent content={generatedContent} />
            <Button
              className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
              onClick={() => setGeneratedContent(null)}
            >
              Create New Content
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="glass-effect border border-white/10 shadow-xl shadow-purple-600/5">
              <CardContent className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-primary">Select AI Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-3 rounded-md border border-white/10 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  >
                    {models.length > 0 ? (
                      models.map((model) => (
                        <option key={model.id} value={model.name}>
                          {model.name} ({model.provider})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="GPT-4">GPT-4 (OpenAI)</option>
                        <option value="Claude-3-Opus">Claude-3-Opus (Anthropic)</option>
                        <option value="Claude-3-Sonnet">Claude-3-Sonnet (Anthropic)</option>
                        <option value="Gemini Pro">Gemini Pro (Google)</option>
                      </>
                    )}
                  </select>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 w-full bg-background/50 p-1 rounded-lg">
                    <TabsTrigger
                      value="blog-post"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Blog Post
                    </TabsTrigger>
                    <TabsTrigger
                      value="social-media"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Social Media
                    </TabsTrigger>
                    <TabsTrigger
                      value="amazon-product"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Product
                    </TabsTrigger>
                    <TabsTrigger
                      value="email-newsletter"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Email
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="blog-post">
                    <BlogPostForm onSubmit={handleGenerate} isGenerating={isGenerating} />
                  </TabsContent>

                  <TabsContent value="social-media">
                    <SocialMediaForm onSubmit={handleGenerate} isGenerating={isGenerating} />
                  </TabsContent>

                  <TabsContent value="amazon-product">
                    <ProductDescriptionForm onSubmit={handleGenerate} isGenerating={isGenerating} />
                  </TabsContent>

                  <TabsContent value="email-newsletter">
                    <EmailNewsletterForm onSubmit={handleGenerate} isGenerating={isGenerating} />
                  </TabsContent>
                </Tabs>

                {isGenerating && (
                  <div className="flex justify-center items-center mt-8">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse absolute inset-0"></div>
                      <Loader2 className="h-16 w-16 animate-spin text-primary relative z-10" />
                    </div>
                    <p className="ml-4 text-xl text-muted-foreground">Generating your content...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

