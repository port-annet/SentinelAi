from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import init_db, get_db, PromptLog, UserBehavior
from analyzer import analyze_prompt, mask_data
from datetime import datetime

app = FastAPI(title="SentinelAI API", description="AI Risk Monitoring API")

# Setup CORS to allow Chrome Extension and Frontend Dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo purposes. In prod: restrict to specific domains/extension IDs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
@app.on_event("startup")
def on_startup():
    init_db()

class PromptRequest(BaseModel):
    prompt: str
    user_id: str = "anonymous"  # Extracted from JWT token in production

class AnalyzeResponse(BaseModel):
    risk: str
    reason: str
    action: str  # Added for Policy Engine decision

def policy_engine(risk: str, user_id: str, db: Session) -> str:
    """
    Decides what to do based on risk level and behavioral history.
    Tracks user violations across time.
    """
    if risk == "SAFE":
        return "ALLOW"
    
    # Track behavior for WARNING and HIGH risk
    user_profile = db.query(UserBehavior).filter(UserBehavior.user_id == user_id).first()
    
    if not user_profile:
        user_profile = UserBehavior(user_id=user_id, violation_count=0)
        db.add(user_profile)
    
    user_profile.violation_count += 1
    user_profile.last_violation = datetime.utcnow()
    
    # Save the updated violation count before deciding policy
    db.commit()
    db.refresh(user_profile)
    
    # Evaluated Policies based on history + risk
    if risk == "HIGH":
        if user_profile.violation_count >= 3:
            user_profile.escalated = True
            db.commit()
            return "ESCALATE" # Admin notified, stricter block applied
        return "BLOCK"
        
    elif risk == "WARNING":
        if user_profile.violation_count > 5:
            return "ESCALATE"
        return "WARN"
        
    return "ALLOW"

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: PromptRequest, db: Session = Depends(get_db)):
    # 1. Analyze the prompt (Detection)
    result = analyze_prompt(request.prompt)
    risk_level = result["risk"]
    
    # 2. Policy Engine & Behavioral Learning (Decision & Memory)
    action = policy_engine(risk_level, request.user_id, db)
    result["action"] = action
    
    # 3. Mask sensitive data before logging (Privacy)
    masked = mask_data(request.prompt)
    
    # 4. Log to database (Only storing masked data)
    snippet = masked[:100] + "..." if len(masked) > 100 else masked
    log_entry = PromptLog(
        user_id=request.user_id,
        risk_type=risk_level,
        reason=result["reason"],
        masked_snippet=f"[{action}] " + snippet
    )
    db.add(log_entry)
    db.commit()
    
    # 5. Return result
    return result

@app.get("/logs")
def get_logs(limit: int = 50, db: Session = Depends(get_db)):
    # In production, this would be protected by RBAC (Admin/Manager only)
    logs = db.query(PromptLog).order_by(PromptLog.timestamp.desc()).limit(limit).all()
    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "risk_type": log.risk_type,
            "reason": log.reason,
            "masked_snippet": log.masked_snippet,
            "timestamp": log.timestamp.isoformat() if log.timestamp else None
        }
        for log in logs
    ]

@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total = db.query(PromptLog).count()
    high_risk = db.query(PromptLog).filter(PromptLog.risk_type == "HIGH").count()
    active_users = db.query(PromptLog.user_id).distinct().count()
    return {
        "total_prompts": total,
        "high_risk_alerts": high_risk,
        "active_users": active_users
    }
