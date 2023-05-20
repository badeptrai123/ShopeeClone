import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <section className='bg-white dark:bg-gray-900'>
          <div className='mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6'>
            <div className='mx-auto max-w-screen-sm text-center'>
              <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
                500
              </h1>
              <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'>
                Something is missing.
              </p>
              <a
                href='/'
                className='my-4 inline-block rounded-md bg-orange px-6 py-3 text-center text-white transition-all hover:bg-orange/90'
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
