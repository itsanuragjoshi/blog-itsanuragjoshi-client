// Import styles
import styles from "./dashboard.module.css";

// Import hooks
import useAuthContext from "common/hooks/useAuthContext";
import useFetchPosts from "post/hooks/useFetchPosts";

// Import components
import PostList from "post/components/postList/PostList";
import MetaTags from "common/components/metaTags/MetaTags";

// Define Dashboard component
const Dashboard = () => {
  // Access authenticated user information using useAuthContext hook
  const { authenticatedUser } = useAuthContext();

  // Construct API URL for fetching posts by authenticated user
  const apiUrl = `${process.env.REACT_APP_API_URI_POSTS}/dashboard`;

  // Destructure useFetchPosts hook
  const {
    posts,
    totalPostCount,
    visiblePostCount,
    isPostsFetched,
    handleOnLoadMore,
  } = useFetchPosts(apiUrl, authenticatedUser.accessToken);

  // Render Dashboard component
  return (
    <>
      <MetaTags
        title="Dashboard | Anurag Joshi's Blog"
        description="Dashboard | Anurag Joshi's Blog"
      />
      <main className="dashboard">
        <div className={styles.heroSection}>
          <div className={styles.heroHeader}>
            {/* Title for hero section */}
            <h1>Welcome, {authenticatedUser.userName}</h1>
          </div>
        </div>

        {/* Main content container */}
        <div className="container">
          <div className={styles.blockTitle}>
            {/* Title for  latest articles section */}
            <h2 className="title">Published Articles</h2>

            {/* Information about total number of latest articles */}
            <div className="actions">
              <div className="info">
                {totalPostCount === 1
                  ? `${totalPostCount} article`
                  : `${totalPostCount} articles`}
              </div>
            </div>
          </div>

          {/* Render individual PostList components for each post */}
          <div className={styles.articles}>
            {isPostsFetched
              ? posts.map((post) => <PostList post={post} key={post._id} />)
              : null}
          </div>

          {/* Load More button or message when there are no more posts to load */}
          <div className={styles.loadMore}>
            {totalPostCount > 0 ? (
              visiblePostCount < totalPostCount ? (
                <button onClick={handleOnLoadMore}>See More Posts &rarr;</button>
              ) : (
                <div>Sorry, that's all folks! No more to load.</div>
              )
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

// Export Dashboard component
export default Dashboard;
