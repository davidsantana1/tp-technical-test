from db import SessionDep
from services import BillingService
from fastapi import APIRouter

router = APIRouter(prefix="/billing", tags=["billing"])


@router.post("/identify-discrepancies")
async def identify_discrepancies(db: SessionDep):
    data = BillingService.run_billing_audit(db)
    return {"data": data}
