from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from services.ai_service import generate_content
from services.supabase_service import get_template

app = Flask(__name__)
CORS(app)

@app.route('/api/templates', methods=['GET'])
def get_templates():
    """Get all available templates"""
    try:
        from services.supabase_service import get_all_templates
        templates = get_all_templates()
        return jsonify({
            'success': True,
            'templates': templates
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/generate', methods=['POST'])
def generate():
    """Generate content based on template and user inputs"""
    try:
        data = request.json
        template_name = data.get('contentType')
        ai_model = data.get('aiModel')
        form_data = data
        
        # Get template from Supabase
        template = get_template(template_name)
        if not template:
            return jsonify({
                'success': False,
                'error': f'Template {template_name} not found'
            }), 404
        
        # Generate content using AI service
        content = generate_content(template, form_data, ai_model)
        
        return jsonify({
            'success': True,
            'content': content
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/models', methods=['GET'])
def get_models():
    """Get available AI models from OpenRouter"""
    try:
        from services.ai_service import get_available_models
        models = get_available_models()
        return jsonify({
            'success': True,
            'models': models
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)