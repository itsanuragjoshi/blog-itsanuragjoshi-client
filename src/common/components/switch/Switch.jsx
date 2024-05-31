// Import styles
import styles from "./switch.module.css";

// Import dependencies
import { useState } from "react";

// Import custom hooks
import useThemeContext from "common/hooks/useThemeContext";

// Define Switch component for toggling theme
const Switch = () => {
  // Using theme context hook
  const { toggleTheme } = useThemeContext();
  const [toggle, setToggle] = useState(false);

  // Handle theme toggle
  const handleToggle = () => {
    setToggle(!toggle);
    toggleTheme();
  };

  // Render Switch component
  return (
    <button
      className={`${styles.switchButton} ${toggle ? styles.toggle : ""}`}
      onClick={handleToggle}
    >
      {/* Knob for switch */}
      <div className={styles.switchKnob}></div>
    </button>
  );
};

// Export Switch component
export default Switch;
