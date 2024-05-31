// CUSTOM HOOK FOR ACCESSING AUTHENTICATION CONTEXT

// Import dependencies
import { useContext } from "react";

// Import context
import AuthContext from "common/context/AuthContext";

// Define useAuthContext custom hook
const useAuthContext = () => {
  // Retrieve authentication context using useContext hook
  const context = useContext(AuthContext);

  // Throw an error if context is not available
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  // Return authentication context
  return context;
};

// Export useAuthContext custom hook
export default useAuthContext;
