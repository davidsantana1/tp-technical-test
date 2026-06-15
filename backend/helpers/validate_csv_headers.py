from pydantic import BaseModel
from typing import Iterable


def validate_csv_headers(headers: BaseModel, actual_headers: Iterable[str]) -> bool:
    """Validates that all expected columns in the schema mapping exist in the file headers."""
    expected_headers = set(headers.model_dump().values())

    return expected_headers.issubset(set(actual_headers))
