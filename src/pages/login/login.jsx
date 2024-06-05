// Import styles
import styles from "./login.module.css";

// Import dependencies
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import hooks
import useAuthContext from "common/hooks/useAuthContext";

// Import components
import Loader from "common/components/loader/Loader";
import MetaTags from "common/components/metaTags/MetaTags";

// Import assets
import LoginImage from "assets/loginImage.webp";

// Define Login component
const Login = () => {
  // Retrieve necessary functions from authentication context
  const { setIsAuthenticated } = useAuthContext();

  // Create refs for form elements
  const userRef = useRef();

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // State variables
  const [userEmail, setUserEmail] = useState(""); // Store user email input
  const [userPassword, setUserPassword] = useState(""); // Store user password input
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages related to authentication
  const [loading, setLoading] = useState(false); // Indicate whether any async operation is still in progress

  // Set focus on username input field on component mount
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set loading to true while making API request
      setLoading(true);

      // Make a POST request to authentication API for login
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI_AUTH}/login`,
        { userEmail, userPassword }
      );

      // Store user information in local storage
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          userId: response.data.userId,
          userName: response.data.userName,
          accessToken: response.data.accessToken,
          tokenExpiration: Date.now() + response.data.expiresIn,
        })
      );

      // Update authentication status
      setIsAuthenticated(true);

      // Clear user input fields
      setUserEmail("");
      setUserPassword("");

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      // Handle and set error message if login fails
      setErrorMessage(
        error.response?.data.error || "Oops! Login failed. Please try again."
      );
    } finally {
      // Set loading back to false after API request completes
      setLoading(false);
    }
  };

  // Render Login component
  return (
    <>
      <MetaTags
        title="Login | Anurag Joshi's Blog"
        description="Login | Anurag Joshi's Blog"
      />
      <main className="login">
        <div className="container">
          <div className={styles.formContainer}>
            {/* Title and meme image */}
            <h2>Where Only Authors Shall Pass</h2>
            <img src={LoginImage} alt="You Shall Not Pass Meme" />

            {/* Login form */}
            <form id="loginForm" onSubmit={handleSubmit}>
              {/* Email input field */}
              <div className={styles.formGroup}>
                <label htmlFor="userEmail">Email</label>
                <input
                  type="email"
                  id="userEmail"
                  ref={userRef}
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Password input field */}
              <div className={styles.formGroup}>
                <label htmlFor="userPassword">Password</label>
                <input
                  type="password"
                  id="userPassword"
                  onChange={(e) => setUserPassword(e.target.value)}
                  value={userPassword}
                  required
                />
              </div>

              {/* Display error message if there is one */}
              {errorMessage && <div className="error">{errorMessage}</div>}

              {/* Login button with loading indicator */}
              <button
                onClick={handleSubmit}
                className="button buttonPrimary"
                disabled={loading}
              >
                {loading ? <Loader /> : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

// Export Login component
export default Login;
