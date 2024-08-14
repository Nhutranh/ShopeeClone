import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  placeholder?: string
  classNameInput?: string
  classNameError?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-md',
  classNameError = 'mt-1 text-red-600 text-sm min-h-[1.25rem]',
  ...rest
}: Props) {
  const result = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input className={classNameInput} {...result} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
