from enum import Enum

EXCEL_MIME_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

ACCEPTED_FILE_MIME_TYPES = ["text/csv", "application/vnd.ms-excel", EXCEL_MIME_TYPE]


class BillingStatus(str, Enum):
    OK = "OK"
    ERROR = "ERROR"
