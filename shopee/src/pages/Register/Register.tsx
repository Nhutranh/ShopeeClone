import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/component/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/untils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/api/Auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/untils/untils'
import { ResponeApi } from 'src/types/until.type'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_pasword'>) => registerAccount(body)
  })

  const formValues = watch()
  console.log(formValues)

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_pasword'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponeApi<Omit<FormData, 'confirm_pasword'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
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
              />

              <Input
                name='password'
                register={register}
                type='password'
                placehoder='password'
                errorMessage={errors.password?.message}
                className='mt-8'
              />
              <Input
                name='confirm_pasword'
                register={register}
                type='confirm_pasword'
                placehoder='confirm_pasword'
                errorMessage={errors.confirm_pasword?.message}
                className='mt-8'
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
