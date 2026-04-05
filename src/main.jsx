import { createRoot } from 'react-dom/client'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import BookPage from './pages/book.jsx';
import "../src/assets/scss/style.scss";
import ErrorPage from './pages/error.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';

import 'nprogress/nprogress.css';

import './assets/css/style.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TodoApp from './components/learn/TodoApp.jsx';
import PrivateRoute from './pages/private.route.jsx';
import ProductPage from './pages/product.jsx';
import Weather from './pages/weather.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp/>
      },
      {
        index: true,
        path: "/weather",
        element: <Weather/>
      },
      {
        path: "/user",
        element: <UserPage/>
      },
      {
        path: "/product",
        element: <ProductPage/>
      },
      {
        path: "/book",
        element: (
          <PrivateRoute>
            <BookPage/>
          </PrivateRoute>
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
      <RouterProvider router={router} />  {/* Component children of AuthWrapper component */}
    </AuthWrapper>
)
