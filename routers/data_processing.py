from services import DatabaseService
from models import Billing, Timesheet, Contract
from schemas import BillingColumnMapping, TimesheetColumnMapping, ContractColumnMapping
from db import SessionDep
from fastapi import UploadFile, Depends, APIRouter

router = APIRouter(prefix="/data-processing", tags=["data-processing"])


@router.post("/load-billing")
async def load_billing(
    file: UploadFile, db: SessionDep, headers: BillingColumnMapping = Depends()
):
    loaded_csv = await DatabaseService.load_csv(file, db, headers, Billing)
    return {"data": loaded_csv}


@router.post("/load-timesheet")
async def load_timesheet(
    file: UploadFile, db: SessionDep, headers: TimesheetColumnMapping = Depends()
):
    loaded_csv = await DatabaseService.load_csv(file, db, headers, Timesheet)
    return {"data": loaded_csv}


@router.post("/load-contract")
async def load_contract(
    file: UploadFile, db: SessionDep, headers: ContractColumnMapping = Depends()
):
    loaded_csv = await DatabaseService.load_csv(file, db, headers, Contract)
    return {"data": loaded_csv}
