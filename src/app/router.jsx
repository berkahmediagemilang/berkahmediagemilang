import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout.jsx'

// Every page is a lazy route: each one ships as its own chunk and is only
// fetched when a visitor actually lands on that URL.
// BASE_URL is '/' locally and e.g. '/bmg/' on GitHub Pages; React Router
// expects a basename without a trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, Component: lazy(() => import('@/pages/Home.jsx')) },
      { path: 'about-us', Component: lazy(() => import('@/pages/AboutUs.jsx')) },
      { path: 'about-us/our-team', Component: lazy(() => import('@/pages/OurTeam.jsx')) },
      { path: 'services', Component: lazy(() => import('@/pages/Services.jsx')) },
      { path: 'services/:slug', Component: lazy(() => import('@/pages/ServiceDetail.jsx')) },
      { path: 'event', Component: lazy(() => import('@/pages/Event.jsx')) },
      { path: 'event/:slug', Component: lazy(() => import('@/pages/EventDetail.jsx')) },
      { path: 'portfolio', element: <Navigate to="/event" replace /> },
      { path: 'contact', Component: lazy(() => import('@/pages/Contact.jsx')) },
      { path: 'privacy', Component: lazy(() => import('@/pages/PrivacyPolicy.jsx')) },
      { path: 'terms', Component: lazy(() => import('@/pages/TermsCondition.jsx')) },
      { path: 'help', Component: lazy(() => import('@/pages/Help.jsx')) },
      { path: 'faq', Component: lazy(() => import('@/pages/FAQ.jsx')) },
      { path: 'bandingkan', Component: lazy(() => import('@/pages/Compare.jsx')) },
      { path: '*', Component: lazy(() => import('@/pages/NotFound.jsx')) },
    ],
  },
], { basename })