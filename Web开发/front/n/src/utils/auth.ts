// src/utils/auth.ts
import type { UserInfo } from '@/types/auth';

// 定义角色类型
type Role = 'family' | 'nurse' | 'doctor';

export const hasPermission = (user: UserInfo | null, requiredRole: string): boolean => {
  if (!user) return false;
  
  const roleHierarchy: Record<Role, number> = {
    family: 1,
    nurse: 2,
    doctor: 3
  };
  
  // 类型检查确保角色是有效值
  const isValidRole = (role: string): role is Role => {
    return role in roleHierarchy;
  };
  
  if (!isValidRole(user.role) || !isValidRole(requiredRole)) {
    return false;
  }
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
};

export const getRoleName = (role: string): string => {
  const roleNames: Record<string, string> = {
    family: '家属',
    nurse: '护士',
    doctor: '医生'
  };
  return roleNames[role] || role;
};