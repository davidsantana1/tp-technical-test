from pydantic import BaseModel, Field


class BillingColumnMapping(BaseModel):
    """
    The expected column names in the CSV file for the billing table.
    """

    employee_id: str = Field(description="CSV column name for Employee ID")
    project: str = Field(description="CSV column name for Project")
    hours_billed: str = Field(description="CSV column name for Hours Billed")
    rate_charged: str = Field(description="CSV column name for Rate Charged")
