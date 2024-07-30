import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/component/Button'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from 'src/component/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/untils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefindField } from 'src/types/until.type'
import RatingStart from 'src/component/RatingStart'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefindField<Pick<Schema, 'priceMax' | 'priceMin'>>

const priceSchema = schema.pick(['priceMin', 'priceMax'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      priceMin: '',
      priceMax: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.priceMax,
        price_min: data.priceMin
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  console.log(errors)
  return (
    <div className='py-4 '>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange-500': !category
        })}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 mr-2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItems) => {
          const isActive = category === categoryItems._id
          return (
            <li className='py-2 pl-2' key={categoryItems._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItems._id
                  }).toString()
                }}
                className={classNames('flex items-center relative px-2  font-semibold', {
                  'text-orange-500 font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='w-2 h-2 top-1 left-[-10px] fill-orange-500'>
                    <polygon points='4 3.5 0 0 0 7'></polygon>
                  </svg>
                )}
                {categoryItems.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 fill-current mr-2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
          />
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5 '>
        <div>Khoản giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='priceMin'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ TỪ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-md'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('priceMax')
                    }}
                    classNameError='hidden'
                  />
                )
              }}
            />
            <div className='mx-2 mt-2 shrink-0'> - </div>
            <Controller
              control={control}
              name='priceMax'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ ĐẾN'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-md'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('priceMin')
                    }}
                    classNameError='hidden'
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 text-red-600 text-center text-sm min-h-[1.25rem]'>{errors.priceMin?.message}</div>
          <Button className='w-full py-2 px-2 uppercase bg-orange-500 text-white text-sm hover:bg-orange-300 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStart queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        onClick={handleRemoveAll}
        className='w-full py-2 px-2 uppercase bg-orange-500 text-white text-sm hover:bg-orange-300 flex justify-center items-center'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
