type Role = 'User' | 'Admin'
export interface User {
  roles: Role[]
  address: string
  name?: string
  date_of_birth?: string
  avatar?: string
  _id: string
  email: string
  phone?: string
  createdAt: string
  updatedAt: string
}
