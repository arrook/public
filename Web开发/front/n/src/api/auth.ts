import request from './request';
import type { UserLogin, UserRegister, Token, UserInfo, UserProfile, SystemLogInfo } from '@/types/auth';

export const authAPI = {
  login: (data: UserLogin): Promise<Token> => 
    request.post('/auth/login', data),
  
  register: (data: UserRegister): Promise<Token> => 
    request.post('/auth/register', data),
  
  getProfile: (): Promise<UserInfo> => 
    request.get('/auth/profile'),

  getLog: (): Promise<SystemLogInfo[]> => 
    request.get('/auth/log'),

  update: (data: UserProfile): Promise<Token> => 
    request.put('/auth/update', data),

};
