import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/api/User.api'
import images from 'src/assets/images'
import Button from 'src/component/Button'
import Input from 'src/component/Input'
import InputNumber from 'src/component/InputNumber'
import { userSchema } from 'src/untils/rules'
import DateSelect from '../../Component/DateSelect'

type FormData = Pick<userSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])

export default function Profile() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('address', profile.address)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    //updateProfileMutation.mutateAsync({})
  })

  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow-sm'>
      <div className='border-b border-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex md:flex-grow md:items-start' onSubmit={onSubmit}>
        <div className='w-full mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5 '>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[80%] pl-5 '>
              <Input
                classNameInput='px-3 py-2 border border-gray-300 w-full'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[80%] pl-5 '>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='px-3 py-2 border border-gray-300 w-full'
                    placeholder='Sđt'
                    errorMessage={errors.name?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
            <div className='w-[80%] pl-5 '>
              <Input
                classNameInput='px-3 py-2 border border-gray-300 w-full'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
            )}
          />

          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize' />
            <div className='w-[80%] pl-5 '>
              <Button
                type='submit'
                className='flex items-center h-9 bg-orange-500 px-5 rounded-sm text-center text-sm text-white hover:bg-orange-300'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img src={images.logo} alt='avtUsser' className='h-full rounded-full object-cover w-full' />
              <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            </div>
            <button
              type='button'
              className='flex h-10 items-center border border-gray-100 justify-end bg-white px-6 text-sm text-gray-600 shadow-sm'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng tối đa 1MB</div>
              <div>Định dạng JEPG, PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
