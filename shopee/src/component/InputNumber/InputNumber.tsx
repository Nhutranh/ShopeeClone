import { forwardRef, InputHTMLAttributes, useState } from 'react'

export interface InputNumerProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumerProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-md',
    classNameError = 'mt-1 text-red-600 text-sm min-h-[1.25rem]',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [loaclValue, setloaclValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      //thực thi onChange calback từ bên ngoài truyền vào props
      onChange && onChange(event)

      // cập nhật localValue State
      setloaclValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} value={value || loaclValue} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
