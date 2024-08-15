import { useContext } from 'react'
import { Link } from 'react-router-dom'
import images from 'src/assets/images'
import path from 'src/constants/path'
import { AppContext } from 'src/contenxts/app.context'

export default function UserSidenav() {
  const { profile } = useContext(AppContext)
  return (
    <>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile}>
          <img
            src={profile?.avatar ? profile.avatar : images.logo}
            alt='avt'
            className='w-[64px] h-[64px] object-cover rounded-full'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.email}</div>
          <Link to={path.profile} className='text-gray-400 flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5 mr-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
              />
            </svg>
            Sửa Hồ Sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-orange-500 transition-colors'>
          <div className='mr-3 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={path.changepassword} className='flex items-center capitalize text-gray-500 transition-colors mt-3'>
          <div className='mr-3 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={path.historyPurchase} className='flex items-center capitalize text-gray-500 transition-colors mt-3'>
          <div className='mr-3 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
              />
            </svg>
          </div>
          Lịch sử mua hàng
        </Link>
      </div>
    </>
  )
}
