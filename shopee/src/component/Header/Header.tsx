import { Link } from 'react-router-dom'
import images from 'src/assets/images'
import Popover from '../Popover'
import { useQuery } from '@tanstack/react-query'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import purchaseApi from 'src/api/purcharse.api'
import { fomatCurrency } from 'src/untils/untils'
import NavHeader from '../NavHeader'
import { useContext } from 'react'
import { AppContext } from 'src/contenxts/app.context'
import useSearchProducts from 'src/hooks/useSearchProducts'

const maxPurchase = 5

export default function Header() {
  const { onSubmitSearch, register } = useSearchProducts()

  const { isAuthenticated } = useContext(AppContext)
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchaseInCartData?.data.data

  return (
    <div className='pb-5 pt-2 bg-orange-500 text-sm text-white'>
      <div className='container'>
        <NavHeader />
        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to={'/'} className='flex col-span-2'>
            <img src={images.logo} alt='logo' className='h-8 lg:h-11' />
            <p className='ml-3 font-bold text-white text-xl'>Shopee</p>
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                className='text-black px-3 py-2 bg-transparent flex-grow border-none outline-none'
                type='search'
                placeholder='Free Ship đơn từ 0đ'
                {...register('name')}
              />
              <button className=' rounded-sm px-4 py-2 flex-shrink-0 bg-orange-500 hover:opacity-90'>
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
          <div className='cols-span-1 justify-self-start'>
            <Popover
              renderPopover={
                <div className='bg-white max-w-[400px] text-sm shadow-md rounded-sm relative border-gray-200'>
                  {purchasesInCart ? (
                    <div className='p-2'>
                      <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, maxPurchase).map((purchase) => (
                          <div key={purchase._id} className='mt-2 py-2 flex hover:bg-slate-100'>
                            <div className='flex-shrink-0'>
                              <img
                                src={purchase.product.image}
                                alt={purchase.product.name}
                                className='h-11 w-11 object-cover'
                              />
                            </div>
                            <div className='flex-grow ml-2 overflow-hidden'>
                              <div className='truncate'>{purchase.product.name}</div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <span className='text-orange-500'>₫{fomatCurrency(purchase.product.price)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-5 flex items-center justify-center'>
                        <div className='capitalize text-xs'>
                          {purchasesInCart.length > maxPurchase
                            ? purchasesInCart.length - maxPurchase
                            : 'Thêm hàng vào giỏ'}
                        </div>
                        <Link
                          to={path.cart}
                          className='ml-10 capitalize bg-orange-500 hover:bg-opacity-80 px-4 py-2 rounded-sm text-white'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='text-orange-500 text-lg p-5'>Không có sản phẩm nào!</div>
                  )}
                </div>
              }
            >
              <Link to='/' className='block relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {purchasesInCart && (
                  <div className='absolute top-[-14px] right-[-8px] rounded-full bg-white/80 px-3 py-1 text-black'>
                    {purchasesInCart?.length}
                  </div>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
