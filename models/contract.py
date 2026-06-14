from sqlmodel import Field, SQLModel


class Contract(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    project: str
    rate_per_hour: float
    max_hours_per_week: int

    model_config = {
        "json_schema_extra": {
            "example": {
                "project": "A",
                "rate_per_hour": 20.0,
                "max_hours_per_week": 40,
            }
        }
    }
