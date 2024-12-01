import { createBrowserRouter, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Loading from '../pages/Loading'
import Dashboard from '../pages/Dashboard'
import PreGameForm from '../components/forms/PreGame'
import Details from '../pages/Details'
import Analytics from '../pages/Analytics'
import UserDetails from '../pages/user-page'
import UserRegistration from '../components/forms/user-registration'
import SmartwatchLink from '../pages/health-connect'
import Layout from '../components/layout/Layout'
import HealthConnect from '../pages/integerations'
import OnboardingSlideshow from '../pages/Onboarding'
import OAuthCallback from './oauth/callback'
import ProtectedRoute from './ProtectedRoute'
import InjuryPredictionDetails from '../pages/InjuryPredictionDetails'
import InjuryPart from '../pages/InjuryPart'
import RestDayDetails from '../pages/RestDayDetials'
import RecoveryPage from '../pages/Recovery'
import TrainingPage from '../pages/Training'

// Error Boundary Component
function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{error.status} {error.statusText}</h1>
          <p className="text-gray-400 mb-6">Sorry, the page you're looking for doesn't exist.</p>
          <a href="/" className="text-[#c2ff00] hover:underline">Go back home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-400 mb-6">We're sorry, but there was an unexpected error.</p>
        <a href="/" className="text-[#c2ff00] hover:underline">Go back home</a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Loading />
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute requireAuth={false} requireOnboarding={false}>
            <UserRegistration />
          </ProtectedRoute>
        )
      },
      {
        path: 'health-connect',
        element: (
          <ProtectedRoute requireOnboarding={false}>
            <HealthConnect />
          </ProtectedRoute>
        )
      },
      {
        path: 'connect-device',
        element: (
          <ProtectedRoute requireOnboarding={false}>
            <SmartwatchLink />
          </ProtectedRoute>
        )
      },
      {
        path: 'onboarding',
        element: (
          <ProtectedRoute requireOnboarding={false}>
            <OnboardingSlideshow />
          </ProtectedRoute>
        )
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'pre-game',
        element: (
          <ProtectedRoute>
            <PreGameForm />
          </ProtectedRoute>
        )
      },
      {
        path: 'details',
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        )
      },
      {
        path: 'activity',
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        )
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        )
      },
        {
          path: 'oauth/callback',
          element: <OAuthCallback />
        },
        {
          path: 'injury-prediction-details',
          element: <InjuryPredictionDetails />
        },
        {
          path: 'injury-part',
          element: <InjuryPart />
        },
        {
          path: 'rest-day-details',
          element: <RestDayDetails />
        },
        {
          path: 'recovery',
          element: <RecoveryPage />
        },
        {
          path: 'training',
          element: <TrainingPage />
        }
    ]
  }
], {
  future: {
    v7_normalizeFormMethod: true
  }
})