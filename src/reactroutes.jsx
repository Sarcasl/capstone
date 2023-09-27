import Products from './components/Products'
import App from './App'
import Login from './pages/Login'
import Checkout from './pages/Checkout'


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
    ]
  }
]
