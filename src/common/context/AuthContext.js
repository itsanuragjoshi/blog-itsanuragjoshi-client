// Import dependencies
import { createContext, useState, useEffect } from "react";

// Create a context for managing authentication-related state
const AuthContext = createContext({});

// AuthProvider component to wrap application and provide authentication context
export const AuthProvider = ({ children }) => {
  // State variables
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication status
  const [authenticatedUser, setAuthenticatedUser] = useState({}); // Store authenticated user details

  useEffect(() => {
    // Retrieve authentication data from local storage
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    // Check if authUser exists
    if (authUser) {
      // Update isAuthenticated based on token expiration
      setIsAuthenticated(authUser?.tokenExpiration > Date.now());

      // Set authenticatedUser with retrieved user details
      setAuthenticatedUser(authUser);
    }

    // Cleanup function to reset state when component is unmounted
    return () => {
      setIsAuthenticated(false);
      setAuthenticatedUser({});
    };
  }, [isAuthenticated]);

  // Provide authentication-related state and functions to context
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, authenticatedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext context
export default AuthContext;
