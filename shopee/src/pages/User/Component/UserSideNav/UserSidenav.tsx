import classNames from 'classnames'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contenxts/app.context'
import { getAvtURL } from 'src/untils/untils'

export default function UserSidenav() {
  const { profile } = useContext(AppContext)
  return (
    <>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <NavLink to={path.profile}>
          <img src={getAvtURL(profile?.avatar)} alt='avt' className='w-[64px] h-[64px] object-cover rounded-full' />
        </NavLink>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.email}</div>
          <NavLink to={path.profile} className='text-gray-400 flex'>
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
          </NavLink>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center capitalize  transition-colors', {
              'text-orange-500': isActive,
              'text-gray-500': !isActive
            })
          }
        >
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
        </NavLink>
        <NavLink
          to={path.changepassword}
          className={({ isActive }) =>
            classNames('mt-3 flex items-center capitalize  transition-colors', {
              'text-orange-500': isActive,
              'text-gray-500': !isActive
            })
          }
        >
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
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('mt-3 flex items-center capitalize  transition-colors', {
              'text-orange-500': isActive,
              'text-gray-500': !isActive
            })
          }
        >
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
        </NavLink>
      </div>
    </>
  )
}
