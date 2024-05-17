import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from './index.jsx'
import './index.css'
import LoginUser from './pages/user/login.jsx';
import LoginAdmin from './pages/admin/login.jsx';
import Register from './pages/user/register.jsx';
import ResetPassword from './pages/user/resetPassword.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'typeface-poppins';
import ErrorPage from './errorPage.jsx';
import Produk from './pages/user/produk.jsx';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter([
        {
          path: '*',
          element: <ErrorPage />
        },
        { path: '/', 
          element: <Index />, 
          errorElement: <ErrorPage /> },
        { path: '/loginUser', 
          element: <LoginUser />, 
          errorElement: <ErrorPage /> },
        { path: '/loginAdmin', 
          element: <LoginAdmin />, 
          errorElement: <ErrorPage /> },
        { path: '/register', 
          element: <Register />, 
          errorElement: <ErrorPage /> },
        { path: '/resetPassword', 
          element: <ResetPassword />, 
          errorElement: <ErrorPage /> },
        { path: '/produk', element: <Produk />}
      ])}>
      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

