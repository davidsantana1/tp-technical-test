from pydantic import BaseModel, Field


class ContractColumnMapping(BaseModel):
    """
    The expected column names in the CSV file for the contract table.
    """

    project: str = Field(description="CSV column name for Project")
    rate_per_hour: str = Field(description="CSV column name for Rate Per Hour")
    max_hours_per_week: str = Field(
        description="CSV column name for Max Hours Per Week"
    )
