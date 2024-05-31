// Import styles
import styles from "./postCard.module.css";

// Import dependencies
import { Link } from "react-router-dom";

// Import utility functions
import formatDate from "common/utils/formatDate";

// Import hooks
import useFetchPostAuthor from "post/hooks/useFetchPostAuthor";

// PostCard component to display a summary of a blog post
const PostCard = ({ post }) => {
  // Format creation date of post
  const { formattedDate } = formatDate(post.createdAt);

  // Destructure useFetchPostAuthor hook
  const { postAuthor } = useFetchPostAuthor(post.postAuthorId);

  // Render PostCard component
  return (
    // Article container for each blog post
    <article id={post._id} key={post._id} className={styles.postCard}>
      {/* Image wrapper with a link to detailed post */}
      <div className={styles.imageWrapper}>
        <Link to={`/${post._id}`}>
          {/* Post image with alt text */}
          <img src={post.postPreviewImage} alt={post.postPreviewTitle} />
        </Link>
      </div>

      {/* Content wrapper containing post details */}
      <div className={styles.contentWrapper}>
        {/* Post title with a link to detailed post */}
        <div className={styles.postTitle}>
          <Link to={`/${post._id}`}>{post.postPreviewTitle}</Link>
        </div>

        {/* Information about post */}
        <div className={styles.postInfo}>
          {/* Formatted creation date of post */}
          <div className={styles.postDate}>{formattedDate}</div>
          {/* Post author */}
          <div className={styles.postAuthor}>
            By {postAuthor.userName ?? "Admin"}
          </div>
        </div>

        {/* Brief description of post */}
        <div className={styles.postDescription}>
          {post.postPreviewDescription}
        </div>
      </div>
    </article>
  );
};

// Export PostCard component
export default PostCard;
