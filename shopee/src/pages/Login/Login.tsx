import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/api/Auth.api'
import Button from 'src/component/Button'
import Input from 'src/component/Input'
import { AppContext } from 'src/contenxts/app.context'
import { ErrorRespone } from 'src/types/until.type'

import { schema, Schema } from 'src/untils/rules'
import { isAxiosUnprocessableEntityError } from 'src/untils/untils'

type FormData = Omit<Schema, 'confirm_pasword'>
const loginSchema = schema.omit(['confirm_pasword'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_pasword'>) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorRespone<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
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
            <form onSubmit={onSubmit} noValidate className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-8'>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  placehoder='email'
                  errorMessage={errors.email?.message}
                  className='mt-8'
                />
              </div>
              <div className='mt-3'>
                <Input
                  name='password'
                  register={register}
                  type='password'
                  placehoder='password'
                  errorMessage={errors.password?.message}
                  className='mt-8'
                />
              </div>
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full flex justify-center items-center py-3 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
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
