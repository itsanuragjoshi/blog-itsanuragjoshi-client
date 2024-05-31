// Import styles
import styles from "./postDetail.module.css";

// Import dependencies
import { useNavigate } from "react-router-dom";
import { Parser } from "@alkhipce/editorjs-react"; // React component for rendering Editor.js content

// Import utility functions
import formatDate from "common/utils/formatDate";

// Import hooks
import useAuthContext from "common/hooks/useAuthContext";
import useDeletePost from "post/hooks/useDeletePost";
import useFetchPostAuthor from "post/hooks/useFetchPostAuthor";

// Import components
import PostDeleteConfirm from "post/components/postDeleteConfirm/PostDeleteConfirm";

// PostDetail component to display detailed information about a blog post
const PostDetail = ({ post }) => {
  // Access authentication context to check if user is authenticated and access authenticated user information
  const { isAuthenticated, authenticatedUser } = useAuthContext();

  // Access navigate function from react-router-dom library
  const navigate = useNavigate();

  // Format creation date of post
  const { formattedDate } = formatDate(post.createdAt);

  // Destructure useFetchPostAuthor hook
  const { postAuthor } = useFetchPostAuthor(post.postAuthorId);

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

  // Render PostDetail component
  return (
    // Article container for detailed post view
    <article id={post._id} className={styles.postDetail}>
      {/* Content wrapper containing post details */}
      <div className={styles.contentWrapper}>
        {/* Post header section with title, date, and author */}
        <div className={styles.postHeader}>
          {/* Post title */}
          <div className={styles.postTitle}>
            <h1>{post.postTitle}</h1>
          </div>
          {/* Information about post (date and author) */}
          <div className={styles.postInfo}>
            {/* Formatted creation date of post */}
            <div className={styles.postDate}>{formattedDate}</div>
            {/* Post author (fallback to "Admin" if author is not specified) */}
            <div className={styles.postAuthor}>
              By {postAuthor.userName ?? "Admin"}
            </div>
          </div>
        </div>
        {/* Post body section containing parsed Editor.js content */}
        <div className={styles.postBody}>
          <Parser data={post.postContent} />
        </div>
      </div>

      {/* Render action buttons (edit & delete) only if the authenticated user is the author of the post */}
      {isAuthenticated && authenticatedUser.userId === post.postAuthorId ? (
        <div className="actionWrapper">
          {/* Edit button with callback to handleEdit function */}
          <button
            className="button buttonSecondary"
            onClick={() => handleEdit(post._id)}
          >
            Edit Post
          </button>
          {/* Delete button with callback to handleDelete function */}
          <button
            className="button buttonPrimary"
            onClick={handleDelete}
          >
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

// Export PostDetail component
export default PostDetail;
