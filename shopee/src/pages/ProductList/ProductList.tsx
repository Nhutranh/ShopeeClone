import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import UseQueryParams from 'src/hooks/useQueryParams'
import ProductApi from 'src/api/Product.api'
import Paginate from 'src/component/Paginate'
import { ProductListConfig } from 'src/types/product.type'
import { omitBy, isUndefined } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = UseQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return ProductApi.getProduct(queryConfig as ProductListConfig)
    }
  })
  console.log(data)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data && (
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
              <Paginate queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
