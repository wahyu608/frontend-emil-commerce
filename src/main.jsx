import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Index from './index.jsx';
import './index.css';
import LoginUser from './pages/user/login.jsx';
import LoginAdmin from './pages/admin/login.jsx';
import Register from './pages/user/register.jsx';
import ResetPassword from './pages/user/resetPassword.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'typeface-poppins';
import ErrorPage from './errorPage.jsx';
import ForgotPassword from './pages/user/forgotPassword.jsx';
import Home from './pages/home/home.jsx';
import DetailProduk from './pages/home/detailProduk.jsx';
import Cart from './pages/home/cart.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Users from './pages/admin/user.jsx';
import Product from './pages/admin/product.jsx';
import Stock from './pages/admin/stock.jsx';
import Transaksi from './pages/admin/transaksi.jsx';
import Admin from './pages/admin/admin.jsx';
import Produk from './pages/home/produk.jsx';
import Kategori from './pages/home/kategori.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const router = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage />
  },
  {
    path: '/loginUser',
    element: <LoginUser />,
    errorElement: <ErrorPage />
  },
  {
    path: '/loginAdmin',
    element: <LoginAdmin />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: '/resetPassword',
    element: <ResetPassword />,
    errorElement: <ErrorPage />
  },
  {
    path: '/forgotPassword',
    element: <ForgotPassword />,
    errorElement: <ErrorPage />
  },
  {
    path: '/',
    element: <Navigate to="/home" replace />
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'produk',
        element: <Produk />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'kategori',
        element: <Kategori />,
        errorElement: <ErrorPage />
      },
      {
        path: 'detail/:productId',
        element: <DetailProduk />,
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: '/cart',
    element: <Cart />,
    errorElement: <ErrorPage />
  },
  {
    path: '/admin',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users',
        element: <Users />,
        errorElement: <ErrorPage />,
        children:[
          {
            path: 'admin',
            element: <Admin />,
            errorElement: <ErrorPage />
          }
        ]
      },
      {
        path: 'products',
        element: <Product />,
        errorElement: <ErrorPage />
      },
      {
        path: 'stock',
        element: <Stock />,
        errorElement: <ErrorPage />
      },
      {
        path: 'Transaksi',
        element: <Transaksi />,
        errorElement: <ErrorPage />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
