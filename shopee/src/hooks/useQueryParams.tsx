import { useSearchParams } from 'react-router-dom'

export default function UseQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
