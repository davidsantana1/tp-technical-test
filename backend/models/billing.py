from sqlmodel import Field, SQLModel


class Billing(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    employee_id: int = Field(index=True)
    project: str
    hours_billed: int
    rate_charged: int

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": 1,
                "employee_id": 101,
                "project": "A",
                "hours_billed": 40,
                "rate_charged": 20,
            }
        }
    }
