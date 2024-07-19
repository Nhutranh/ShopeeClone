import { SuccessRespone } from './until.type'
import { User } from './user.type'

export type AuthRespone = SuccessRespone<{
  access_token: string
  experies: string
  user: User
}>
