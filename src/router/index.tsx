/* eslint-disable react-refresh/only-export-components -- route table + lazy page chunks */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'

const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const Blog = lazy(() => import('@/pages/Blog').then((m) => ({ default: m.Blog })))
const BlogPost = lazy(() => import('@/pages/BlogPost').then((m) => ({ default: m.BlogPost })))
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })))
const Gallery = lazy(() => import('@/pages/Gallery').then((m) => ({ default: m.Gallery })))
const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))
const References = lazy(() => import('@/pages/References').then((m) => ({ default: m.References })))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail').then((m) => ({ default: m.ServiceDetail })))
const Services = lazy(() => import('@/pages/Services').then((m) => ({ default: m.Services })))
const YachtDetail = lazy(() => import('@/pages/YachtDetail').then((m) => ({ default: m.YachtDetail })))
const Yachts = lazy(() => import('@/pages/Yachts').then((m) => ({ default: m.Yachts })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'yachts', element: <Yachts /> },
      { path: 'yachts/:slug', element: <YachtDetail /> },
      { path: 'references', element: <References /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
