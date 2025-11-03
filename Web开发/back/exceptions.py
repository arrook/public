from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError

class LocalException(Exception):
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail

def register_exception_handlers(app: FastAPI):
    @app.exception_handler(LocalException)
    async def custom_exception_handler(request: Request, exc: LocalException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail}
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=422,
            content={"detail": "Validation error", "errors": exc.errors()}
        )

    @app.exception_handler(SQLAlchemyError)
    async def sql_exception_handler(request: Request, exc: SQLAlchemyError):
        return JSONResponse(
            status_code=500,
            content={"detail": "Database error"}
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"}
        )