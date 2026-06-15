from sqlmodel import Session, select
from helpers import BillingAudit
from constants import BillingStatus
from models import Billing, Contract, Timesheet


FormattedAuditDataset = list[tuple[Timesheet, Billing, Contract]]


class BillingService:
    @staticmethod
    def run_billing_audit(db: Session) -> FormattedAuditDataset:
        stmt = (
            select(Timesheet, Billing, Contract)
            .join(
                Billing,
                (Timesheet.employee_id == Billing.employee_id)
                & (Timesheet.project == Billing.project),
            )
            .join(Contract, Timesheet.project == Contract.project)
        )

        results = db.exec(stmt).all()

        return BillingService._format_audit_dataset(results)

    @staticmethod
    def _format_audit_dataset(results: FormattedAuditDataset):
        output_dataset = []

        for timesheet, billing, contract in results:
            auditor = BillingAudit(contract, timesheet, billing)
            status = (
                BillingStatus.ERROR if auditor.has_discrepancies() else BillingStatus.OK
            )
            output_dataset.append(
                {
                    "timesheet": timesheet,
                    "billing": billing,
                    "contract": contract,
                    "status": status,
                }
            )

        return output_dataset
