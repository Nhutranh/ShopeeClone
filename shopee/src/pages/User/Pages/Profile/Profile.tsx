import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/api/User.api'
import Button from 'src/component/Button'
import Input from 'src/component/Input'
import InputNumber from 'src/component/InputNumber'
import { userSchema } from 'src/untils/rules'
import DateSelect from '../../Component/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contenxts/app.context'
import { setProfileToLS } from 'src/untils/auth'
import { getAvtURL, isAxiosUnprocessableEntityError } from 'src/untils/untils'
import { ErrorRespone } from 'src/types/until.type'
import { Omit } from 'lodash'

type FormData = Pick<userSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])

export default function Profile() {
  const maxSizeUpLoadAvt = 1048576 //bytes
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    register,
    control,
    watch,
    setError,
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
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const upLoadAvtMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  const avatar = watch('avatar')

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
    try {
      let avatarName
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await upLoadAvtMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      refetch()
      toast.success(res.data.message)
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorRespone<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= maxSizeUpLoadAvt || fileFromLocal?.type.includes('image'))) {
      toast.error('Dung lượng tối đa 1MB, định dạng JEPG, PNG', {
        position: 'top-center'
      })
    } else {
      setFile(fileFromLocal)
    }
  }

  const handleUpLoad = () => {
    fileInputRef.current?.click()
  }

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
              <img
                src={previewImage || getAvtURL(avatar)}
                alt='avtUsser'
                className='h-full rounded-full object-cover w-full'
              />
              <input
                className='hidden'
                type='file'
                accept='.jpg,.jpeg,.png'
                ref={fileInputRef}
                onChange={onFileChange}
              />
            </div>
            <button
              type='button'
              onClick={handleUpLoad}
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
