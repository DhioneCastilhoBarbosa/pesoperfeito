import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { Register } from './pages/register/register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <SignIn />,
      },
    ],
  },
  
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/tickest',
        element: <Dashboard />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout/>,
    children: [
      {
        path: '/register',
        element: <Register/>,
      },
    ],
  },

  
])
