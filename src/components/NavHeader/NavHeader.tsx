import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { path } from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarUrl } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

export default function NavHeader() {
  const { i18n, t } = useTranslation('home')
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const currentLng = locales[i18n.language as keyof typeof locales]
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries(['purchases', { status: purchasesStatus.inCart }])
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const handleChangeLng = (lng: 'vi' | 'en') => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between md:py-1'>
      <ul className='flex items-center md:justify-end'>
        <li className='ml-2 cursor-pointer border-r-[2px] border-[#c6c1c1] border-opacity-40 pr-2 font-light transition-colors hover:text-[hsla(0,0%,100%,.7)] md:ml-1'>
          <a href='/'>{t('nav-header.seller-channel')}</a>
        </li>
        <li className='ml-1 cursor-pointer border-r-[2px] border-[#c6c1c1] border-opacity-40 px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'>
          <a href='/'>{t('nav-header.become-a-shoppe-seller')}</a>
        </li>
        <li className='ml-1 cursor-pointer border-r-[2px] border-[#c6c1c1] border-opacity-40 px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'>
          <a href='/'>{t('nav-header.download')}</a>
        </li>
        <li className='ml-1 cursor-pointer border-[#c6c1c1] border-opacity-40 px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'>
          <a href='/'>{t('nav-header.connect')}</a>
        </li>
      </ul>
      <div className='my-1 flex items-center md:mt-0 md:justify-end'>
        <div className='mr-1 flex cursor-pointer items-center px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'>
          <svg viewBox='3 2.5 14 14' x='0' y='0' className='mr-1 h-[1.125rem]  w-[0.875rem] bg-transparent fill-white'>
            <path d='m17 15.6-.6-1.2-.6-1.2v-7.3c0-.2 0-.4-.1-.6-.3-1.2-1.4-2.2-2.7-2.2h-1c-.3-.7-1.1-1.2-2.1-1.2s-1.8.5-2.1 1.3h-.8c-1.5 0-2.8 1.2-2.8 2.7v7.2l-1.2 2.5-.2.4h14.4zm-12.2-.8.1-.2.5-1v-.1-7.6c0-.8.7-1.5 1.5-1.5h6.1c.8 0 1.5.7 1.5 1.5v7.5.1l.6 1.2h-10.3z'></path>
            <path d='m10 18c1 0 1.9-.6 2.3-1.4h-4.6c.4.9 1.3 1.4 2.3 1.4z'></path>
          </svg>
          <span>{t('nav-header.notifications')}</span>
        </div>
        <div className='mr-1 flex cursor-pointer items-center px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'>
          <svg
            height='16'
            viewBox='0 0 16 16'
            width='16'
            className='mr-1 h-[1.125rem]  w-[0.875rem] bg-transparent fill-white'
          >
            <g fill='none' fillRule='evenodd' transform='translate(1)'>
              <circle cx='7' cy='8' r='7' stroke='currentColor'></circle>
              <path
                fill='currentColor'
                d='m6.871 3.992c-.814 0-1.452.231-1.914.704-.462.462-.693 1.089-.693 1.892h1.155c0-.484.099-.858.297-1.122.22-.319.583-.473 1.078-.473.396 0 .715.11.935.33.209.22.319.517.319.902 0 .286-.11.55-.308.803l-.187.209c-.682.605-1.1 1.056-1.243 1.364-.154.286-.22.638-.22 1.045v.187h1.177v-.187c0-.264.055-.506.176-.726.099-.198.253-.396.462-.572.517-.451.825-.737.924-.858.275-.352.418-.803.418-1.342 0-.66-.22-1.188-.66-1.573-.44-.396-1.012-.583-1.716-.583zm-.198 6.435c-.22 0-.418.066-.572.22-.154.143-.231.33-.231.561 0 .22.077.407.231.561s.352.231.572.231.418-.077.572-.22c.154-.154.242-.341.242-.572s-.077-.418-.231-.561c-.154-.154-.352-.22-.583-.22z'
              ></path>
            </g>
          </svg>
          <span>{t('nav-header.help')}</span>
        </div>
        <Popover
          renderPopover={
            <div className='relative right-5 rounded-sm border border-gray-200 bg-white text-[13px] shadow-md'>
              <div className='flex cursor-pointer flex-col py-1 pl-3 pr-20'>
                <button className='py-2 hover:text-orange' onClick={() => handleChangeLng('vi')}>
                  Tiếng Việt
                </button>
                <button className='mt-2 py-2 hover:text-orange' onClick={() => handleChangeLng('en')}>
                  English
                </button>
              </div>
            </div>
          }
          className='mr-1 flex cursor-pointer items-center px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='mr-1 h-[1.125rem]  w-[0.875rem] bg-transparent'
          >
            <path
              d='M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
            <path
              d='M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
            <path d='M1.33398 8H14.6673' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'></path>
          </svg>
          <span>{currentLng}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='ml-1 h-[1.125rem]  w-[0.975rem]'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {isAuthenticated && (
          <Popover
            renderPopover={
              <div className='rounded-sm border border-gray-200 bg-white text-[13px] shadow-md'>
                <div className='flex flex-col py-1 px-3 capitalize'>
                  <Link to={path.profile} className='min-w-[130px] py-[10px] transition-colors hover:text-[#00bfa5]'>
                    {t('nav-header.my-account')}
                  </Link>
                  <Link
                    to={path.historyPurchase}
                    className='min-w-[130px] py-[10px] transition-colors hover:text-[#00bfa5]'
                  >
                    {t('nav-header.my-purchase')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='min-w-[130px] py-[10px] text-left transition-colors hover:text-[#00bfa5]'
                  >
                    {t('nav-header.logout')}
                  </button>
                </div>
              </div>
            }
            className='mr-1 flex cursor-pointer items-center px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'
          >
            <div className='mr-1 h-6 w-6 flex-shrink-0'>
              <img src={getAvatarUrl(profile?.avatar)} alt='' className='h-full w-full rounded-full object-cover' />
            </div>
            <span>{profile?.email}</span>
          </Popover>
        )}

        {!isAuthenticated && (
          <div className='flex items-center'>
            <div className='mr-1 cursor-pointer border-r-[1px] border-[#c6c1c1] border-opacity-40 px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'>
              <Link to={path.register}>{t('nav-header.sign-up')}</Link>
            </div>
            <div className='mr-1 cursor-pointer px-2 transition-colors hover:text-[hsla(0,0%,100%,.7)]'>
              <Link to={path.login}>{t('nav-header.login')}</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
