# Timesheet & Billing Auditor

Cross-checks timesheets, billing reports and contract rates, flags discrepancies, and uses Claude to explain the root cause and a fix.

**Live demo**: https://tp-technical-test.vercel.app/ (AI integration working)

## Stack

- **Backend**: FastAPI, SQLModel, SQLite
- **Frontend**: React, Vite, TypeScript, TanStack Query, Tailwind CSS

## Setup

### 1. Environment variables

```bash
cp .env.example .env
```

Fill in `ANTHROPIC_API_KEY` with your Anthropic API key.

### 2. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at `http://localhost:8000`.

### 3. Frontend

Requires pnpm ([install guide](https://pnpm.io/installation)).

```bash
cd frontend
pnpm install
pnpm dev
```

App runs at `http://localhost:5173`.

## Usage

1. Upload the timesheet, billing and contract CSVs.
2. Adjust the column mappings if your CSV headers differ from the defaults.
3. Optionally add client rules in plain text.
4. Run the audit to see flagged records and Claude's analysis.

Sample CSVs to try this with are in `backend/provided-docs/`.

## Tests

```bash
cd backend
source ./.venv/bin/activate
pytest
```
