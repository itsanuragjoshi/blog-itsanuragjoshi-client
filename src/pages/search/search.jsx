// Import styles
import styles from "./search.module.css";

// Import dependencies
import { useSearchParams } from "react-router-dom";

// Import components
import PostCard from "post/components/postCard/PostCard";

// Import custom hooks
import useFetchPosts from "post/hooks/useFetchPosts";

// Define Search component
const Search = () => {
  // Get search parameters from URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const apiUrl = `${process.env.REACT_APP_API_URI_POSTS}?q=${searchQuery}`;

  // Destructure useFetchPosts hook
  const {
    posts,
    totalPostCount,
    visiblePostCount,
    isPostsFetched,
    isTotalPostCountFetched,
    handleOnLoadMore,
  } = useFetchPosts(apiUrl);

  // Render Search component
  return (
    <main className="search">
      <div className="container">
        <div className={styles.blockTitle}>
          {/* Title and result count */}
          <h2 className="title">
            <span className={styles.resultsFor}>Results for</span>
            <br />"{searchQuery}"
          </h2>

          {/* Information about total number of results */}
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
          {isPostsFetched && isTotalPostCountFetched
            ? posts.map((post, index) => <PostCard post={post} key={index} />)
            : "Oops! Nothing matched your search query. Check spelling, try different or more general keywords."}
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
  );
};

// Export Search component
export default Search;
