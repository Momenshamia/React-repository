import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Notfound from './Components/Notfound/Notfound';
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import Allorders from './Components/Allorders/Allorders';
import Wishlist from './Components/Wishlist/Wishlist';
import WishlistContextProvider from './Context/WishlistContext'




let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [

      { index: true, element: <ProtectedRoute><Home />{" "} </ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart />{" "}</ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands />{" "}</ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist />{" "}</ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><Allorders />{" "}</ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories />{" "}</ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products />{" "} </ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails />{" "} </ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><Checkout /> {" "}</ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);



function App() {
  const [count, setCount] = useState(0)

  return <>


    <UserContextProvider>
      <CounterContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={x}></RouterProvider>
              <Toaster />
            </WishlistContextProvider>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </CounterContextProvider>
    </UserContextProvider>


  </>

}

export default App
