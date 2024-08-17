import { SuccessRespone } from 'src/types/until.type'
import { User } from 'src/types/user.type'
import http from 'src/untils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'email' | 'createdAt' | 'roles' | 'updatedAt'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessRespone<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessRespone<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessRespone<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
