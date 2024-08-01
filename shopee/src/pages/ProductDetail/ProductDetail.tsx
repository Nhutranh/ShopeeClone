import { useMutation, useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductApi from 'src/api/Product.api'
import ProductRating from 'src/component/ProductRating'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { fomatCurrency, fomatNumberToSocialStyle, getIDFromNameID, rateSale } from 'src/untils/untils'
import Product from '../Component/ProductList/Component/Product'
import Quanlity from 'src/component/Quanlity'
import purchaseApi from 'src/api/purcharse.api'
import { queryClient } from 'src/main'
import { purchaseStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIDFromNameID(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductApi.getProductDetail(id as string)
  })

  const product = productDetailData?.data.data
  const [curentIndexImages, setCurentIndexImages] = useState([0, 5])
  const [curentActiveImage, setCurentActiveImage] = useState('')
  const imagesRef = useRef<HTMLImageElement>(null)
  const curentImages = useMemo(
    () => (product ? product?.images.slice(...curentIndexImages) : []),
    [product, curentIndexImages]
  )

  const addTocartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body)
  })

  const queryConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return ProductApi.getProduct(queryConfig as unknown as ProductListConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setCurentActiveImage(product.images[0])
    }
  }, [product])

  const next = () => {
    if (curentIndexImages[1] < (product as ProductType)?.images.length) {
      setCurentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (curentIndexImages[0] > 0) {
      setCurentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chosseActive = (img: string) => {
    setCurentActiveImage(img)
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const images = imagesRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = images
    //CÁCH 1:  Lấy offsetX và offsetY để tính được tọa độ khi chúng ta đã xử lý được bubble event
    // (bubble event là khi hover chuột và thẻ cha có thẻ con chồng nhau và sự kiện của mỗi thẻ chồng chéo lên nhau)
    //const { offsetX, offsetY } = event.nativeEvent

    //CÁCH 2: Lấy offsetX và offsetY để tính được tọa độ khi chúng ta  chưa xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    images.style.width = naturalWidth + 'px'
    images.style.height = naturalHeight + 'px'
    images.style.maxWidth = 'unset'
    images.style.top = top + 'px'
    images.style.left = left + 'px'
  }

  const hanldeRemoveZoom = () => {
    imagesRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addTocartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: () => {
          toast.success('Thêm sản phẩm thành công')
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
        }
      }
    )
  }

  if (!product) return null

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow-sm'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow-md overflow-hidden cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={hanldeRemoveZoom}
              >
                <img
                  alt={product.name}
                  className='absolute pointer-events-none top-0 left-0  w-full h-full object-cover'
                  src={curentActiveImage}
                  ref={imagesRef}
                ></img>
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  onClick={prev}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {curentImages.map((img) => {
                  const isActive = img === curentActiveImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chosseActive(img)}>
                      <img
                        alt={product.name}
                        className='absolute top-0 cursor-pointer left-0  w-full h-full object-cover'
                        src={img}
                      ></img>
                      {isActive && <div className='absolute inset-0 border-2 border-orange-500'></div>}
                    </div>
                  )
                })}
                <button
                  onClick={next}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className=' text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex item-center'>
                  <span className='mr-1 border-b border-b-orange-500 text-orange-500'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange-500 text-orange-500 h-4 w-4'
                    nonActiveClassname='fill-gray-400 text-orange-500 h-4 w-4 text-gray-300'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{fomatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex item-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{fomatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-2xl font-medium text-orange-500'>₫{fomatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange-500 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'> Số lượng</div>
                <Quanlity
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange-500 bg-orange-100 px-5 capitalize text-orange-500 shadow-sm hover:bg-orange-50'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  <span className='ml-3'>Thêm vào giỏ hàng</span>
                </button>
                <button className='flex ml-4 h-12 items-center justify-center rounded-sm border border-orange-500 bg-orange-500 px-5 capitalize text-white shadow-sm hover:bg-orange-400'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='mt-8 bg-white shadow-sm p-4'>
          <div className=' rounded bg-gray-50 text-lg capitalize text-gray-400'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
            /
          </div>
        </div>
      </div>
      <div className='mt-8 '>
        <div className='container'>
          <div className='uppercase text-gray-500'>Có thể bạn cũng thích</div>
          <div className='mt-6 grid gris-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
            {productsData?.data?.data?.products?.map((product) => (
              <div key={product._id} className='col-span-1'>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
