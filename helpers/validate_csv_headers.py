from pydantic import BaseModel
from csv import DictReader


def validate_csv_headers(headers: BaseModel, csv_reader: DictReader) -> bool:
    """Validates that all expected columns in the schema mapping exist in the CSV reader."""
    expected_headers = set(headers.model_dump().values())

    actual_headers = set(csv_reader.fieldnames or [])

    return expected_headers.issubset(actual_headers)
