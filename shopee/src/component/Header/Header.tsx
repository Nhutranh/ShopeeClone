import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import images from 'src/assets/images'
import Popover from '../Popover'
import { useMutation, useQuery } from '@tanstack/react-query'
import authApi from 'src/api/Auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contenxts/app.context'
import path from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/untils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { purchaseStatus } from 'src/constants/purchase'
import purchaseApi from 'src/api/purcharse.api'
import { fomatCurrency } from 'src/untils/untils'
import { queryClient } from 'src/main'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])
const maxPurchase = 5

export default function Header() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMatation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    }
  })

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchaseInCartData?.data.data

  const handleLogout = () => {
    logoutMatation.mutate()
  }

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return (
    <div className='pb-5 pt-2 bg-orange-500 text-sm text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
            renderPopover={
              <div className='bg-white shadow-md rounded-sm relative border-gray-200'>
                <div className='flex flex-col py-2 pr-28 pl-3 '>
                  <button className=' py-2 px-3 hover:text-orange-500'>Tiếng Việt</button>
                  <button className='py-2 mt-2 px-3 hover:text-orange-500'>English</button>
                </div>
              </div>
            }
          >
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
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
          {isAuthenticated && (
            <Popover
              className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
              renderPopover={
                <div className='shadow-md'>
                  <Link
                    to={path.profile}
                    className='text-left block py-2 px-3 hover:bg-slate-100 bg-white hover:text-cyan-500'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link to='/' className='text-left block py-2 px-3 hover:bg-slate-100 bg-white hover:text-cyan-500'>
                    Đơn mua
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='text-left block w-full py-2 px-3 hover:bg-slate-100 bg-white hover:text-cyan-500'
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='w-6 h-6 mr-2 flex-shrink-0'>
                <img src={images.logo} alt='avt' className='w-full h-full object-cover rounded-full' />
              </div>
              <div>{profile?.email}</div>
            </Popover>
          )}

          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
                Đăng ký
              </Link>
              <div className='border-r-[1px] border-r-white/40 h-4'>
                <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
                  Đăng nhập
                </Link>
              </div>
            </div>
          )}
        </div>
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
