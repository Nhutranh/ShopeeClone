import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/Component/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import Registerlayout from './layouts/RegisterLayout'
import { useContext } from 'react'
import { AppContext } from './contenxts/app.context'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import MainLayout from './layouts/MainLayout'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/Layout/UserLayout'
import ChangePassword from './pages/User/Pages/ChangePassword'
import Profile from './pages/User/Pages/Profile'
import History from './pages/User/Pages/HistoryPurchase'

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
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changepassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <History />
            }
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
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
