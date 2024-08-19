import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from 'src/api/purcharse.api'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import UseQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { fomatCurrency, generateNameID } from 'src/untils/untils'

const purchaseTabs = [
  { status: purchaseStatus.all, name: 'Tất cả' },
  { status: purchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waiForGetting, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.inProgress, name: 'Đang giao hàng' },
  { status: purchaseStatus.delivered, name: 'Đã giao hàng' },
  { status: purchaseStatus.cancelled, name: 'Đã hủy' }
]

export default function History() {
  const queryParams: { status?: string } = UseQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.all

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchaseInCartData?.data.data

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='flex stickey top-0 shadow-sm'>
            {purchaseTabs.map((item) => (
              <Link
                key={item.name}
                to={{
                  pathname: path.historyPurchase,
                  search: createSearchParams({
                    status: String(item.status)
                  }).toString()
                }}
                className={classNames(
                  'flex flex-1 px-3 py-2 items-center justify-center border-b bg-white text-center',
                  {
                    'border-b-orange-500 text-orange-500': status === item.status,
                    'border-b-black/10 text-gray-500': status !== item.status
                  }
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm shadow-sm border-black/10 bg-white p-6 text-gray-800 '>
                <Link
                  to={`${path.home}${generateNameID({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex '
                >
                  <div className='flex-shrink-0'>
                    <img src={purchase.product.image} alt={purchase.product.name} className='h-20 w-20 object-cover' />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-400 line-through'>
                      đ{fomatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange-500'>đ{fomatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div className=''>
                    <span>Tổng giá tiền: </span>
                    <span className='ml-2 text-xl text-orange-500'>
                      đ{fomatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
