# import time
# from fastapi import Request
# from starlette.middleware.base import BaseHTTPMiddleware
# from starlette.responses import Response

# class AuthCheckMiddleware(BaseHTTPMiddleware):
#     async def dispatch(self, request: Request, call_next):
#         # 跳过登录/文档等白名单
#         if request.url.path in ["/docs", "/openapi.json", "/api/v1/auth/login"]:
#             return await call_next(request)

#         token = request.headers.get("Authorization")
#         if not token or not verify_jwt(token.replace("Bearer ", "")):
#             return Response("Unauthorized", status_code=401)

#         # 继续后续流程
#         return await call_next(request)

# app.add_middleware(AuthCheckMiddleware)