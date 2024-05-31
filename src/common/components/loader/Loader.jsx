// Import styles
import styles from "./loader.module.css";

// Import components
import { ReactComponent as Spinner } from "assets/spinner.svg";

// Define Loader component displaying a spinner
const Loader = () => {
  // Render Loader component
  return (
    <div className={styles.loader}>
      {/* Displaying a spinner SVG */}
      <Spinner />
    </div>
  );
};

// Export Loader component
export default Loader;
