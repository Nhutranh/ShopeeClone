import { Link } from 'react-router-dom'
import NavHeader from '../NavHeader'
import images from 'src/assets/images'
import useSearchProducts from 'src/hooks/useSearchProducts'

export default function CartHeader() {
  const { onSubmitSearch, register } = useSearchProducts()

  return (
    <div className='border-b border-b-black/10'>
      <div className='bg-orange-500 text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            <Link to={'/'} className='flex'>
              <div className='flex'>
                <img src={images.logo} alt='logo' className='h-8 lg:h-11' />
                <p className='ml-3 font-bold text-orange-600 text-xl'>Shopee</p>
              </div>
              <div className='mx-4 h-8 w-[1px] bg-orange-500'></div>
              <div className='capitalize text-orange-500 lg: text-xl'>Giỏ hàng</div>
            </Link>
            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={onSubmitSearch}>
              <div className='border-[1px] border-orange-500 rounded-sm p-1 flex'>
                <input
                  className='w-full flex-grow border-none bg-transparent py-2 px-3 text-black outline-none'
                  type='search'
                  placeholder='Free Ship đơn từ 0đ'
                  {...register('name')}
                />
                <button className=' rounded-sm px-5 py-2 flex-shrink-0 bg-orange-500 hover:opacity-90'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
