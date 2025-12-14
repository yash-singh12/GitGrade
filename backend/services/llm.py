import google.generativeai as genai
import os
import json
from typing import Dict, Any

class GeminiClient:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-flash-latest')

    async def analyze_repo(self, prompt: str) -> Dict[str, Any]:


        try:
            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    response_mime_type="application/json"
                )
            )
            return json.loads(response.text)
        except Exception as e:
            print(f"LLM Error: {e}")
            return {
                "score": 0,
                "summary": f"Error analyzing repository: {str(e)}",
                "roadmap": ["Check API Key", "Check Repository Access"],
                "metrics": {}
            }

