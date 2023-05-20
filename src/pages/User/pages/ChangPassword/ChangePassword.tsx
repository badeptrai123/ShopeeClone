import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import omit from 'lodash/omit'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>

const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const methods = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = methods

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
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

  return (
    <div className='rounded-sm bg-white px-2 pb-16 md:px-7'>
      <Helmet>
        <title>Đổi mật khẩu | Shopee Clone</title>
        <meta name='description' content='Đổi mật khẩu để đảm bảo tính bảo mật cho tài khoản' />
      </Helmet>
      <div className='border-b border-b-gray-200 py-3'>
        <h1 className='text-xl capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='text-sm'>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
      </div>

      <form onSubmit={onSubmit}>
        <div className='mt-6 pr-12 md:w-[70%]'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='mt-2 truncate text-gray-500 sm:w-[30%] sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[70%] sm:pl-5'>
              <Input
                type='password'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='password'
                className='relative'
                register={register}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='mt-2 truncate text-gray-500 sm:w-[30%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[70%]  sm:pl-5'>
              <Input
                type='password'
                className='relative'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='new_password'
                register={register}
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='mt-2 truncate text-gray-500 sm:w-[30%] sm:text-right'>Xác nhận mật khẩu</div>
            <div className='sm:w-[70%] sm:pl-5'>
              <Input
                type='password'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='confirm_password'
                className='relative'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='sm:ml-[30%] sm:pl-5'>
              <Button type='submit' className='rounded-sm bg-orange px-6 py-[10px] text-white hover:bg-orange/90'>
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
