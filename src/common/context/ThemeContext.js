// Import dependencies
import { createContext, useState } from "react";

// Create a context for managing theme-related state
const ThemeContext = createContext(null);

// ThemeProvider component to wrap application and provide theme context
export const ThemeProvider = ({ children }) => {
  // State to manage current theme
  const [theme, setTheme] = useState("");

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((curr) => (curr === "" ? "dark" : ""));
  };

  // Provide theme and toggleTheme function to context
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export ThemeContext context
export default ThemeContext;
