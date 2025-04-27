"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import GeneratedContent from "@/components/generated-content"
import { getSampleContent } from "@/lib/sample-content"

export default function ResponsePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [content, setContent] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [contentType, setContentType] = useState<string>("blog-post")

  useEffect(() => {
    const error = searchParams.get("error") === "true"
    const type = searchParams.get("type") || "blog-post"

    setIsError(error)
    setContentType(type)

    // Get sample content based on the content type
    const sampleContent = getSampleContent(type)
    setContent(sampleContent)
    setIsLoading(false)
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Button variant="ghost" className="mb-6 hover:bg-background/50" onClick={() => router.push("/generate")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Generator
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            {isError ? (
              <span className="text-red-500">Backend Connection Error</span>
            ) : (
              <span>
                Generated <span className="gradient-text">Content</span>
              </span>
            )}
          </h1>

          {isError && (
            <div className="flex items-center justify-center mb-4 text-amber-500">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p>We couldn't connect to the backend service. Showing sample content instead.</p>
            </div>
          )}

          {!isError && (
            <div className="flex items-center justify-center mb-4 text-green-500">
              <CheckCircle className="h-5 w-5 mr-2" />
              <p>Content successfully generated!</p>
            </div>
          )}
        </motion.div>

        {isLoading ? (
          <Card className="glass-effect border border-white/10">
            <CardContent className="p-6 flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        ) : (
          <GeneratedContent content={content} />
        )}
      </div>
    </div>
  )
}

