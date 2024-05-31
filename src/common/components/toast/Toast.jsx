// Import styles
import styles from "./toast.module.css";

// Define Toast component to display toast messages
const Toast = ({ toastMessage }) => {
  // Render the toast message only if it exists
  return toastMessage ? (
    <div className={`${styles.toast} ${toastMessage ? styles.show : ""}`}>
      {toastMessage}
    </div>
  ) : null;
};

// Export Toast component
export default Toast;

