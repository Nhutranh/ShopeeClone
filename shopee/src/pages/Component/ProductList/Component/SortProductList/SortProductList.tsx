import { sortBy, order as orderConstan } from 'src/constants/product'
import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const hanldeSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortByValue
      }).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortBy.price,
            order: orderValue
          },
          ['order']
        )
      ).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap teams-center gap-2 justify-center'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4  text-sm hover:bg-orange-500/80 text-center', {
              'bg-orange-500 text-white hover:bg-orange-500/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => hanldeSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4  text-sm hover:bg-orange-500/80 text-center', {
              'bg-orange-500 text-white hover:bg-orange-500/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black  hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => hanldeSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4  text-sm hover:bg-orange-500/80 text-center', {
              'bg-orange-500 text-white  hover:bg-orange-500/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => hanldeSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-4 text-sm text-center', {
              'bg-orange-500 text-white  hover:bg-orange-500/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled>
              Giá
            </option>
            <option value={orderConstan.asc} className='bg-white text-black'>
              Giá thấp đến cao
            </option>
            <option value={orderConstan.desc} className='bg-white text-black'>
              Giá cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange-500'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='flex items-center ml-2'>
            {page === 1 ? (
              <span className='flex shadow-sm px-3 h-8 w-9 justify-center items-center rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 cursor-not-allowed'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex shadow-sm px-3 h-8 w-9 justify-center items-center rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex shadow-sm px-3 h-8 w-9 justify-center items-center rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex shadow-sm px-3 h-8 w-9 justify-center items-center rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
