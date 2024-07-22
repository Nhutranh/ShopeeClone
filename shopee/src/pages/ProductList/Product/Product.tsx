import { Link } from 'react-router-dom'
import ProductRating from 'src/component/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { fomatCurrency, fomatNumberToSocialStyle } from 'src/untils/untils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to='/' className=''>
      <div className='bg-white shadow-sm rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            alt={product.name}
            className='absolute top-0 left-0  w-full h-full object-cover'
            src={product.image}
          ></img>
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm '>{product.name}</div>
          <div className='flex items-center mt-3'>
            <span className='text-xs'>₫</span>
            <span>{fomatCurrency(product.price_before_discount)}</span>
            <div className='text-orange-500 truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>{fomatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>Đã bán</span>
              <span className='ml-2'>{fomatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
