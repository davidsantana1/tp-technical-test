# AI Transformation – Technical Test Pack

## Requirements

- Python 3.12 or higher
- Installing project dependencies

## How to run

1. Install project dependencies

```bash
pip install -r requirements.txt
```

2. Create virtual environment

```bash
python -m venv .venv
```

3. Activate virtual environment

```bash
source .venv/bin/activate
```

4. Run the application

```bash
uvicorn main:app --reload
```

## Provided Task

> You are provided with datasets representing timesheets, contract rates, and billing reports. Your task is to identify discrepancies and flag errors before invoices are sent to the client.

## Architectural decisions

- FastAPI for building the API
- SQLModel for the ORM
- PostgreSQL for the database
