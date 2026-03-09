import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";
import { useAppSelector } from "../store/hooks";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );
  
  const hasTokenInStorage = localStorage.getItem("authToken");
  const hasUserInStorage = localStorage.getItem("user");
  
  // If we have auth data in localStorage but not in Redux yet, wait for rehydration
  if (hasTokenInStorage && hasUserInStorage && !isAuthenticated) {
    // Show loading spinner while rehydrating
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Normal authentication check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;