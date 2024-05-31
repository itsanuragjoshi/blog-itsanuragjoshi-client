// Import styles
import styles from "./error.module.css";

// Import assets
import Error404Image from "assets/error404.webp";

// Define Error404 component for handling page-not-found errors
const Error404 = () => {
  // Render Error404 component
  return (
    <main className="error404">
      <div className="container">
        {/* Container for the error content */}
        <div className={styles.errorContainer}>
          {/* Error message for 404 Not Found */}
          <h2>404 Not Found: This page you're looking for does not exist</h2>
          {/* Image illustrating the error */}
          <img src={Error404Image} alt="Page Not Found" />
        </div>
      </div>
    </main>
  );
};

// Export Error404 component
export default Error404;
