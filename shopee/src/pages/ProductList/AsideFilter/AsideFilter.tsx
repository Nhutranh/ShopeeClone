import { Link } from 'react-router-dom'
import Button from 'src/component/Button'
import Input from 'src/component/Input'
import path from 'src/constants/path'

export default function AsideFilter() {
  return (
    <div className='py-4 '>
      <Link to={path.home} className='flex items-center font-bold'>
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
        <li className='py-2 pl-2'>
          <Link to={path.home} className='flex items-center relative px-2 text-orange-500 font-semibold'>
            <svg viewBox='0 0 4 7' className='w-2 h-2 top-1 left-[-10px] fill-orange-500'>
              <polygon points='4 3.5 0 0 0 7'></polygon>
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Điện thoại
          </Link>
        </li>
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
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              placehoder='đ TỪ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-md'
            />
            <div className='mx-2 mt-2 shrink-0'> - </div>
            <Input
              type='text'
              className='grow'
              name='from'
              placehoder='đ ĐẾN'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-md'
            />
          </div>
          <Button className='w-full py-2 px-2 uppercase bg-orange-500 text-white text-sm hover:bg-orange-300 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to='/' className='flex items-center text-sm '>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg key={index} viewBox='0 0 30 30' className='h-4 w-4 mr-1'>
                  <defs>
                    <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                      <stop offset='0%' stopColor='#FFD211'></stop>
                      <stop offset='100%' stopColor='#FFAD27'></stop>
                    </linearGradient>
                  </defs>
                  <path
                    fill='none'
                    stroke='url(#star__hollow)'
                    d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                  ></path>
                </svg>
              ))}
            Trở lên
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='/' className='flex items-center text-sm '>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg key={index} viewBox='0 0 30 30' className='h-4 w-4 mr-1'>
                  <defs>
                    <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                      <stop offset='0%' stopColor='#FFD211'></stop>
                      <stop offset='100%' stopColor='#FFAD27'></stop>
                    </linearGradient>
                  </defs>
                  <path
                    fill='none'
                    stroke='url(#star__hollow)'
                    d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                  ></path>
                </svg>
              ))}
            Trở lên
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button className='w-full py-2 px-2 uppercase bg-orange-500 text-white text-sm hover:bg-orange-300 flex justify-center items-center'>
        Xóa tất cả
      </Button>
    </div>
  )
}
