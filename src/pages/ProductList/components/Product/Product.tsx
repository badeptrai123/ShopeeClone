import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberSocialType, generateNameId } from 'src/utils/utils'
import ProductRating from 'src/components/ProductRating'
import { path } from 'src/constants/path'
import { useTranslation } from 'react-i18next'

interface ProductProps {
  product: ProductType
}
export default function Product({ product }: ProductProps) {
  const { t } = useTranslation('product')
  return (
    <Link to={`${path.home}${generateNameId(product.name, product._id)}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform hover:translate-y-[-0.03rem] hover:shadow-md '>
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt={product.name} className='absolute top-0 left-0 h-full w-full object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[1.75rem] text-[.75rem] line-clamp-2 '>{product.name}</div>
          <div className='flex justify-start py-2'>
            <div className='max-w-[50%] truncate text-gray-500 '>
              <span className='text-xs'>₫</span>
              <span className='text-sm line-through'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='flex items-center'>
            <ProductRating rating={product.rating} />
            <span className='ml-1 text-xs lowercase'>
              {t('sold')} {formatNumberSocialType(product.sold)}
            </span>
          </div>
          {/* <span className='mt-2 text-xs text-gray-500'></span> */}
        </div>
      </div>
    </Link>
  )
}
