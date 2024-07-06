import { Link } from 'react-router-dom'
import images from 'src/assets/images'

export default function RegisterHeader() {
  return (
    <header className='py-5'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to={'/'} className='flex'>
            <img src={images.logo} alt='logo' className='h-8 lg:h-11' />
            <p className='ml-3 font-bold text-orange-600 text-xl'>Shopee</p>
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>Đăng ký</div>
        </nav>
      </div>
    </header>
  )
}
