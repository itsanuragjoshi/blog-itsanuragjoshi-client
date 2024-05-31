// Import styles
import styles from "./topbar.module.css";

// Import dependencies
import { useState } from "react";
import { Link } from "react-router-dom";

// Import assets
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as MenuIcon } from "assets/menu.svg";
import { ReactComponent as CloseIcon } from "assets/close.svg";

// Import components
import Menu from "common/components/menu/Menu";

// Define Topbar component
const Topbar = () => {
  // State for mobile menu visibility
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  // Render Topbar component
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.logoWrapper}>
          {/* Link to homepage with logo */}
          <Link to={"/"}>
            <Logo className={styles.logo} />
          </Link>
        </div>
        {/* Mobile menu */}
        <Menu showMobileMenu={showMobileMenu} />

        <div className={styles.menuIconWrapper}>
          {/* Conditional rendering of menu or close icon based on mobile menu visibility */}
          {showMobileMenu ? (
            <CloseIcon className={styles.closeIcon} onClick={toggleMenu} />
          ) : (
            <MenuIcon className={styles.menuIcon} onClick={toggleMenu} />
          )}
        </div>
      </div>
    </>
  );
};

// Export Topbar component
export default Topbar;
