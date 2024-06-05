// Import dependencies
import { useParams } from "react-router-dom";

// Import components
import PostDetail from "post/components/postDetail/PostDetail";

// Import hooks
import useFetchPost from "post/hooks/useFetchPost";
import MetaTags from "common/components/metaTags/MetaTags";

// Define Detail component
const Detail = () => {
  // Extract post ID from route parameters
  const { id } = useParams();
  const postId = id;

  // Destructure useFetchPost hook
  const { post, isPostFetched } = useFetchPost(postId);

  // Render Detail component
  return (
    <>
      <MetaTags title={post.postPreviewTitle} description={post.postPreviewDescription} />
      <main className="detail">
        <div className="container">
          {/* Render PostDetail component if data has been fetched */}
          {isPostFetched ? <PostDetail post={post} /> : null}
        </div>
      </main>
    </>
  );
};

// Export Detail component
export default Detail;
