from enum import Enum

ACCEPTED_FILE_MIME_TYPES = ["text/csv", "application/vnd.ms-excel"]


class BillingStatus(str, Enum):
    OK = "OK"
    ERROR = "ERROR"
