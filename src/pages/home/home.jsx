// Import styles
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";

// Import hooks
import useFetchPosts from "post/hooks/useFetchPosts";

// Import components
import PostCard from "post/components/postCard/PostCard";

// Import assets
import SuperAdmin from "assets/itsanuragjoshi.webp";
import MetaTags from "common/components/metaTags/MetaTags";

// Define Home component
const Home = () => {
  const apiUrl = `${process.env.REACT_APP_API_URI_POSTS}?`;
  const navigate = useNavigate();

  // Destructure useFetchPosts hook
  const {
    posts,
    totalPostCount,
    visiblePostCount,
    isPostsFetched,
    handleOnLoadMore,
  } = useFetchPosts(apiUrl);

  // Render Home component
  return (
    <>
      <MetaTags
        title="Anurag Joshi's Blog - To Code and Beyond"
        description="Welcome to Anurag Joshi's Blog. Discover insights, stories, and ideas from the world of coding and beyond."
      />
      <main className="home">
        <div className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroHeader}>
              <h1>Words that could not make it to my code</h1>
            </div>

            <div className={styles.heroAuthorBlock}>
              <div className={styles.heroImageWrapper}>
                <img src={SuperAdmin} alt="This is Anurag Joshi" />
              </div>

              <div className={styles.heroContentWrapper}>
                <h3>Welcome to my blog!</h3>
                <p>
                  I'm Anurag Joshi, a Front-End Developer sharing coding
                  concepts, tips, and more with the community ❤️
                </p>
                <button
                  onClick={() => navigate("/about")}
                  className="button buttonPrimary"
                >
                  About Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content container */}
        <div className="container">
          <div className={styles.blockTitle}>
            {/* Title for latest articles section */}
            <h2 className="title">Latest Articles</h2>

            {/* Information about total number of latest articles */}
            <div className="actions">
              <div className="info">
                {totalPostCount === 1
                  ? `${totalPostCount} article`
                  : `${totalPostCount} articles`}
              </div>
            </div>
          </div>

          {/* Render individual PostCard components for each post */}
          <div className={styles.articles}>
            {isPostsFetched
              ? posts.map((post) => <PostCard post={post} key={post._id} />)
              : null}
          </div>

          {/* Load More button or message when there are no more posts to load */}
          <div className={styles.loadMore}>
            {totalPostCount > 0 ? (
              visiblePostCount < totalPostCount ? (
                <button onClick={handleOnLoadMore}>
                  See More Posts &rarr;
                </button>
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

// Export Home component
export default Home;
