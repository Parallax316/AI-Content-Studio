import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variables
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

def get_available_models():
    """Get available AI models from OpenRouter"""
    try:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(
            f"{OPENROUTER_BASE_URL}/models",
            headers=headers
        )
        
        if response.status_code == 200:
            models_data = response.json()
            # Filter and format models for frontend
            formatted_models = []
            allowed_models = {
                'openai/gpt-4o-mini': {'name': 'GPT-4', 'provider': 'OpenAI'},
                'anthropic/claude-3-opus': {'name': 'Claude-3-Opus', 'provider': 'Anthropic'},
                'anthropic/claude-3-sonnet': {'name': 'Claude-3-Sonnet', 'provider': 'Anthropic'},
                'google/gemini-pro': {'name': 'Gemini Pro', 'provider': 'Google'}
            }
            
            for model in models_data.get('data', []):
                model_id = model.get('id')
                if model_id in allowed_models:
                    formatted_models.append({
                        'id': model_id,
                        'name': allowed_models[model_id]['name'],
                        'provider': allowed_models[model_id]['provider']
                    })
            return formatted_models
        else:
            print(f"Error fetching models: {response.status_code}")
            # Return only the specified models if API fails
            return [
                { 'id': 'openai/gpt-4o-mini', 'name': 'GPT-4', 'provider': 'OpenAI' },
                { 'id': 'anthropic/claude-3-opus', 'name': 'Claude-3-Opus', 'provider': 'Anthropic' },
                { 'id': 'anthropic/claude-3-sonnet', 'name': 'Claude-3-Sonnet', 'provider': 'Anthropic' },
                { 'id': 'google/gemini-pro', 'name': 'Gemini Pro', 'provider': 'Google' }
            ]
    except Exception as e:
        print(f"Exception in get_available_models: {str(e)}")
        # Return only the specified models if exception occurs
        return [
            { 'id': 'openai/gpt-4o-mini', 'name': 'GPT-4', 'provider': 'OpenAI' },
            { 'id': 'anthropic/claude-3-opus', 'name': 'Claude-3-Opus', 'provider': 'Anthropic' },
            { 'id': 'anthropic/claude-3-sonnet', 'name': 'Claude-3-Sonnet', 'provider': 'Anthropic' },
            { 'id': 'google/gemini-pro', 'name': 'Gemini Pro', 'provider': 'Google' }
        ]

def generate_content(template, form_data, ai_model):
    """Generate content using OpenRouter API"""
    try:
        # Get the prompt template
        prompt_template = template.get('prompt')
        
        # Replace placeholders in the prompt with form data
        prompt = prompt_template
        for key, value in form_data.items():
            if key != 'contentType' and key != 'aiModel':
                placeholder = '{' + key + '}'
                if placeholder in prompt:
                    prompt = prompt.replace(placeholder, str(value))
        
        # Map frontend model name to OpenRouter model ID
        model_id = map_model_name_to_id(ai_model)
        
        # Get content type for formatting
        content_type = form_data.get('contentType', 'blog-post')
        
        # Define formatting instructions based on content type
        formatting_instructions = {
            'blog-post': """You are a professional content creator assistant. Format your response as follows:
1. Use proper Markdown formatting
2. Include a clear title with # heading
3. Use ## for section headings
4. Use bullet points or numbered lists where appropriate
5. Include proper spacing between sections
6. Use bold (**) for emphasis where needed
7. Keep paragraphs concise and well-structured
8. End with a clear conclusion""",
            
            'social-media': """You are a professional social media content creator. Format your response as follows:
1. Use emojis strategically (but don't overuse)
2. Keep paragraphs short and punchy
3. Use line breaks for readability
4. Include relevant hashtags at the end
5. Use bullet points or numbered lists for multiple items
6. Keep the tone engaging and conversational""",
            
            'product-description': """You are an expert copywriter specializing in product descriptions. Format your response as follows:
1. Start with a compelling headline or title incorporating the product name.
2. Write an engaging opening paragraph highlighting the main benefit for the target audience.
3. Use bullet points (using * or -) to list key features and translate them into benefits.
4. Elaborate on unique selling points.
5. Maintain the specified tone throughout.
6. Ensure the description is persuasive and informative.
7. Include a concluding call-to-action.""",
            
            'email-newsletter': """You are a professional email newsletter writer. Format your response as follows:
1. Start with a compelling subject line
2. Use a friendly, professional greeting
3. Break content into clear sections with headers
4. Use bullet points for lists
5. Include clear call-to-action buttons
6. End with a professional signature
7. Include unsubscribe and privacy links at the bottom"""
        }
        
        # Get the appropriate system message
        system_message = formatting_instructions.get(content_type, "You are a professional content creator assistant.")
        
        # Prepare the request to OpenRouter
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Content Genius"  # Replace with your app name
        }
        
        data = {
            "model": model_id,
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ]
        }
        
        # --- Added Logging ---
        print(f"--- Sending Request to OpenRouter ---")
        print(f"URL: {OPENROUTER_BASE_URL}/chat/completions")
        print(f"Model: {model_id}")
        print(f"Headers: {headers}") # Note: Be careful logging headers if they contain sensitive info in other contexts
        print(f"Prompt being sent: {prompt}")
        # --- End Added Logging ---

        response = requests.post(
            f"{OPENROUTER_BASE_URL}/chat/completions",
            headers=headers,
            data=json.dumps(data)
        )

        # --- Added Logging ---
        print(f"--- Received Response from OpenRouter ---")
        print(f"Status Code: {response.status_code}")
        try:
            # Try to print JSON response, fallback to raw text if not JSON
            print(f"Response Body: {response.json()}")
        except json.JSONDecodeError:
            print(f"Response Body (non-JSON): {response.text}")
        # --- End Added Logging ---

        if response.status_code == 200:
            response_data = response.json()
            # Check if 'choices' exists and is a non-empty list
            if 'choices' in response_data and isinstance(response_data['choices'], list) and len(response_data['choices']) > 0:
                content = response_data['choices'][0].get('message', {}).get('content', '')
            else:
                # Handle cases where 'choices' is missing or empty
                content = ''
                print("Warning: 'choices' key missing or empty in OpenRouter response.")

            if not content:
                print("Error: No content found in choices[0].message.content") # More specific log
                return "Error: No content generated from the AI model"
            return content
        else:
            # Existing logging is good here
            print(f"Error generating content (Non-200 Status): {response.status_code}")
            print(response.text) # Already prints the error details from OpenRouter
            return f"Error generating content: {response.status_code} - {response.text}"
    except Exception as e:
        print(f"Exception in generate_content: {str(e)}")
        return f"Error: {str(e)}"

def map_model_name_to_id(model_name):
    """Map frontend model name to OpenRouter model ID"""
    model_mapping = {
        'GPT-4': 'openai/gpt-4o-mini',
        'Claude-3-Opus': 'anthropic/claude-3-opus',
        'Claude-3-Sonnet': 'anthropic/claude-3-sonnet',
        'Gemini Pro': 'google/gemini-pro'
    }
    
    return model_mapping.get(model_name, 'openai/gpt-4o-mini')  # Default to GPT-4 if model not found