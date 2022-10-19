import { lazy, Suspense } from 'react'
import Loading from './components/Loading'

const MainLayout = lazy(() => import('./layouts/MainLayout'))

const HomePage = lazy(() => import('./pages/HomePage'))

const SurveyListPage = lazy(() => import('./pages/Survey/SurveyListPage'))
const SurveyCreatePage = lazy(() => import('./pages/Survey/SurveyCreatePage'))
const SurveyDetailPage = lazy(() => import('./pages/Survey/SurveyDetailPage'))

/** @type {import('react-router-dom').RouteObject[]} */
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    lazy: true,
    children: [
      {
        index: true,
        element: <HomePage />,
        lazy: true,
      },
      {
        path: 'surveys',
        name: 'surveys',
        children: [
          {
            index: true,
            element: <SurveyListPage />,
            lazy: true,
          },
          {
            path: 'create',
            name: 'create',
            element: <SurveyCreatePage />,
            lazy: true,
          },
          {
            path: ':id',
            name: 'detail',
            element: <SurveyDetailPage />,
            lazy: true,
          },
        ],
      },
    ],
  },
]

const mapRoute = (list) => {
  return list.map((item) => {
    // if (item?.auth && 'element' in item) {
    //   item.element = <PrivateRoute>{item.element}</PrivateRoute>
    // }

    if (item?.lazy && 'element' in item) {
      item.element = <Suspense fallback={<Loading />}>{item.element}</Suspense>
    }

    // if (item?.wrap && 'element' in item) {
    //   item.element = <Wrapper>{item.element}</Wrapper>
    // }

    // if ('element' in item) {
    //   item.element = <RouteTransition key={index}>{item.element}</RouteTransition>
    // }

    if ('children' in item) {
      item.children = mapRoute(item.children)
    }

    return item
  })
}

const finalRoutes = mapRoute(routes)

export default finalRoutes
