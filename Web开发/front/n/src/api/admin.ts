import request from '@/utils/request'
import type { adminUpdate, UserInfo, UserRegister } from '@/types/auth'
import type { Response } from '@/types/common'

export const adminAPI = {
  getUsers: (): Promise<UserInfo[]> => 
    request.get('/admin/users'),
  
  getTotal: (): Promise<UserInfo[]> => 
    request.get('/admin/total'),

  getUser: (userId: number): Promise<UserInfo> => 
    request.get(`/admin/user/${userId}`),
  
  createUser: (data: UserRegister): Promise<Response> => 
    request.post('/admin/user', data),
  
  updateUser: (userId: number, data: adminUpdate): Promise<Response> => 
    request.put(`/admin/user/${userId}`, data),
  
  deleteUser: (userId: number): Promise<Response> => 
    request.delete(`/admin/user/${userId}`),
}