import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import { path } from 'src/constants/path'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_max', 'price_min'])
export default function AsideFilter({ categories, queryConfig }: Props) {
  const { t } = useTranslation('home')
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  // const valueForm = watch()
  // console.log(valueForm)
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })
  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='py-4'>
      {/* Tất cả danh mục */}
      <div className='mb-4'>
        <Link
          to='/'
          className={classNames('flex items-center text-sm font-bold capitalize', {
            'text-orange': !category
          })}
        >
          <svg viewBox='0 0 12 10' className='mr-2 h-3 w-3 fill-current'>
            <g fillRule='evenodd' stroke='none' strokeWidth='1'>
              <g transform='translate(-373 -208)'>
                <g transform='translate(155 191)'>
                  <g transform='translate(218 17)'>
                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          {t('aside-filter.all-categories')}
        </Link>
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <ul>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='py-1 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative flex items-center text-sm', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='absolute left-[-12px] h-2 w-2 fill-orange'>
                      <polygon points='4 3.5 0 0 0 7'></polygon>
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {/* // Bộ lọc */}
      <div className='mb-4 mt-8 text-sm'>
        <Link to='/' className='flex items-center text-sm font-semibold uppercase'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mr-2 h-3 w-3'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
            />
          </svg>
          {t('aside-filter.filter-search')}
        </Link>
        <div className='mt-4 text-sm'>
          <span>Theo danh mục</span>
          <ul className='mt-3 text-[13px]'>
            <li className=' py-1'>
              <div className='flex cursor-pointer items-start'>
                <input type='checkbox' id='1' className='mt-1 h-3 w-3 border checked:border checked:accent-orange' />
                <label htmlFor='1' className='ml-2'>
                  Vỏ bao, Ốp lưng & Miếng dán điện thoại (2tr+)
                </label>
              </div>
            </li>
            <li className=' py-1'>
              <div className='flex cursor-pointer items-start'>
                <input type='checkbox' id='1' className='mt-1 h-3 w-3 border checked:border checked:accent-orange' />
                <label htmlFor='1' className='ml-2'>
                  Vỏ bao, Ốp lưng & Miếng dán điện thoại (2tr+)
                </label>
              </div>
            </li>
            <li className=' py-1'>
              <div className='flex cursor-pointer items-start'>
                <input type='checkbox' id='1' className='mt-1 h-3 w-3 border checked:border checked:accent-orange' />
                <label htmlFor='1' className='ml-2'>
                  Vỏ bao, Ốp lưng & Miếng dán điện thoại (2tr+)
                </label>
              </div>
            </li>
          </ul>
          {/* <div className='my-4 h-[1px] bg-gray-300'></div> */}
          {/* <span>Nơi bán</span>
          <ul className='mt-3'>
            <li className=' py-1'>
              <div className='flex cursor-pointer items-start'>
                <input type='checkbox' id='1' className='mt-1 h-3 w-3 border checked:border checked:accent-orange' />
                <label htmlFor='1' className='ml-2'>
                  TP. Hồ Chí Minh
                </label>
              </div>
            </li>
            <li className=' py-1'>
              <div className='flex cursor-pointer items-start'>
                <input type='checkbox' id='1' className='mt-1 h-3 w-3 border checked:border checked:accent-orange' />
                <label htmlFor='1' className='ml-2'>
                  Bình Dương
                </label>
              </div>
            </li>
            <li className=' py-1'>
              <div className='flex cursor-pointer items-start'>
                <input type='checkbox' id='1' className='mt-1 h-3 w-3 border checked:border checked:accent-orange' />
                <label htmlFor='1' className='ml-2'>
                  Đồng Nai
                </label>
              </div>
            </li>
          </ul> */}
        </div>
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <div className='mt-4'>
          <div>{t('aside-filter.price-range')}</div>
          <form className='mt-2' onSubmit={onSubmit}>
            <div className='item-center flex'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='flex-grow'
                      classNameInput='w-full rounded-sm border border-gray-400 p-1 outline-none focus:shadow-sm placeholder:text-[12px] placeholder:text-gray-500'
                      placeholder={`₫ ${t('aside-filter.min')}`}
                      classNameError='hidden'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_max')
                      }}
                    />
                  )
                }}
              />

              <div className='my-1 mx-3 shrink-0'>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='flex-grow'
                      classNameInput='w-full rounded-sm border border-gray-400 p-1 outline-none focus:shadow-sm placeholder:text-[12px] placeholder:text-gray-500'
                      placeholder={`₫ ${t('aside-filter.max')}`}
                      classNameError='hidden'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_min')
                      }}
                    />
                  )
                }}
              />
            </div>
            <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
            <Button className='w-full bg-orange py-1 uppercase text-white hover:opacity-90'>
              {t('aside-filter.apply')}
            </Button>
          </form>
        </div>
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <div className='mt-4'>
          <div>{t('aside-filter.rating')}</div>
          <RatingStars queryConfig={queryConfig} />
        </div>
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <Button className='w-full bg-orange py-1 uppercase text-white hover:opacity-90' onClick={handleRemoveAll}>
          {t('aside-filter.clear-all')}
        </Button>
      </div>
    </div>
  )
}
