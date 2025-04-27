import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Supabase credentials from environment variables
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_all_templates():
    """Get all available templates from Supabase"""
    try:
        response = supabase.table('templates').select('*').execute()
        return response.data
    except Exception as e:
        print(f"Error fetching templates: {str(e)}")
        # Return some default templates if database call fails
        return [
            {
                'id': 'blog-post',
                'name': 'Blog Post',
                'description': 'Generate a blog post on any topic',
                'prompt': 'Write a blog post about {topic}. The target audience is {audience}. The tone should be {tone}. The blog post should be around {length} words.',
                'form_fields': ['topic', 'audience', 'tone', 'length']
            },
            {
                'id': 'social-media',
                'name': 'Social Media Post',
                'description': 'Create engaging social media content',
                'prompt': 'Create a {platform} post about {topic}. The goal is to {goal}. The tone should be {tone}.',
                'form_fields': ['platform', 'topic', 'goal', 'tone']
            }
        ]

def get_template(template_name):
    """Get a specific template by name"""
    try:
        response = supabase.table('templates').select('*').eq('id', template_name).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        else:
            # If template not found, return a default template
            default_templates = {
                'blog-post': {
                    'id': 'blog-post',
                    'name': 'Blog Post',
                    'description': 'Generate a blog post on any topic',
                    'prompt': 'Write a blog post about {topic}. The target audience is {audience}. The tone should be {tone}. The blog post should be around {length} words.',
                    'form_fields': ['topic', 'audience', 'tone', 'length']
                },
                'social-media': {
                    'id': 'social-media',
                    'name': 'Social Media Post',
                    'description': 'Create engaging social media content',
                    'prompt': 'Create a {platform} post about {topic}. The goal is to {goal}. The tone should be {tone}.',
                    'form_fields': ['platform', 'topic', 'goal', 'tone']
                }
            }
            return default_templates.get(template_name)
    except Exception as e:
        print(f"Error fetching template: {str(e)}")
        return None