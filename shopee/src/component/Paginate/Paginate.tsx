import classNames from 'classnames'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const range = 2
export default function Paginate({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button
            key={index}
            className='bg-white border rounded-md hover:bg-slate-100 px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer'
          >
            ...
          </button>
        )
      }
    }
    const renderDotAfter = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button
            key={index}
            className='bg-white border rounded-md hover:bg-slate-100 px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer'
          >
            ...
          </button>
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
          <button
            key={index}
            className={classNames(
              'bg-white rounded-md hover:bg-slate-100 border px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer',
              {
                'border-cyan-500': pageNUmb === page,
                'border-transparent': pageNUmb !== page
              }
            )}
            onClick={() => setPage(pageNUmb)}
          >
            {pageNUmb}
          </button>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <button className='bg-white rounded-md border hover:bg-slate-100 px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer'>
        Prev
      </button>
      {renderPagination()}
      <button className='bg-white rounded-md border hover:bg-slate-100  px-3 py-2 shadow-sm flex items-center justify-center mx-2 cursor-pointer'>
        Next
      </button>
    </div>
  )
}
