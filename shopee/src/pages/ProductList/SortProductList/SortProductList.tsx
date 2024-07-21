export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap teams-center gap-2 justify-center'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button className='h-8 px-4 bg-orange-500 text-white text-sm hover:bg-orange-500/80 text-center '>
            Phổ biến
          </button>
          <button className='h-8 px-4 bg-white text-black text-sm hover:bg-slate-100 text-center '>Mới nhất</button>
          <button className='h-8 px-4 bg-white text-black text-sm hover:bg-slate-100 text-center '>Bán chạy</button>
          <select className='h-8 px-4 bg-white text-black text-sm hover:bg-slate-100 text-center'>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá thấp đến cao</option>
            <option value='price:desc'>Giá cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange-500'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='shadow-sm px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 cursor-not-allowed'>
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
            </button>
            <button className='shadow-sm px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 '>
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
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
