import { useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import Registerlayout from './layouts/RegisterLayout'
import MainLayout from './layouts/RegisterLayout/MainLayout'

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <Registerlayout>
          <Login />
        </Registerlayout>
      )
    },
    {
      path: '/register',
      element: (
        <Registerlayout>
          <Register />
        </Registerlayout>
      )
    }
  ])

  return routeElement
}
