import { RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_pasword']?: RegisterOptions
}

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Email bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    deps: 'email'
  },

  password: {
    required: {
      value: true,
      message: 'Password bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_pasword: {
    required: {
      value: true,
      message: 'Nhập lại password'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  }
}

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { priceMin, priceMax } = this.parent as { priceMin: string; priceMax: string }
  if (priceMin !== '' && priceMax !== '') {
    return Number(priceMax) >= Number(priceMin)
  }
  return priceMin !== '' || priceMax !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_pasword: yup
    .string()
    .required('nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  priceMin: yup.string().test({
    name: 'price-not-allowed',
    message: 'giá không phù hợp',
    test: testPriceMinMax
  }),
  priceMax: yup.string().test({
    name: 'price-not-allowed',
    message: 'giá không phù hợp',
    test: testPriceMinMax
  })
})

//const loginSchema = schema.omit(['confirm_pasword'])

export type Schema = yup.InferType<typeof schema>
