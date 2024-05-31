// Import styles
import styles from "./header.module.css";

// Import components
import Topbar from "common/components/topbar/Topbar";

// Define Header component
const Header = () => {
  // Render Header component
  return (
    <>
      {/* Main header with Topbar component */}
      <header className={styles.mainHeader}>
        <Topbar />
      </header>
    </>
  );
};

// Export Header component
export default Header;
