// Import dependencies
import { useNavigate } from "react-router-dom";

// Import custom hooks
import useAuthContext from "common/hooks/useAuthContext";

// Define LogoutButton component displaying a logout button
const LogoutButton = () => {
  // Using custom hooks
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  // Handling logout by removing user from local storage and updating authentication state
  const handleLogout = async () => {
    localStorage.removeItem("authUser");
    setIsAuthenticated(false);
    navigate("/");
  };

  // Render LogoutButton component
  return <button onClick={handleLogout}>Log Out</button>;
};

// Export LogoutButton component
export default LogoutButton;
