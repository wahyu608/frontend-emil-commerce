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
        { path: '/', 
          element: <Index />, 
          errorElement: <Index /> },
        { path: '/loginUser', 
          element: <LoginUser />, 
          errorElement: <LoginUser /> },
        { path: '/loginAdmin', 
          element: <LoginAdmin />, 
          errorElement: <LoginAdmin /> },
        { path: '/register', 
          element: <Register />, 
          errorElement: <Register /> },
        { path: '/resetPassword', 
          element: <ResetPassword />, 
          errorElement: <ResetPassword /> },
      ])}>
      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

