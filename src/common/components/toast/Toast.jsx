// Import styles
import styles from "./toast.module.css";

// Define Toast component to display toast messages
const Toast = ({ toastList }) => {
  // Render the toast messages
  return (
    <div className={styles.toastContainer}>
      {toastList.map((toast, index) => (
        <div key={index} className={`${styles.toast} ${styles.show}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

// Export Toast component
export default Toast;