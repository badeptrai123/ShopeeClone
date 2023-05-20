import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { path } from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import noProduct from 'src/assets/images/no-product.png'
import { AppContext } from 'src/contexts/app.context'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function Cart() {
  const { t } = useTranslation(['cart', 'home', 'product'])
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  const totalCheckedPurchasesPriceSaving = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const queryClient = useQueryClient()
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
      queryClient.invalidateQueries(['purchases', { status: purchasesStatus.inCart }])
    }
  })
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data
  // location
  const location = useLocation()
  const choosePurchaseIdFromLocation = (location.state as { purchaseId: string })?.purchaseId

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosePurchaseIdFromLocation = choosePurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosePurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasesInCart, choosePurchaseIdFromLocation])
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])
  const handleChecked = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = e.target.checked
      })
    )
  }
  const handleCheckedAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    console.log(enable)
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  // delete
  const handleDelete = (purchaseIndex: number) => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }
  const handleDeleteMutiplePurchases = () => {
    const purchaseIds = checkedPurchases.map((purcharse) => purcharse._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }
  //buy purchase
  const handleBuyPurchase = () => {
    if (checkedPurchasesCount > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{t('cart:shopping-cart')} | Shopee Clone</title>
        <meta name='description' content='Đây là giỏi hàng của dự án Shoppe Clone' />
      </Helmet>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 bg-white px-10 py-5 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-4 w-4 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckedAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>{t('cart:product')}</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>{t('cart:unit-price')}</div>
                      <div className='col-span-1'>{t('cart:quantity')}</div>
                      <div className='col-span-1'>{t('cart:total-price')}</div>
                      <div className='col-span-1'>{t('cart:actions')}</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-4'>
                    {extendedPurchases?.map((purchase, index) => {
                      return (
                        <div
                          key={purchase._id}
                          className='mb-4 grid grid-cols-12 border border-gray-200 px-6 py-4 text-sm text-gray-500'
                        >
                          <div className='col-span-6'>
                            <div className='flex items-center'>
                              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                <input
                                  type='checkbox'
                                  className='h-4 w-4 accent-orange'
                                  checked={purchase.checked}
                                  onChange={handleChecked(index)}
                                />
                              </div>
                              <div className='flex-grow'>
                                <div className='flex'>
                                  <Link
                                    to={`${path.home}${generateNameId(purchase.product.name, purchase.product._id)}`}
                                    className='h-20 w-20 flex-shrink-0'
                                  >
                                    <img
                                      src={purchase.product.image}
                                      alt={purchase.product.name}
                                      className='object-cover'
                                    />
                                  </Link>
                                  <div className='flex-grow px-2 pb-2 pt-1'>
                                    <Link
                                      to={`${path.home}${generateNameId(purchase.product.name, purchase.product._id)}`}
                                      className='line-clamp-2'
                                    >
                                      {purchase.product.name}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-6 flex items-center'>
                            <div className='grid grid-cols-5 text-center'>
                              <div className='col-span-2'>
                                <div className='flex items-center justify-center'>
                                  <span className='text-gray-500 line-through'>
                                    ₫{formatCurrency(purchase.product.price_before_discount)}
                                  </span>
                                  <span className='ml-3 text-black'>₫{formatCurrency(purchase.product.price)}</span>
                                </div>
                              </div>
                              <div className='col-span-1'>
                                <QuantityController
                                  max={purchase.product.quantity}
                                  value={purchase.buy_count}
                                  classNameWrapper='flex items-center mt-[-8px]'
                                  onIncrease={(value) =>
                                    handleQuantity(index, value, value <= purchase.product.quantity)
                                  }
                                  onDecrease={(value) => {
                                    console.log(value)
                                    handleQuantity(index, value, value >= 1)
                                  }}
                                  onType={handleTypeQuantity(index)}
                                  onFocusOut={(value) =>
                                    handleQuantity(
                                      index,
                                      value,
                                      value <= purchase.product.quantity &&
                                        value >= 1 &&
                                        value !== (purchasesInCart as Purchase[])[index].buy_count
                                    )
                                  }
                                  disabled={purchase.disabled}
                                />
                              </div>
                              <div className='col-span-1'>
                                <span className='text-orange'>
                                  ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                                </span>
                              </div>
                              <div className='col-span-1'>
                                <button
                                  className='text-black transition-colors hover:text-orange'
                                  onClick={() => handleDelete(index)}
                                >
                                  {t('cart:delete')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-4 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center capitalize'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckedAll}
                  />
                </div>
                <button className='mx-5 border-none bg-none' onClick={handleCheckedAll}>
                  {t('cart:select-all')} ({extendedPurchases.length})
                </button>
                <button className='mx-5 border-none bg-none' onClick={handleDeleteMutiplePurchases}>
                  {t('cart:delete')}
                </button>
              </div>
              <div className='mt-5 flex flex-col sm:ml-auto sm:flex-row sm:items-center'>
                <div className='flex flex-col'>
                  <div className='flex items-center sm:justify-end'>
                    <div>
                      {t('cart:total')} ({checkedPurchasesCount} {t('cart:item')}):
                    </div>
                    <div className='ml-2 text-[20px] text-orange'>₫{formatCurrency(totalCheckedPurchasesPrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className=''>{t('cart:save')}</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchasesPriceSaving)}</div>
                  </div>
                </div>
                <Button
                  className='mt-5 flex h-10 w-52 items-center justify-center rounded-sm bg-orange text-sm uppercase text-white transition-colors hover:bg-orange/90 sm:ml-3 sm:mt-0'
                  onClick={handleBuyPurchase}
                  disabled={buyProductMutation.isLoading}
                >
                  {t('cart:check-out')}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center py-20'>
            <img src={noProduct} alt='no-product' className='h-24 w-24 object-cover' />
            <span className='text-sm text-gray-400'>{t('cart:empty')}</span>
            <Link
              to='/'
              className='mt-4 rounded-sm bg-orange px-10 py-2 capitalize text-white transition-all hover:bg-orange/90'
            >
              {t('product:buy-now')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
