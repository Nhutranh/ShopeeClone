import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/api/purcharse.api'
import Button from 'src/component/Button'
import Quanlity from 'src/component/Quanlity'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { fomatCurrency, generateNameID } from 'src/untils/untils'
import { produce } from 'immer'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurrchase, setExtendedPurrchase] = useState<ExtendedPurchase[]>([])
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })
  const purchasesInCart = purchaseInCartData?.data.data
  const isAllChecked = extendedPurrchase.every((purchase) => purchase.checked)
  useEffect(() => {
    setExtendedPurrchase(
      purchasesInCart?.map((purchase) => ({
        ...purchase,
        disabled: false,
        checked: false
      })) || []
    )
  }, [purchasesInCart])

  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurrchase(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
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
  console.log(extendedPurrchase)

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
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
            <div className='my-3 rounded-sm bg-white p-5 shadow-sm'>
              {extendedPurrchase?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='py-5 px-4 m-3 text-gray-500 grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white'
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
                            className='h-20 w-20 flex-shrink-0'
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
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
                        <Quanlity max={purchase.product.quantity} value={purchase.buy_count} />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange-500'>
                          ₫{fomatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <div className='bg-none text-black transition-colors hover:text-orange-500'>Xóa</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          <button className='mx-3 border-none bg-none'>Xóa</button>
          <div className='ml-auto flex items-center '>
            <div>
              <div className='flex items-center justify-end'>
                <div>Tổng thanh toán(0 sản phẩm): </div>
                <div className='ml-2 text-2xl text-orange-400'>đ138000</div>
              </div>
              <div className='flex items-center justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange-500'>đ138000</div>
              </div>
            </div>
            <Button className=' flex rounded-sm ml-6 justify-center items-center h-10 w-52 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
