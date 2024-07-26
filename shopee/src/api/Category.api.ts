import { Category } from 'src/types/category.type'
import { SuccessRespone } from 'src/types/until.type'
import http from 'src/untils/http'

const URL = 'categories'

const categoryApi = {
  getCategory() {
    return http.get<SuccessRespone<Category[]>>(URL)
  }
}

export default categoryApi
