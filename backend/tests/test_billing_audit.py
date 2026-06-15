from helpers import BillingAudit
from models import Billing, Contract, Timesheet


def make_audit(*, rate_per_hour=20.0, max_hours_per_week=40, hours_worked=40, hours_billed=40, rate_charged=20):
    contract = Contract(project="A", rate_per_hour=rate_per_hour, max_hours_per_week=max_hours_per_week)
    timesheet = Timesheet(employee_id=1, employee_name="Alice", project="A", hours_worked=hours_worked)
    billing = Billing(employee_id=1, project="A", hours_billed=hours_billed, rate_charged=rate_charged)
    return BillingAudit(contract, timesheet, billing)


def test_no_discrepancies_when_everything_matches():
    audit = make_audit()
    assert audit.has_discrepancies() is False


def test_flags_rate_mismatch():
    audit = make_audit(rate_charged=25)
    assert audit.is_rate_per_hour_correct() is False
    assert audit.has_discrepancies() is True


def test_flags_hour_mismatch():
    audit = make_audit(hours_billed=35)
    assert audit.is_hour_mismatch() is True
    assert audit.has_discrepancies() is True


def test_flags_contract_violation():
    audit = make_audit(hours_worked=45, hours_billed=45, max_hours_per_week=40)
    assert audit.is_contract_violation() is True
    assert audit.has_discrepancies() is True


def test_calculates_expected_billing():
    audit = make_audit(rate_per_hour=20.0, hours_worked=40)
    assert audit.calculate_expected_billing() == 800.0
