// Import styles
import styles from "./menu.module.css";

// Import dependencies
import { Link } from "react-router-dom";

// Import hooks
import useAuthContext from "common/hooks/useAuthContext";

// Import components
import SearchInput from "common/components/searchBar/SearchBar";
import Switch from "common/components/switch/Switch";
import LoginButton from "common/components/loginButton/LoginButton";
import LogoutButton from "common/components/logoutButton/LogoutButton";

// Define Menu component
const Menu = ({ showMobileMenu }) => {
  // Destructure useAuthContext hook
  const { isAuthenticated, authenticatedUser } = useAuthContext();

  // Render Menu component
  return (
    <nav
      className={`${styles.navigationContainer} ${
        showMobileMenu ? styles.active : ""
      }`}
    >
      {/* Search input */}
      <SearchInput />
      <div className={styles.switchWrapper}>
        {/* Switch for Dark Mode */}
        <Switch />
        Dark Mode
      </div>
      {/* Conditional rendering based on authentication state */}
      {isAuthenticated && authenticatedUser ? (
        <>
          <div className={styles.linksWrapper}>
            {/* Link to draft page */}
            <Link to={"/draft"}>Write</Link>
            {/* Link to dashboard page */}
            <Link to={"/dashboard"}>Dashboard</Link>
          </div>
          <div className={styles.userProfile}>
            {/* Displaying authenticated user's name */}
            Hi <span>{authenticatedUser.userName}</span>
          </div>
          {/* Logout button */}
          <LogoutButton />
        </>
      ) : (
        <>
          {/* Link to about page */}
          <Link to={"/about"}>About</Link>
          <Link to={"/login"}>
            {/* Login button */}
            <LoginButton />
          </Link>
        </>
      )}
    </nav>
  );
};

// Export Menu component
export default Menu;
