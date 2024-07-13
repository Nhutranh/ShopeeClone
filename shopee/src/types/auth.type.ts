import { ResponeApi } from './until.type'
import { User } from './user.type'

export type AuthRespone = ResponeApi<{
  access_token: string
  experies: string
  user: User
}>
