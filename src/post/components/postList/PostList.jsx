// Import styles
import styles from "./postList.module.css";

// Import dependencies
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Import utility functions
import formatDate from "common/utils/formatDate";

// Import hooks
import useAuthContext from "common/hooks/useAuthContext";
import useDeletePost from "post/hooks/useDeletePost";

// Import components
import PostDeleteConfirm from "post/components/postDeleteConfirm/PostDeleteConfirm";

// Define PostList component to display a summary of a blog post
const PostList = ({ post }) => {
  // Access authentication context to check if user is authenticated and access authenticated user information
  const { isAuthenticated, authenticatedUser } = useAuthContext();

  // Access navigate function from react-router-dom library
  const navigate = useNavigate();

  // Format creation date of post
  const { formattedDate } = formatDate(post.createdAt);

  // Destructure useDeletePost hook
  const {
    showDeleteConfirm, // Flag indicating whether the delete confirmation is visible
    showDeleteConfirmation, // Function to show the delete confirmation overlay
    hideDeleteConfirmation, // Function to hide the delete confirmation overlay
    deletePost, // Function to delete the post
  } = useDeletePost(post._id, authenticatedUser.accessToken);

  // Function to handle post deletion
  const handleDelete = () => {
    // Show the delete confirmation overlay
    showDeleteConfirmation();
  };

  // Function to handle confirm post deletion
  const handleDeleteConfirm = () => {
    // Invoke deletePost function to initiate post deletion
    deletePost();
  };

  // Function to handle post edit
  const handleEdit = (postId) => {
    // Redirect to blog editing page
    navigate(`/edit/${postId}`);
  };

  // Render PostList component
  return (
    // Article container for each blog post
    <article id={post._id} key={post._id} className={styles.postList}>
      {/* Content wrapper containing post details */}
      <div className={styles.contentWrapper}>
        {/* Post title with a link to detailed post */}
        <div className={styles.postTitle}>
          <Link to={`/${post._id}`}>{post.postPreviewTitle}</Link>
        </div>

        {/* Brief description of post */}
        <div className={styles.postDescription}>
          {post.postPreviewDescription}
        </div>

        {/* Information about post */}
        <div className={styles.postInfo}>
          {/* Formatted creation date of post */}
          <div className={styles.postDate}>Published on {formattedDate}</div>
        </div>
      </div>

      {/* Action Wrapper (visible to authenticated users) */}
      {isAuthenticated ? (
        <div className="actionWrapper">
          {/* Edit button with callback to onEdit function */}
          <button
            className="button buttonSecondary"
            onClick={() => handleEdit(post._id)}
          >
            Edit Post
          </button>
          {/* Delete button with callback to onDelete function */}
          <button className="button buttonPrimary" onClick={handleDelete}>
            Delete Post
          </button>
        </div>
      ) : null}

      {/* Conditionally render the PostDeleteConfirm component */}
      {showDeleteConfirm ? (
        <PostDeleteConfirm
          onCancel={hideDeleteConfirmation}
          onDelete={handleDeleteConfirm}
        />
      ) : null}
    </article>
  );
};

// Export PostList component
export default PostList;
