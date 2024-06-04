import { createContext, useState, useEffect } from "react";

// Create a context for managing theme-related state
const ThemeContext = createContext(null);

// ThemeProvider component to wrap application and provide theme context
export const ThemeProvider = ({ children }) => {
  // State to manage current theme
  const [theme, setTheme] = useState(
    // Check local storage for saved theme, default to "" (light) if not found
    localStorage.getItem("darkMode") === "true" ? "dark" : ""
  );

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((curr) => (curr === "" ? "dark" : ""));
    // Update local storage with the new theme
    localStorage.setItem("darkMode", theme === "" ? "false" : "true");
  };

  // useEffect hook to persist theme on component mount and update
  useEffect(() => {
    // Update local storage on theme change (optional, for better consistency)
    localStorage.setItem("darkMode", theme === "" ? "false" : "true");
  }, [theme]);

  // Provide theme and toggleTheme function to context
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export ThemeContext context
export default ThemeContext;