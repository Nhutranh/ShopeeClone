import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/component/Input'
import { rules } from 'src/untils/rules'

interface FormData {
  email: string
  password: string
  confirm_pasword: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  const formValues = watch('password')
  console.log(formValues)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange-400'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 lg:py-32 lg:px-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                placehoder='email'
                errorMessage={errors.email?.message}
                className='mt-8'
                rules={rules.email}
              />

              <Input
                name='password'
                register={register}
                type='password'
                placehoder='password'
                errorMessage={errors.password?.message}
                className='mt-8'
                rules={rules.password}
              />
              <Input
                name='confirm_pasword'
                register={register}
                type='confirm_pasword'
                placehoder='confirm_pasword'
                errorMessage={errors.confirm_pasword?.message}
                className='mt-8'
                rules={rules.confirm_pasword}
                autoComplete='on'
              />
              <div className='mt-3'>
                <button className='w-full text-center py-3 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center'>
                  <span className='text-gray-400 text-sm'>Bạn đã có tài khoản?</span>
                  <Link to={'/login'} className='text-red-400 text-sm'>
                    Đăng nhập
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
