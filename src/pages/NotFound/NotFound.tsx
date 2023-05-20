import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <Helmet>
        <title>It looks like something is missing!</title>
        <meta name='description' content='Trang này không tồn tại trên hệ thống' />
      </Helmet>
      <div className='mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'>
            Something is missing.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            Sorry, we can not find that page. You will find lots to explore on the home page.{' '}
          </p>
          <Link
            to='/'
            className='my-4 inline-block rounded-md bg-orange px-6 py-3 text-center text-white transition-all hover:bg-orange/90'
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
