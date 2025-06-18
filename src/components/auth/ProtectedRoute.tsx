import React, { ReactNode } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { AuthScreen } from '../../screens/Auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="bg-black w-[414px] h-[896px] relative flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={() => window.location.reload()} />;
  }

  return <>{children}</>;
};