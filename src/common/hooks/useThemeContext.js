// CUSTOM HOOK FOR ACCESSING THEME CONTEXT

// Import dependencies
import { useContext } from "react";

// Import context
import ThemeContext from "common/context/ThemeContext";

// Define useThemeContext custom hook
const useThemeContext = () => {
  // Retrieve theme context using useContext hook
  const context = useContext(ThemeContext);

  // Throw an error if context is not available
  if (!context) {
    throw Error("useThemeContext must be used inside a ThemeContextProvider");
  }

  // Return theme context
  return context;
};

// Export useThemeContext custom hook
export default useThemeContext;
