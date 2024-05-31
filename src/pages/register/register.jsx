// Import styles
import styles from "./register.module.css";

// Import dependencies
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import hooks
import Loader from "common/components/loader/Loader";

// Import assets
import RegisterImage from "assets/registerImage.webp";

// Define Register component
const Register = () => {
  // Create refs for form elements
  const userRef = useRef();

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // State variables
  const [userEmail, setUserEmail] = useState(""); // Store user email input
  const [userPassword, setUserPassword] = useState(""); // Store user password input
  const [userName, setUserName] = useState(""); // Store user full name
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

      // Make a POST request to authentication API for registration
      await axios.post(`${process.env.REACT_APP_API_URI_AUTH}/register`, {
        userEmail,
        userPassword,
        userName,
      });

      // Clear user input fields
      setUserEmail("");
      setUserPassword("");
      setUserName("");

      // Navigate to home page after successful registration
      navigate("/");
    } catch (error) {
      // Handle and set error message if registration fails
      setErrorMessage(
        error.response?.data.error ||
          "Oops! Registration failed. Please try again."
      );
    } finally {
      // Set loading back to false after API request completes
      setLoading(false);
    }
  };

  // Render Register component
  return (
    <main className="register">
      <div className="container">
        <div className={styles.formContainer}>
          {/* Title and meme image */}
          <h2>Author Registration</h2>
          <img src={RegisterImage} alt="You Shall Not Pass Meme" />

          {/* Registration form */}
          <form id="registerForm" onSubmit={handleSubmit}>
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

            {/* Full name input field */}
            <div className={styles.formGroup}>
              <label htmlFor="userName">Full Name</label>
              <input
                type="text"
                id="userName"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
            </div>

            {/* Display error message if there is one */}
            {errorMessage && <div className="error">{errorMessage}</div>}

            {/* Registration button with loading indicator */}
            <button
              onClick={handleSubmit}
              className="button buttonPrimary"
              disabled={loading}
            >
              {loading ? <Loader /> : "Register"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

// Export Register component
export default Register;
