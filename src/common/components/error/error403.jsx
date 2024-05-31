// Import styles
import styles from "./error.module.css";

// Import assets
import Error403Image from "assets/loginImage.webp";

// Define Error403 component for handling authentication errors
const Error403 = () => {
  // Render Error403 component
  return (
    <main className="error403">
      <div className="container">
        {/* Container for the error content */}
        <div className={styles.errorContainer}>
          {/* Error message for 403 Forbidden */}
          <h2>
            403 Forbidden: You need to be authenticated to access this resource.
          </h2>
          {/* Image illustrating the error */}
          <img src={Error403Image} alt="You Shall Not Pass Meme" />
        </div>
      </div>
    </main>
  );
};

// Export Error403 component
export default Error403;
