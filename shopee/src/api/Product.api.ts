import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessRespone } from 'src/types/until.type'
import http from 'src/untils/http'

const URL = 'products'

const ProductApi = {
  getProduct(params: ProductListConfig) {
    return http.get<SuccessRespone<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessRespone<Product>>(`${URL}/${id}`)
  }
}

export default ProductApi
