import { order as OrderConstant, sortBy } from 'src/constants/product'
import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { t } = useTranslation('home')
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sortByValue === sort_by
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='py-4 text-sm'>
      <div className='flex items-center justify-between gap-2 bg-[#ededed] py-4'>
        <div className='flex items-center px-4'>
          <span>{t('sort-products.sort-by')}</span>
          <div className='ml-5 flex justify-start gap-2 '>
            <button
              className={classNames('rounded-sm py-2 px-3 capitalize', {
                'bg-orange text-white transition-colors hover:bg-orange/90': isActiveSortBy(sortBy.view),
                'bg-white text-black transition-colors hover:bg-slate-100': !isActiveSortBy(sortBy.view)
              })}
              onClick={() => handleSort(sortBy.view)}
            >
              {t('sort-products.popular')}
            </button>
            <button
              className={classNames('rounded-sm py-2 px-3 capitalize', {
                'bg-orange text-white transition-colors hover:bg-orange/90': isActiveSortBy(sortBy.createdAt),
                'bg-white text-black transition-colors hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
              })}
              onClick={() => handleSort(sortBy.createdAt)}
            >
              {t('sort-products.latest')}
            </button>
            <button
              className={classNames('rounded-sm py-2 px-3 capitalize', {
                'bg-orange text-white transition-colors hover:bg-orange/90': isActiveSortBy(sortBy.sold),
                'bg-white text-black transition-colors hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
              })}
              onClick={() => handleSort(sortBy.sold)}
            >
              {t('sort-products.top-sales')}
            </button>
            <select
              className={classNames('h-9 bg-white px-4 capitalize outline-none hover:bg-slate-100', {
                'text-orange': isActiveSortBy(sortBy.price),
                'text-black': !isActiveSortBy(sortBy.price)
              })}
              value={order || ''}
              onChange={(e) => handlePriceOrder(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
            >
              <option value='' disabled>
                {t('sort-products.price')}
              </option>
              <option className='bg-white text-black' value={OrderConstant.asc}>
                {t('sort-products.price')}: {t('sort-products.low-to-high')}
              </option>
              <option className='bg-white text-black' value={OrderConstant.desc}>
                {t('sort-products.price')}: {t('sort-products.high-to-low')}
              </option>
            </select>
          </div>
        </div>
        <div className='mr-6 flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex h-8 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm border-r-2 bg-white/50 px-2'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 items-center rounded-tl-sm rounded-bl-sm border-r-2 bg-white px-2'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex h-8 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/50 px-2'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 items-center rounded-tl-sm rounded-bl-sm bg-white px-2'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
