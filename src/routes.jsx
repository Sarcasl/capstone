// import Home from './pages/Home'
import Products from './components/Products'
import App from './App'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import NotFound from './components/NotFound'
import Register from './pages/Register'

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Products />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/404',
        element: <NotFound />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]
