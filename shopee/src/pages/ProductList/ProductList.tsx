import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import UseQueryParams from 'src/hooks/useQueryParams'
import ProductApi from 'src/api/Product.api'
import Paginate from 'src/component/Paginate'
import { useState } from 'react'

export default function ProductList() {
  const queryParams = UseQueryParams()
  const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return ProductApi.getProduct(queryParams)
    }
  })
  console.log(data)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid gris-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data?.data?.data?.products?.map((product) => (
                <div key={product._id} className='col-span-1'>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <Paginate page={page} setPage={setPage} pageSize={20} />
          </div>
        </div>
      </div>
    </div>
  )
}
