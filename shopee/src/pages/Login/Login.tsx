import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Login() {
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange-400'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 lg:py-32 lg:px-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-md'
                  placeholder='email'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1.25rem]'>Email khong hợp lệ!</div>
              </div>
              <div className='mt-3'>
                <input
                  type='paswword'
                  name='paswword'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-md'
                  placeholder='paswword'
                  autoComplete='on'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1.25rem]'>Mật khẩu khong hợp lệ!</div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-3 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center'>
                  <span className='text-gray-400 text-sm'>Bạn đã chưa có tài khoản?</span>
                  <Link to={'/register'} className='text-red-500 text-sm'>
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
