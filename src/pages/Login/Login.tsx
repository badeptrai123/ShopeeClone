import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import Input from 'src/components/Input'
import { getRules, schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { path } from 'src/constants/path'
import authApi from 'src/apis/auth.api'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { t } = useTranslation('home')
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  // const onSubmit = handleSubmit((data) => {
  //   loginMutation.mutate(data, {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => {
  //       if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
  //         const formError = error.response?.data.data
  //         if (formError) {
  //           Object.keys(formError).forEach((key) => {
  //             setError(key as keyof FormData, {
  //               message: formError[key as keyof FormData],
  //               type: 'Server'
  //             })
  //           })
  //         }
  //       }
  //     }
  //   })
  // })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
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
  })

  // const rules = getRules(getValues)
  return (
    <div className='bg-lightOrange'>
      <Helmet>
        <title>{t('nav-header.login')} | Shopee Clone</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='mx-auto max-w-[1024px] bg-loginRegister bg-contain bg-center bg-no-repeat lg:h-[520px]'>
          <div className='lg:py-17 grid grid-cols-1 lg:grid-cols-5 lg:pr-2'>
            <div className='py-16 lg:col-span-2 lg:col-start-4'>
              <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
                <div className='text-2xl'>{t('nav-header.login')}</div>
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
                  classNameEye='absolute right-[5px] top-[13px] h-5 w-5 cursor-pointer'
                  register={register}
                  className='relative mt-2'
                  errorMessage={errors.password?.message}
                  autoComplete='on'
                />

                <div className='mt-3'>
                  <Button
                    type='submit'
                    className='flex w-full items-center justify-center rounded bg-red-500 p-3 text-center text-sm uppercase text-white hover:bg-red-600'
                    isLoading={loginMutation.isLoading}
                    disabled={loginMutation.isLoading}
                  >
                    {t('nav-header.login')}
                  </Button>
                </div>
                <div className='mt-8 flex justify-center'>
                  <span className=' text-gray-400'>{t('nav-header.no-account')}</span>
                  <Link className='ml-1 text-red-500' to={path.register}>
                    {t('nav-header.sign-up')}
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
