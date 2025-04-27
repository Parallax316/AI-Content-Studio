"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, Check, Edit, RefreshCw, Share2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface GeneratedContentProps {
  content: string
}

export default function GeneratedContent({ content }: GeneratedContentProps) {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const { toast } = useToast()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedContent)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([editedContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "generated-content.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Content downloaded as text file",
    })
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      toast({
        title: "Editing mode",
        description: "You can now edit your generated content",
      })
    } else {
      toast({
        title: "Changes saved",
        description: "Your edits have been applied",
      })
    }
  }

  // Define components for ReactMarkdown
  const components: Components = {
    h1: ({ node, ...props }) => <h1 className="markdown-content h1" {...props} />,
    h2: ({ node, ...props }) => <h2 className="markdown-content h2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="markdown-content h3" {...props} />,
    p: ({ node, ...props }) => <p className="markdown-content p" {...props} />,
    ul: ({ node, ...props }) => <ul className="markdown-content ul" {...props} />,
    ol: ({ node, ...props }) => <ol className="markdown-content ol" {...props} />,
    li: ({ node, ...props }) => <li className="markdown-content li" {...props} />,
    code: ({ node, ...props }) => <code className="markdown-content code" {...props} />,
    pre: ({ node, ...props }) => <pre className="markdown-content pre" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="markdown-content blockquote" {...props} />,
    a: ({ node, ...props }) => <a className="markdown-content a" {...props} />,
    strong: ({ node, ...props }) => <strong className="markdown-content strong" {...props} />,
    em: ({ node, ...props }) => <em className="markdown-content em" {...props} />,
    table: ({ node, ...props }) => <table className="markdown-content table" {...props} />,
    th: ({ node, ...props }) => <th className="markdown-content th" {...props} />,
    td: ({ node, ...props }) => <td className="markdown-content td" {...props} />,
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="glass-effect border border-white/10 shadow-xl shadow-purple-600/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold gradient-text">Generated Content</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="border-white/10 hover:bg-primary/10 hover:text-primary"
              >
                {isEditing ? <Check className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? "Save" : "Edit"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-white/10 hover:bg-primary/10 hover:text-primary"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="border-white/10 hover:bg-primary/10 hover:text-primary"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="border-white/10 hover:bg-primary/10 hover:text-primary">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-white/10 hover:bg-primary/10 hover:text-primary">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="mb-4 bg-background/50 p-1 rounded-lg">
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="raw"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Raw Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <div className="bg-background/30 backdrop-blur-sm rounded-md p-6 max-h-[600px] overflow-y-auto border border-white/10">
                {isEditing ? (
                  <textarea
                    className="w-full h-[500px] bg-background/50 border border-white/10 rounded-md p-4 focus:border-primary/50 focus:ring-primary/50"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                      {editedContent}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="raw">
              <div className="bg-background/30 backdrop-blur-sm rounded-md p-6 max-h-[600px] overflow-y-auto border border-white/10">
                <pre className="whitespace-pre-wrap">{editedContent}</pre>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Word count: {editedContent.split(/\s+/).filter(Boolean).length}
            </div>
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-primary/10 hover:text-primary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

