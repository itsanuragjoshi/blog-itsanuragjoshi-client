// Import styles
import styles from "./home.module.css";

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
          <div className={styles.heroHeader}>
            {/* Title for hero section */}
            <h1>Words that could not make it to my code</h1>
          </div>

          {/* Author information in hero section */}
          <div className={styles.heroAuthorBlock}>
            <div className={styles.heroImageWrapper}>
              {/* Author image */}
              <img src={SuperAdmin} alt="This is Anurag Joshi" />
            </div>

            <div className={styles.heroContentWrapper}>
              {/* Author greeting and introduction */}
              <h3>hey there!</h3>
              <p>
                Welcome to my blog. I'm Anurag Joshi, a Digital marketer turned
                aspiring front-end engineer, on a coding journey with a passion
                for JavaScript and ReactJS
              </p>
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

// Export Home component
export default Home;
