export interface ErrorRespone<Data> {
  message?: string
  data?: Data
}

export interface SuccessRespone<Data> {
  message?: string
  data: Data
}

// cú pháp `-?` sẽ loại bỏ cái undefind của  key optional
export type NoUndefindField<T> = {
  [P in keyof T]-?: NoUndefindField<NonNullable<T[P]>>
}
