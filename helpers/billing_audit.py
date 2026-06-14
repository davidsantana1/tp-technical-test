"""Helper utilities for validating timesheets, rates, and contracts to identify billing discrepancies."""

import math
from models import Timesheet, Billing, Contract


class BillingAudit:
    def __init__(self, contract: Contract, timesheet: Timesheet, billing: Billing):
        self.contract = contract
        self.timesheet = timesheet
        self.billing = billing

    def calculate_expected_billing(self) -> float:
        return self.contract.rate_per_hour * self.timesheet.hours_worked

    def is_billing_correct(self) -> bool:
        actual_billing = self.billing.rate_charged * self.billing.hours_billed
        return math.isclose(self.calculate_expected_billing(), actual_billing)

    def is_rate_per_hour_correct(self) -> bool:
        return math.isclose(self.contract.rate_per_hour, self.billing.rate_charged)

    def is_hour_mismatch(self) -> bool:
        return not math.isclose(self.billing.hours_billed, self.timesheet.hours_worked)

    def is_contract_violation(self) -> bool:
        return self.contract.max_hours_per_week < self.timesheet.hours_worked

    def has_discrepancies(self) -> bool:
        """Returns True if there are any mismatches in rates, billing totals, hours, or contract limits."""
        return (
            not self.is_billing_correct()
            or not self.is_rate_per_hour_correct()
            or self.is_hour_mismatch()
            or self.is_contract_violation()
        )
