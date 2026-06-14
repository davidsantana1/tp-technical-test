from routers import billing_router
from routers import data_processing_router
from fastapi import Request, status, FastAPI
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from db import engine
from sqlmodel import SQLModel


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(data_processing_router)
app.include_router(billing_router)


@app.exception_handler(ValueError)
async def value_error_exception_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        content={"detail": str(exc)},
    )
