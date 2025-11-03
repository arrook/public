// src/utils/jwt.ts
export const parseJWT = (token: string): Record<string, any> => {
  try {
    // 检查token格式是否正确
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token format');
    }
    
    // 解码 payload 部分（Base64Url 解码）
    const base64Url = parts[1];
    if (!base64Url) {
      throw new Error('Invalid JWT token format');
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT 解析失败:', error);
    return {};
  }
};

// 检查令牌是否过期
export const isTokenExpired = (token: string): boolean => {
  const payload = parseJWT(token);
  if (!payload.exp) return true;
  // JWT 的 exp 是秒级时间戳，需要转换为毫秒
  return payload.exp * 1000 < Date.now();
};