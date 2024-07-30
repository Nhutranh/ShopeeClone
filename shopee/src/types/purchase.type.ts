import { Product } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus | 0 // số 0 là lấy toàn bộ DS sản phẩm

export interface Purchase {
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  _id: string
  product: Product
  user: string
  createdAt: string
  updatedAt: string
}
