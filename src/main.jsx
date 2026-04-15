import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import "../src/assets/scss/style.scss";
import ErrorPage from './pages/error.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import { CartProvider } from './components/context/cart.context';

import 'nprogress/nprogress.css';

import './assets/css/style.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MOCK_PRODUCTS } from '@/constants/product.constant';
import { Spin } from 'antd';

// Lazy loading các components
const LoginPage = lazy(() => import('./pages/login.jsx'));
const RegisterPage = lazy(() => import('./pages/register.jsx'));
const UserPage = lazy(() => import('./pages/user.jsx'));
const BookPage = lazy(() => import('./pages/book.jsx'));
const TodoApp = lazy(() => import('./components/learn/TodoApp.jsx'));
const PrivateRoute = lazy(() => import('./pages/private.route.jsx'));
const ProductPage = lazy(() => import('./pages/product.jsx'));
const Weather = lazy(() => import('./pages/weather.jsx'));
const ProductDetail = lazy(() => import('./components/product/product.detail.jsx'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" tip="Đang tải..." />
  </div>
);


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<LoadingFallback />}><TodoApp/></Suspense>
      },
      {
        path: "/weather",
        element: <Suspense fallback={<LoadingFallback />}><Weather/></Suspense>
      },
      {
        path: "/user",
        element: <Suspense fallback={<LoadingFallback />}><UserPage/></Suspense>
      },
      {
        path: "/product",
        element: <Suspense fallback={<LoadingFallback />}><ProductPage/></Suspense>
      },
      {
        path: "/product/:productId",
        element: <Suspense fallback={<LoadingFallback />}><ProductDetail products={MOCK_PRODUCTS} /></Suspense>
      },
      {
        path: "/book",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <BookPage/>
            </PrivateRoute>
          </Suspense>
        )},
    ]
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
]);

createRoot(document.getElementById('root')).render(
    <AuthWrapper>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthWrapper>
)
