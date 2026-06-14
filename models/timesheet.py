from sqlmodel import Field, SQLModel


class Timesheet(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    employee_id: int = Field(index=True)
    employee_name: str = Field(index=True)
    project: str
    hours_worked: int

    model_config = {
        "json_schema_extra": {
            "example": {
                "employee_id": 101,
                "employee_name": "Alice",
                "project": "A",
                "hours_worked": 40,
            }
        }
    }

