import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to='/' className=''>
      <div className='bg-white shadow-sm rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            alt=''
            className='absolute top-0 left-0  w-full h-full object-cover'
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li76e84fxqky8a'
          ></img>
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm '>
            Quần tây nam hàn quốc JBagy dáng baggy vải co giãn dày dặn dáng suông ống rộng, màu đen, kem
          </div>
          <div className='flex items-center mt-3'>
            <span className='text-xs'>₫</span>
            <span>169.000</span>
            <div className='text-orange-500 truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>150.000</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x='0'
                    y='0'
                    className='w-3 h-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                    ></polygon>
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x='0'
                  y='0'
                  className='w-3 h-3 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                  ></polygon>
                </svg>
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <span>5.66k</span>
              <span className='ml-2'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
