import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberSocialType, getIdFromNamId, rateSale } from 'src/utils/utils'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'
export default function ProductDetail() {
  const { t } = useTranslation(['product'])
  const { nameId } = useParams()
  const id = getIdFromNamId(nameId as string)
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const { data: ProductDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = ProductDetailData?.data.data
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  // Zoom image
  const imageRef = useRef<HTMLImageElement>(null)
  const [buyCount, setBuyCount] = useState(1)

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])
  const currentImages = useMemo(
    () => (product && product.images.slice(...currentIndexImage)) || [],
    [product, currentIndexImage]
  )
  // Sản phẩm tương tự
  const queryConfig: ProductListConfig = { limit: 20, page: 1, category: product?.category._id }
  const { data: ProductData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })
  const chooseImage = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImage[1] < (product as ProductType)?.images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  // Handle Zoom
  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    // naturalWidth,naturalHeight la width and heigh ban dau cua image
    const { naturalWidth, naturalHeight } = image
    // cach 1: phari dung pointer-events-none
    // const { offsetX, offsetY } = e.nativeEvent

    // cach 2
    const offsetX = e.pageX - (rect.x + window.scrollX)
    const offsetY = e.pageY - (rect.y + window.scrollY)
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  // handle Buy Count
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const queryClient = useQueryClient()
  // add to cart
  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body),
    onSuccess: (data) => {
      toast(data.data.message, { autoClose: 1000 })
      queryClient.invalidateQueries(['purchases', { status: purchasesStatus.inCart }])
    }
  })
  const addToCart = () => {
    if (isAuthenticated) {
      addToCartMutation.mutate({ product_id: product?._id as string, buy_count: buyCount })
    } else {
      navigate('/login')
    }
  }
  // buy now
  const handleBuyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: product?._id as string, buy_count: buyCount })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{product.name}</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 120,
              ellipsis: '...'
            }
          })}
        />
      </Helmet>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%]'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='absolute top-0 left-0 h-full w-full  object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='relative col-span-1 w-full cursor-pointer pt-[100%]'
                      key={img}
                      onMouseEnter={() => chooseImage(img)}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-2 flex items-center'>
                <span className='mr-1 border-b-2 border-b-orange text-orange'>{product.rating}</span>
                <ProductRating
                  rating={product.rating}
                  activeClassName='h-4 w-4 fill-orange'
                  nonActiveClassName='h4 w-4 fill-[#d5d5d5]'
                />
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <span className='mr-1'>{formatNumberSocialType(product.sold)}</span>
                <span className='ml-1 text-sm text-gray-500'> {t('product:sold')}</span>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='mr-2 text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 bg-orange'>
                  <span className='rounded p-1  text-xs font-[600] uppercase text-white'>
                    {rateSale(product.price, product.price_before_discount)} {t('product:off')}
                  </span>
                </div>
              </div>
              <div className='mt-8 flex items-center px-5 text-gray-500'>
                <span className='text-sm capitalize'> {t('product:quantity')}</span>
                <QuantityController
                  max={product.quantity}
                  onType={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  value={buyCount}
                />
                <span className='ml-6'>
                  {product.quantity} {t('product:available')}
                </span>
              </div>
              <div className='mt-8 flex items-center px-5'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-4 capitalize text-orange outline-none transition-colors hover:bg-orange/5'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-2 h-5 w-5 fill-orange text-orange '
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  {t('product:add-to-cart')}
                </button>
                <button
                  className='ml-3 h-12 rounded-sm bg-orange px-4 text-center capitalize text-white hover:bg-orange/90'
                  onClick={handleBuyNow}
                >
                  {t('product:buy-now')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='bg-white p-4 shadow'>
            <div className='bg-gray-50 px-4 py-3 text-xl uppercase'> {t('product:product-description')}</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-500'> {t('product:you-may-also-like')}</div>
          {ProductData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {ProductData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
