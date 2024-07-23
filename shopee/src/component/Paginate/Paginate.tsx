import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const range = 2
export default function Paginate({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='bg-white border rounded-md hover:bg-slate-100 px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer'
          >
            ...
          </span>
        )
      }
    }
    const renderDotAfter = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='bg-white border rounded-md hover:bg-slate-100 px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer'
          >
            ...
          </span>
        )
      }
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNUmb = index + 1
        if (page <= range * 2 + 1 && pageNUmb > page + range && pageNUmb < pageSize - range + 1) {
          return renderDotBefore(index)
        } else if (page > range * 2 + 1 && page < pageSize - range * 2) {
          if (pageNUmb < page - range && pageNUmb > range) {
            return renderDotBefore(index)
          } else if (pageNUmb > page + range && pageNUmb < pageSize - range + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - range * 2 && pageNUmb > range && pageNUmb < page - range) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNUmb.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'bg-white rounded-md hover:bg-slate-100 border px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer',
              {
                'border-cyan-500': pageNUmb === page,
                'border-transparent': pageNUmb !== page
              }
            )}
          >
            {pageNUmb}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-white rounded-md border hover:bg-slate-300 px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-not-allowed'>
          Prev
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
          className='bg-white rounded-md border hover:bg-slate-100 px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-white rounded-md border hover:bg-slate-100 px-3 py-2 shadow-sm flex items-center justify-center mx-2 '>
          Next
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
          className='bg-white rounded-md border hover:bg-slate-100 px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer'
        >
          Next
        </Link>
      )}
    </div>
  )
}
