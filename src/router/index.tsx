import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

// 首页
const Home = lazy(() => import('@/pages'))

// 流程图页面
const FlowChart = lazy(() => import('@/pages/FlowChart'))

// 404页面
const NoMatch = lazy(() => import('@/pages/NoMatch'))

export const ShadcnRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Navigate to="/home" />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    // 流程图页面
    {
      path: '/flowChart',
      element: <FlowChart />,
    },
    // 404页面
    {
      path: '*',
      element: <NoMatch />,
    },
  ]

  return useRoutes(routes)
}
