// API client for interacting with the Flask backend

export async function fetchTemplates() {
  try {
    const response = await fetch("http://localhost:5000/api/templates")
    const data = await response.json()

    if (data.success) {
      return data.templates
    } else {
      throw new Error(data.error || "Failed to fetch templates")
    }
  } catch (error) {
    console.error("Error fetching templates:", error)
    throw error
  }
}

export async function fetchModels() {
  try {
    const response = await fetch("http://localhost:5000/api/models")
    const data = await response.json()

    if (data.success) {
      return data.models
    } else {
      throw new Error(data.error || "Failed to fetch models")
    }
  } catch (error) {
    console.error("Error fetching models:", error)
    throw error
  }
}

export async function generateContent(formData: any) {
  try {
    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (data.success) {
      return data.content
    } else {
      throw new Error(data.error || "Failed to generate content")
    }
  } catch (error) {
    console.error("Error generating content:", error)
    throw error
  }
}

