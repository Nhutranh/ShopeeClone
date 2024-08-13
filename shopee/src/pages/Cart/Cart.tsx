import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchaseApi from 'src/api/purcharse.api'
import Button from 'src/component/Button'
import Quanlity from 'src/component/Quanlity'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { fomatCurrency, generateNameID } from 'src/untils/untils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contenxts/app.context'

export default function Cart() {
  const { extendedPurrchase, setExtendedPurrchase } = useContext(AppContext)
  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })
  const updatePurrchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string | null })?.purchaseId

  const buyProductMuattion = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const purchasesInCart = purchaseInCartData?.data.data
  const isAllChecked = useMemo(() => extendedPurrchase.every((purchase) => purchase.checked), [extendedPurrchase])
  const checkedPurchase = useMemo(() => extendedPurrchase.filter((purchase) => purchase.checked), [extendedPurrchase])
  const checkedPurchaseCount = checkedPurchase.length
  const totalPrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchase]
  )
  const totalSavingPrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchase]
  )

  useEffect(() => {
    setExtendedPurrchase((prev) => {
      const extendedPurrchaseObj = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          {
            return {
              ...purchase,
              disabled: false,
              checked: isChoosenPurchaseFromLocation || Boolean(extendedPurrchaseObj[purchase._id]?.checked)
            }
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurrchase(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurrchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleQuatity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurrchase[purchaseIndex]
      setExtendedPurrchase(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurrchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurrchase(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseID = extendedPurrchase[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseID])
  }

  const handleManyPurchase = () => {
    const purchaseIDs = checkedPurchase.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIDs)
  }

  const handleBuyPurchase = () => {
    if (checkedPurchase.length > 0) {
      const body = checkedPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMuattion.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurrchase.length > 0 ? (
          <>
            <div className='overflow-auto '>
              <div className='min-w-[1000px] '>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow-sm'>
                  <div className='col-span-6 bg-white'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange-500'
                          checked={isAllChecked}
                          onClick={handleCheckAll}
                        />
                      </div>
                      <div>
                        <div className='flex-grow text-black ml-3'> Sản phẩm</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid text-center grid-cols-5'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurrchase?.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow-sm'>
                    {extendedPurrchase &&
                      extendedPurrchase?.map((purchase, index) => (
                        <div
                          key={purchase._id}
                          className='py-5 px-4 m-3 text-gray-500 grid grid-cols-12 text-center items-center rounded-sm border border-gray-200 bg-white'
                        >
                          <div className='col-span-6'>
                            <div className='flex'>
                              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                <input
                                  type='checkbox'
                                  className='h-5 w-5 accent-orange-500'
                                  checked={purchase.checked}
                                  onChange={handleCheck(index)}
                                />
                              </div>
                              <div className='flex-grow'>
                                <div className='flex'>
                                  <Link
                                    to={`${path.home}${generateNameID({ name: purchase.product.name, id: purchase.product._id })}`}
                                    className='h-20 w-20 flex-shrink-0 text-left'
                                  >
                                    <img alt={purchase.product.name} src={purchase.product.image} />
                                  </Link>
                                  <div className='flex-grow px-2 pt-1 pb-2 text-left'>
                                    <Link
                                      className='line-clamp-2'
                                      to={`${path.home}${generateNameID({ name: purchase.product.name, id: purchase.product._id })}`}
                                    >
                                      {purchase.product.name}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-6'>
                            <div className='grid grid-cols-5 items-center'>
                              <div className='col-span-2'>
                                <div className='flex items-center justify-center'>
                                  <span className='text-gray-300 line-through'>
                                    ₫{fomatCurrency(purchase.product.price_before_discount)}
                                  </span>
                                  <span className='ml-3 '>₫{fomatCurrency(purchase.product.price)}</span>
                                </div>
                              </div>
                              <div className='col-span-1'>
                                <Quanlity
                                  max={purchase.product.quantity}
                                  value={purchase.buy_count}
                                  onIncrease={(value) =>
                                    handleQuatity(index, value, value <= purchase.product.quantity)
                                  }
                                  onDecrease={(value) => handleQuatity(index, value, value >= 1)}
                                  disabled={purchase.disabled}
                                  onType={handleTypeQuantity(index)}
                                  onFocusOut={(value) => {
                                    handleQuatity(
                                      index,
                                      value,
                                      value >= 1 &&
                                        value <= purchase.product.quantity &&
                                        value !== (purchasesInCart as Purchase[])[index].buy_count
                                    )
                                  }}
                                />
                              </div>
                              <div className='col-span-1'>
                                <span className='text-orange-500'>
                                  ₫{fomatCurrency(purchase.product.price * purchase.buy_count)}
                                </span>
                              </div>
                              <div className='col-span-1'>
                                <button
                                  className='bg-none text-black transition-colors hover:text-orange-500'
                                  onClick={handleDelete(index)}
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 flex items-center rounded-sm bg-white p-5 shadow-sm border border-gray-200'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-orange-500'
                  checked={isAllChecked}
                  onClick={handleCheckAll}
                />
              </div>
              <button className='mx-3 border-none bg-none'>Chọn tất cả ({extendedPurrchase.length})</button>
              <button className='mx-3 border-none bg-none' onClick={handleManyPurchase}>
                Xóa
              </button>
              <div className='ml-auto flex items-center '>
                <div>
                  <div className='flex items-center justify-end'>
                    <div>Tổng thanh toán({checkedPurchaseCount} sản phẩm): </div>
                    <div className='ml-2 text-2xl text-orange-400'>đ{fomatCurrency(totalPrice)}</div>
                  </div>
                  <div className='flex items-center justify-end text-sm'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange-500'>đ{fomatCurrency(totalSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPurchase}
                  className=' flex rounded-sm ml-6 justify-center items-center h-10 w-52 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='bg-white text-center justify-center items-center py-10'>
            <span className='text-orange-500 text-lg px-4 py-3'>Bạn không có sản phẩm nào cả</span>
            <div className='mt-3'>
              <Link to={path.home} className='px-6 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-400 '>
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
