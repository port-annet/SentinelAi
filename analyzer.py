import os
import re
from openai import OpenAI
import json

# Initialize OpenAI client
# It will use OPENAI_API_KEY from environment
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None

def mask_data(text: str) -> str:
    """Mask sensitive data in the text to ensure privacy."""
    # Mask simple keywords like password
    text = re.sub(r'(?i)password\s*[:=]\s*\S+', 'password=********', text)
    # Mask API keys, SSNs, credit cards (simplified for demo)
    text = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', 'XXX-XX-XXXX', text)
    text = text.replace("password", "********")
    return text

def analyze_prompt(text: str) -> dict:
    """Analyze the prompt for sensitive data or risks."""
    # 1. Rule-based checks (fast and local)
    lower_text = text.lower()
    if "password" in lower_text or "secret_key" in lower_text:
        return {"risk": "HIGH", "reason": "Contains sensitive keywords (password/secret_key)"}
    
    if "internal structure" in lower_text or "database schema" in lower_text:
        return {"risk": "WARNING", "reason": "Potential exposure of internal infrastructure"}

    # 2. AI-based classification (if API key is available)
    if client:
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a data privacy expert. Classify the risk level of the following user prompt being sent to an AI tool. Return ONLY a JSON object with two keys: 'risk' (values: 'SAFE', 'WARNING', 'HIGH') and 'reason' (a short explanation)."},
                    {"role": "user", "content": text}
                ],
                response_format={ "type": "json_object" }
            )
            result = json.loads(response.choices[0].message.content)
            return {
                "risk": result.get("risk", "WARNING"),
                "reason": result.get("reason", "AI Classification")
            }
        except Exception as e:
            # Fallback if OpenAI fails
            return {"risk": "WARNING", "reason": f"AI analysis failed: {str(e)}"}
    
    # 3. Default fallback if no API key
    return {"risk": "SAFE", "reason": "No sensitive data detected locally"}
