# middleware/auth.py
from datetime import datetime
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from services.auth_service import AuthService

from schemas import TokenData

class AuthMiddleware(BaseHTTPMiddleware):
    excluded_paths = {"/", "/health", "/docs", "/openapi.json",
                      "/api/v1/auth/login", "/api/v1/auth/register"}

    async def dispatch(self, request: Request, call_next):
        # request.state.user = TokenData(
        #     sub="test",
        #     role="doctor",
        #     exp=datetime.fromtimestamp(1)
        # )
        # return await call_next(request)

        if request.url.path in self.excluded_paths:
            return await call_next(request)

        auth = request.headers.get("Authorization")
        if not auth:
            return JSONResponse(status_code=401,
                                content={"detail": "Missing authorization header"})
        try:
            request.state.user = AuthService.verify_token(auth)
        except HTTPException as exc:
            return JSONResponse(status_code=exc.status_code,
                                content={"detail": exc.detail})
        return await call_next(request)