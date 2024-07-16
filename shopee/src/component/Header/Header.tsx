// eslint-disable-next-line import/named
import { FloatingPortal, useFloating, arrow, shift, offset } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import images from 'src/assets/images'

export default function Header() {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(5), shift(), arrow({ element: arrowRef })]
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }

  return (
    <div className='pb-5 pt-2 bg-orange-500 text-sm text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <div
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
            ref={reference}
            onMouseEnter={showPopover}
            onMouseLeave={hidePopover}
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
            <FloatingPortal>
              <AnimatePresence>
                {open && (
                  <motion.div
                    ref={floating}
                    style={{
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                      width: 'max-content',
                      transformOrigin: `${middlewareData.arrow?.x}px top`
                    }}
                    initial={{ opacity: 0, transform: 'scale(0)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      ref={arrowRef}
                      className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute -translate-y-full'
                      style={{
                        left: middlewareData.arrow?.x,
                        top: middlewareData.arrow?.y
                      }}
                    />
                    <div className='bg-white shadow-md rounded-sm relative border-gray-200'>
                      <div className='flex flex-col py-2 px-3'>
                        <button className='py-2 px-3 hover:text-orange-500'>Tiếng Việt</button>
                        <button className='py-2 mt-2 px-3 hover:text-orange-500'>English</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </FloatingPortal>
          </div>

          <div className='flex items-center py-1 hover:text-gray-300 cursor-pointer'>
            <div className='w-6 h-6 mr-2 flex-shrink-0'>
              <img src={images.logo} alt='avt' className='w-full h-full object-cover rounded-full' />
            </div>
            <div>Phan Ngọc Như Tranh</div>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to={'/'} className='flex col-span-2'>
            <img src={images.logo} alt='logo' className='h-8 lg:h-11' />
            <p className='ml-3 font-bold text-white text-xl'>Shopee</p>
          </Link>
          <form className='col-span-9'>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                className='text-black px-3 py-2 bg-transparent flex-grow border-none outline-none'
                type='search'
                name='search'
                placeholder='Free Ship đơn từ 0đ'
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
          <div className='cols-sapn-1'>
            <Link to='/'>
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
