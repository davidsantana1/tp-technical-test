import json
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

API = os.environ.get("API_URL", "http://localhost:8000")
client = httpx.Client(base_url=API, timeout=60)

client.post("/data-processing/load-timesheet",
    files={"file": open("provided-docs/timesheet.csv", "rb")},
    params={"employee_id": "Employee_ID", "employee_name": "Employee_Name", "project": "Project", "hours_worked": "Hours_Worked"})

client.post("/data-processing/load-billing",
    files={"file": open("provided-docs/billing.csv", "rb")},
    params={"employee_id": "Employee_ID", "project": "Project", "hours_billed": "Hours_Billed", "rate_charged": "Rate_Charged"})

client.post("/data-processing/load-contract",
    files={"file": open("provided-docs/contracts.csv", "rb")},
    params={"project": "Project", "rate_per_hour": "Rate_per_Hour", "max_hours_per_week": "Max_Hours_Per_Week"})

result = client.post("/billing/identify-discrepancies", json={}).json()
print(json.dumps(result, indent=2))
