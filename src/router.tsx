import React, { Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { Spin } from '@douyinfe/semi-ui'
const LayOut = React.lazy(async () => await import('./layout'))
const LoginPage = React.lazy(async () => await import('./views/Login'))
const HomePage = React.lazy(async () => await import('./views/Home'))
const UserInfo = React.lazy(async () => await import('./views/UserInfo'))
const OnlineUser = React.lazy(async () => await import('./views/OnlineUser'))
const LowCodePlatform = React.lazy(async () => await import('./views/LowCode'))

/** 懒加载loading */
const lazyLoad = (children: React.ReactNode): React.ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

const Loading = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Spin size="large" tip="Loading" />
    </div>
  )
}
const router: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: lazyLoad(<LoginPage />)
  },
  {
    path: '/dashboard',
    element: lazyLoad(<LayOut />),
    children: [
      {
        path: '',
        element: lazyLoad(<HomePage />)
      },
      {
        path: '/dashboard/user-info',
        element: lazyLoad(<UserInfo />)
      },
      {
        path: '/dashboard/online-user',
        element: lazyLoad(<OnlineUser />)
      }
    ]
  },
  {
    path: '/low-code-platform',
    element: lazyLoad(<LowCodePlatform />)
  }
]

export default router
