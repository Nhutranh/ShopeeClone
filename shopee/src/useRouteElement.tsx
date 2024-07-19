import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import Registerlayout from './layouts/RegisterLayout'
import MainLayout from './layouts/RegisterLayout/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './contenxts/app.context'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
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
      ]
    }
  ])

  return routeElement
}
