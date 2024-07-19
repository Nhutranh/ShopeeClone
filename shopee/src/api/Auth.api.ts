import { AuthRespone } from 'src/types/auth.type'
import http from 'src/untils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthRespone>('/register', body)
export const login = (body: { email: string; password: string }) => http.post<AuthRespone>('/login', body)
export const logout = () => http.post<AuthRespone>('/logout')
