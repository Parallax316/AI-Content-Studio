# AI-Content Studio


A full-stack web application designed to streamline content creation by leveraging multiple cutting-edge AI models. Users can select various content types, provide specific keywords and parameters, choose their preferred AI model, and generate high-quality content tailored to their needs in seconds.





---

## Features

*   **Diverse Content Generation:** Create various content types including:
    *   Blog Posts
    *   Social Media Posts (Instagram, Twitter/X, LinkedIn, etc.)
    *   (Amazon) Product Descriptions
    *   Email Newsletters
    *   SEO-Optimized Articles
*   **Multi-Model AI Selection:** Choose from leading AI models like GPT-4, Claude 3 (Opus/Sonnet), and Gemini Pro, powered by OpenRouter.
*   **Dynamic Prompt Engineering:** Utilizes pre-defined templates stored in Supabase, dynamically populated with user inputs for tailored AI instructions.
*   **Customizable Inputs:** Each content type features specific input fields (e.g., topic, keywords, target audience, tone, word count) for precise content generation.
*   **Sleek User Interface:** Modern, responsive frontend built with Next.js, Tailwind CSS, and Shadcn UI. Includes engaging animations with Framer Motion.
*   **Backend API:** Dedicated Flask backend handles AI interactions, database operations, and business logic.

---

## Tech Stack

*   **Frontend:**
    *   Next.js (React Framework)
    *   TypeScript
    *   Tailwind CSS
    *   Shadcn UI (Component Library)
    *   Framer Motion (Animations)
*   **Backend:**
    *   Python
    *   Flask (Microframework)
    *   Flask-CORS
*   **Database:**
    *   Supabase (PostgreSQL)
*   **AI Integration:**
    *   OpenRouter API

---

## Key Technical Highlights (Recruiter Focus)

This project demonstrates proficiency in full-stack development with a particular emphasis on robust backend architecture and third-party API integration.

1.  **Multi-Model AI Integration via OpenRouter:**
    *   The Flask backend seamlessly integrates with the OpenRouter API, acting as a unified gateway to various large language models (LLMs) like GPT-4, Claude 3, and Gemini Pro.
    *   This allows users to select the most suitable AI model for their specific task directly from the frontend.
    *   The backend handles API key management securely and maps user-friendly model names to the appropriate OpenRouter model IDs.

2.  **Dynamic Prompt Engineering with Supabase:**
    *   Leverages Supabase (PostgreSQL) to store and manage a library of pre-defined prompt templates. Each template corresponds to a specific content type (`blog-post`, `amazon-product`, etc.).
    *   When a user initiates content generation, the Flask backend dynamically fetches the relevant template from Supabase based on the selected `contentType`.
    *   User-provided data (keywords, tone, etc.) is then programmatically injected into the fetched template's placeholders (`{topic}`, `{tone}`, etc.).
    *   Crucially, tailored **system prompts** are also constructed based on the `contentType` to provide the AI with specific formatting instructions and persona guidance (e.g., "You are an expert copywriter specializing in product descriptions...").
    *   This database-driven approach allows for easy modification, addition, or A/B testing of prompts and content types **without requiring backend code changes**, enhancing maintainability and scalability.

3.  **Decoupled Backend API (Flask):**
    *   A dedicated Flask API serves as the intermediary between the Next.js frontend and external services (Supabase, OpenRouter).
    *   This separation of concerns enhances security (API keys are never exposed to the frontend) and modularity.
    *   The Flask API handles:
        *   Receiving user requests from the frontend.
        *   Fetching prompt templates from Supabase.
        *   Constructing the final, populated prompts.
        *   Calling the selected AI model via OpenRouter.
        *   Processing the AI's response.
        *   Returning the generated content to the frontend.

4.  **Full-Stack Communication:**
    *   Demonstrates clear communication patterns between a React/Next.js frontend and a Python/Flask backend via RESTful API principles.
    *   Handles asynchronous operations effectively on both client and server sides.

---

## Getting Started (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Set up Environment Variables:**
    *   Create a `.env` file in the root directory.
    *   Add your API keys and Supabase credentials (see `.env.example` or list below).

3.  **Install Frontend Dependencies:**
    ```bash
    npm install
    # or yarn install or pnpm install
    ```

4.  **Install Backend Dependencies:**
    *   Navigate to the directory containing `app.py` (if separate, otherwise stay in root).
    *   It's recommended to use a virtual environment:
        ```bash
        python -m venv venv
        source venv/bin/activate # On Windows use `venv\Scripts\activate`
        ```
    *   Install Python packages:
        ```bash
        pip install -r requirements.txt
        ```

5.  **Run the Backend Server:**
    ```bash
    # Ensure your virtual environment is activated
    python app.py
    ```
    The backend should start, typically on `http://localhost:5000`.

6.  **Run the Frontend Development Server:**
    ```bash
    npm run dev
    # or yarn dev or pnpm dev
    ```
    The frontend should start, typically on `http://localhost:3000`.

7.  Open `http://localhost:3000` in your browser.

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# For Flask Backend (app.py / services)
OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
# If using service role key for writes/management in backend:
# SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# Next.js might not need backend keys directly if all calls go via its API routes,
# but if you fetch Supabase data directly on client/server components:
# NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

*(Note: Adjust Supabase key usage based on whether your `supabase_service.py` uses the anon key or a service role key)*

---

## Supabase Setup

To get the backend running correctly, you need to set up the necessary tables and optionally populate them with initial data in your Supabase project.

1.  Navigate to the **SQL Editor** in your Supabase dashboard.
2.  Run the following queries:

### Table Creation

```sql
-- Create content_types table (if it doesn't exist)
-- Stores the different categories of content the app can generate.
CREATE TABLE IF NOT EXISTS content_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL, -- Internal identifier (e.g., 'blog-post', 'amazon-product')
  display_name TEXT NOT NULL, -- User-facing name (e.g., 'Blog Post', 'Product Description')
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create templates table (if it doesn't exist)
-- Stores the prompt templates used for AI generation.
CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY, -- Using the text identifier like 'blog-post', 'amazon-product' as primary key
  content_type_name TEXT REFERENCES content_types(name) ON DELETE SET NULL, -- Optional link back to content_types using the 'name'
  name TEXT NOT NULL, -- A descriptive name for the template (e.g., 'Standard Blog Post')
  prompt TEXT NOT NULL, -- The template string with placeholders like {keyword}
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Function to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Optional: Trigger to update 'updated_at' on template changes
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON templates
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Enable Row Level Security (Recommended)
-- Make sure to define appropriate policies based on your needs!
ALTER TABLE content_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Example Policies (Allow public read access - ADJUST AS NEEDED!)
CREATE POLICY "Allow public read access to content types" ON content_types
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to active templates" ON templates
  FOR SELECT USING (is_active = true);

-- Add policies for INSERT/UPDATE/DELETE based on user roles (e.g., service_role or authenticated users)
-- Example: Allow service_role full access
CREATE POLICY "Allow full access for service_role on content types" ON content_types
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow full access for service_role on templates" ON templates
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
```

*Note: The schema above uses the text identifier (like `amazon-product`) as the primary key for the `templates` table, matching your existing structure. Ensure your `supabase_service.py` fetches templates based on this ID.* 

### Sample Data Insertion

Run these queries in the Supabase SQL Editor to add the basic content types and corresponding prompt templates:

```sql
-- Insert Content Types (Run only if table is empty)
INSERT INTO content_types (name, display_name, description) VALUES
('blog-post', 'Blog Post', 'Generate full blog articles.'),
('social-media', 'Social Media Post', 'Create posts for various social platforms.'),
('amazon-product', 'Product Description', 'Write compelling descriptions for products.'),
('email-newsletter', 'Email Newsletter', 'Draft email newsletters for subscribers.'),
('seo-content', 'SEO Article', 'Generate SEO-optimized articles.')
ON CONFLICT (name) DO NOTHING; -- Avoid errors if types already exist

-- Insert Sample Templates (Adjust prompts as needed)
-- Ensure the 'id' matches the 'name' from content_types and the 'value' used in frontend tabs

INSERT INTO templates (id, content_type_name, name, prompt, is_active)
VALUES
('blog-post', 'blog-post', 'Standard Blog Post', E'Generate a blog post based on the following details:\n\n- Title Idea: {title}\n- Main Topic/Keywords: {topic}\n- Target Audience: {targetAudience}\n- Desired Tone: {tone}\n- Approximate Word Count: {wordCount}\n\nStructure the post with an engaging introduction, several well-developed sections covering the topic, and a concluding summary. Ensure the tone is appropriate for the target audience.', true),

('social-media', 'social-media', 'Standard Social Media Post', E'Create a social media post for the {platform} platform.\n\n- Post Type: {postType}\n- Topic/Theme: {topic}\n- Hashtag Preferences: {hashtags}\n- Media Requirements/Suggestions: {mediaRequirements}\n\nCraft the content to be engaging for {platform}, incorporating relevant hashtags and considering the specified media requirements. If it''s a thread or carousel, outline the content for each part.', true),

('amazon-product', 'amazon-product', 'Amazon Product Description', E'Generate a compelling product description for Amazon based on these details:\n\n- Product Name: {productName}\n- Product Category: {category}\n- Key Features: {keyFeatures}\n- Unique Selling Points: {uniqueSellingPoints}\n- Target Market: {targetMarket}\n- Desired Tone: {tone}\n\nStructure the description with:\n1. An engaging title and opening paragraph highlighting the main benefit.\n2. Bullet points detailing key features and their benefits.\n3. A section elaborating on unique selling points.\n4. Language tailored to the {targetMarket} with a {tone} tone.\n5. A concluding call-to-action.', true),

('email-newsletter', 'email-newsletter', 'Standard Email Newsletter', E'Draft an email newsletter with the following specifications:\n\n- Subject Line: {subject}\n- Purpose of Email: {purpose}\n- Key Message Points: {keyPoints}\n- Call-to-Action: {callToAction}\n- Target Audience: {targetAudience}\n\nStructure the email with a clear subject, an engaging opening, detailed explanation of the key points, and a strong call-to-action. Ensure the content and tone are suitable for the {targetAudience} and the email''s {purpose}.', true),

('seo-content', 'seo-content', 'Standard SEO Article', E'Generate an SEO-optimized article with the following details:\n\n- Primary Topic: {topic}\n- Target Keywords: {keywords}\n- Target Audience: {targetAudience}\n- Approximate Word Count: {wordCount}\n- Desired Tone: {tone}\n\nStructure the article for SEO best practices:\n1. Include target keywords naturally throughout the text.\n2. Use clear H1, H2, and H3 headings.\n3. Incorporate internal/external linking suggestions if applicable.\n4. Ensure content is valuable and informative for the {targetAudience}.\n5. Optionally include a brief meta description and an FAQ section related to the {topic}.', true)

ON CONFLICT (id) DO UPDATE SET
  content_type_name = EXCLUDED.content_type_name,
  name = EXCLUDED.name,
  prompt = EXCLUDED.prompt,
  is_active = EXCLUDED.is_active,
  updated_at = timezone('utc'::text, now()); -- Update timestamp if record exists

```

---

## Future Improvements

*   User authentication (Supabase Auth) to save generation history.
*   More sophisticated prompt chaining or workflows.
*   Ability for users to create and save custom templates.
*   Integration with plagiarism checkers.

---

## Author

*   **Simarpreet Singh**
*   [Link to your Portfolio/Website]
*   [Link to your LinkedIn profile]
*   [Link to your GitHub profile]

---

