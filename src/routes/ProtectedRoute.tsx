import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requireOnboarding = true 
}: ProtectedRouteProps) {
  const { currentUser, isOnboarded, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c2ff00]"></div>
      </div>
    );
  }

  // Not authenticated -> go to registration
  if (requireAuth && !currentUser) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  // Authenticated but not onboarded -> follow onboarding flow
  if (requireOnboarding && currentUser && !isOnboarded) {
    // Determine which onboarding step to show
    const currentPath = location.pathname;
    const onboardingSteps = ['/health-connect', '/connect-device', '/onboarding'];
    
    if (!onboardingSteps.includes(currentPath)) {
      const nextStep = onboardingSteps[0];
      return <Navigate to={nextStep} state={{ from: location }} replace />;
    }
  }

  // Already authenticated, trying to access auth pages -> go to dashboard
  if (!requireAuth && currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
} 