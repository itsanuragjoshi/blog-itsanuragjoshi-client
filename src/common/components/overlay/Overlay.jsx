// Import styles
import styles from "./overlay.module.css";

// Import assets
import { ReactComponent as CloseIcon } from "assets/close.svg";

// Define Overlay component with close button and content
const Overlay = ({ onClose, children }) => {
  // Render Overlay component
  return (
    <div className={styles.overlay}>
      <div className={styles.buttonWrapper}>
        {/* Close button */}
        <CloseIcon className={styles.closeButton} onClick={onClose} />
      </div>
      {/* Overlay content */}
      <div className={styles.overlayContent}>{children}</div>
    </div>
  );
};

// Export Overlay component
export default Overlay;
