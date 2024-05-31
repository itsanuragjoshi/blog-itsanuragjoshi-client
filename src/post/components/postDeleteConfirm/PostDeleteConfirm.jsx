// Import styles
import styles from "./postDeleteConfirm.module.css";

// Import components
import Overlay from "common/components/overlay/Overlay";

// Define PostDeleteConfirm component
const PostDeleteConfirm = ({ onCancel, onDelete }) => {
  // Render PostDeleteConfirm component
  return (
    <Overlay onClose={onCancel}>
      <div className={styles.postDeleteConfirm}>
        <div className={styles.contentWrapper}>
          <h2>⚠️ Caution: Deleting this post is irreversible!</h2>
          <h3>
            Once deleted, it's gone forever. Are you sure you want to proceed?
          </h3>
        </div>

        <div className="actionWrapper">
          {/* Edit button with callback to onEdit function */}
          <button className="button buttonSecondary" onClick={onCancel}>
            No, Cancel
          </button>
          {/* Delete button with callback to onDelete function */}
          <button className="button buttonPrimary" onClick={onDelete}>
            Yes, Proceed
          </button>
        </div>
      </div>
    </Overlay>
  );
};

// Export PostDeleteConfirm component
export default PostDeleteConfirm;
