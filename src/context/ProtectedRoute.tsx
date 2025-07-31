// components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className='flex items-center justify-center min-h-screen bg-gray-950 text-white'>Loading...</div>; 
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
