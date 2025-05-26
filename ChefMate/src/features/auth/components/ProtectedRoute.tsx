import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;