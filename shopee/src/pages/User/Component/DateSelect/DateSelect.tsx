import { range } from 'lodash'
import { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-wrap'>
      <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
      <div className='w-[80%] pl-5 '>
        <div className='flex justify-between'>
          <select
            name='date'
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-300'
            value={value?.getDate() || date.date}
          >
            <option>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-300'
          >
            <option>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-300'
          >
            <option>Năm</option>
            {range(1990, 2025).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 text-red-600 text-sm min-h-[1.25rem]'>{errorMessage}</div>
      </div>
    </div>
  )
}
