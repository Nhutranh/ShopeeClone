import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/Component/ProductList'
import Login from './pages/Component/Login'
import Register from './pages/Component/Register'
import Registerlayout from './layouts/RegisterLayout'
import MainLayout from './layouts/RegisterLayout/MainLayout'
import Profile from './pages/Component/Profile'
import { useContext } from 'react'
import { AppContext } from './contenxts/app.context'
import path from './constants/path'

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
          path: path.profile,
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
          path: path.login,
          element: (
            <Registerlayout>
              <Login />
            </Registerlayout>
          )
        },
        {
          path: path.register,
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
