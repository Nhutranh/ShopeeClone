import { RegisterOptions } from 'react-hook-form'

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
