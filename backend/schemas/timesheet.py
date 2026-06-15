from pydantic import BaseModel, Field


class TimesheetColumnMapping(BaseModel):
    """
    The expected column names in the CSV file for the timesheet table.
    """

    employee_id: str = Field(description="CSV column name for Employee ID")
    employee_name: str = Field(description="CSV column name for Employee Name")
    project: str = Field(description="CSV column name for Project")
    hours_worked: str = Field(description="CSV column name for Hours Worked")
