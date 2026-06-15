from fastapi import status
from fastapi import HTTPException
import json
from fastapi.encoders import jsonable_encoder
from db import SessionDep
from services import BillingService, Claude
from fastapi import APIRouter

router = APIRouter(prefix="/billing", tags=["billing"])


@router.post("/identify-discrepancies")
async def identify_discrepancies(db: SessionDep, client_rules: str):
    data = BillingService.run_billing_audit(db)

    json_compatible_data = jsonable_encoder(data)
    audit_json_str = json.dumps(json_compatible_data, indent=2)

    claude_client = Claude()

    try:
        ai_analysis = await claude_client.create_message(audit_json_str, client_rules)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service is currently unavailable. Please try again later",
        )

    return {"data": data, "analysis": ai_analysis}
