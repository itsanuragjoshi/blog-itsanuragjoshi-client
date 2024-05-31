// Import dependencies
import { createContext, useState } from "react";

// Create a context for managing toast notifications
const ToastContext = createContext(null);

// ToastProvider component to wrap application and provide toast functionality
export const ToastProvider = ({ children }) => {
  // State to manage current toast message
  const [toastMessage, setToastMessage] = useState("");
  let timeoutId;

  // Function to show a toast message and automatically hide it after a timeout
  const showToast = (message) => {
    console.log("message", message);
    setToastMessage(message);

    // Clear previous timeout, if any
    clearTimeout(timeoutId);
    // Set a timeout to clear toast message after a specified duration
    timeoutId = setTimeout(() => {
      setToastMessage("");
    }, 2500); // Adjust timeout duration as needed
  };

  // Provide toast-related state and functions to context
  return (
    <ToastContext.Provider value={{ toastMessage, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Export ToastContext context
export default ToastContext;
