export type Role = 'family' | 'nurse' | 'doctor'

export interface UserLogin {
  username: string
  password: string
}

export interface UserRegister {
  username: string
  password: string
  role: Role
  real_name?: string
  phone?: string
  email?: string
}

export interface UserProfile {
  id: number
  username: string
  real_name?: string
  phone?: string
  email?: string
}

export interface UserInfo {
  id: number
  username: string
  role: Role
  real_name?: string
  phone?: string
  email?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface adminUpdate {
  id: number
  username?: string
  real_name?: string
  role?: Role
  phone?: string
  email?: string
  is_active?: boolean
}

export interface Token {
  access_token: string
  token_type: string
}

export interface TokenData {
  sub: string
  role: Role
  exp: Date
}

export interface SystemLogInfo {
  id: number
  user_id: number
  token: string
  expires_at: Date
  created_at: Date
}