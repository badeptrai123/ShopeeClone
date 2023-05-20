import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'

import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { path } from 'src/constants/path'
import authApi from 'src/apis/auth.api'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  const { t } = useTranslation('home')
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(registerSchema) })

  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })
  // const rules = getRules(getValues)
  // const email = watch('email')
  // console.log(email)
  return (
    <div className='bg-lightOrange'>
      <Helmet>
        <title> {t('nav-header.sign-up')} | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='mx-auto max-w-[1024px] bg-loginRegister bg-contain bg-center bg-no-repeat lg:h-[520px]'>
          <div className='lg:py-15 grid grid-cols-1 lg:grid-cols-5 lg:pr-2'>
            <div className='py-12 lg:col-span-2 lg:col-start-4'>
              <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl'> {t('nav-header.sign-up')}</div>
                <Input
                  name='email'
                  type='text'
                  placeholder='Email'
                  register={register}
                  className='mt-8'
                  errorMessage={errors.email?.message}
                />
                <Input
                  name='password'
                  type='password'
                  placeholder='Password'
                  register={register}
                  className='relative mt-1'
                  classNameEye='absolute right-[5px] top-[13px] h-5 w-5 cursor-pointer'
                  errorMessage={errors.password?.message}
                  autoComplete='on'
                />
                <Input
                  name='confirm_password'
                  type='password'
                  placeholder='Confirm_password'
                  register={register}
                  className='relative mt-1'
                  classNameEye='absolute right-[5px] top-[13px] h-5 w-5 cursor-pointer'
                  errorMessage={errors.confirm_password?.message}
                  autoComplete='on'
                />

                {/* <div className='mt-2'>
                <input
                  type='password'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.password?.message}</div>
              </div> */}
                {/* <div className='mt-2'>
                <input
                  type='password'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Confirm_password'
                  autoComplete='on'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.confirm_password?.message}</div>
              </div> */}
                <div className='mt-1'>
                  <Button
                    type='submit'
                    className='flex w-full items-center justify-center rounded bg-red-500 py-3 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                    isLoading={registerAccountMutation.isLoading}
                    disabled={registerAccountMutation.isLoading}
                  >
                    {t('nav-header.sign-up')}
                  </Button>
                </div>
                <div className='mt-5 flex justify-center'>
                  <span className='text-gray-400'> {t('nav-header.have-account')}</span>
                  <Link className='ml-1 text-red-500' to={path.login}>
                    {t('nav-header.login')}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
