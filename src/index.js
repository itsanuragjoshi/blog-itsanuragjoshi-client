// Import styles
import "assets/global.css";

// Import dependencies
import React from "react";
import ReactDOM from "react-dom/client";

// Import components
import App from "App";

// Import contexts
import { ThemeProvider } from "common/context/ThemeContext"; // Managing theme context
import { AuthProvider } from "common/context/AuthContext"; // Managing authentication context
import { ToastProvider } from "common/context/ToastContext"; // Managing toast notification context

// Create React root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render App component
root.render(
  <ThemeProvider>
    <ToastProvider>
      <AuthProvider>
          <React.StrictMode>
          <App />
        </React.StrictMode>    
      </AuthProvider>
    </ToastProvider>
  </ThemeProvider>
);
