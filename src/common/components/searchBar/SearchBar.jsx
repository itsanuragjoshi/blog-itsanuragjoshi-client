// Import styles
import styles from "./searchBar.module.css";

// Import dependencies
import { useRef, useState } from "react";

// Import assets
import { ReactComponent as SearchIcon } from "assets/search.svg";

// Define SearchBar component with input and search button
const SearchBar = () => {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchTerm) {
        // Redirect to search page with encoded search query
        window.location.href = `/search?q=${encodeURIComponent(
          searchTerm
        )}`;
        setSearchTerm(""); // Clear the searchTerm state
      }
    } catch (error) {
      console.error("Error! Unable to search the blog. Try again later", error);
    }
  };

  // Render SearchBar component
  return (
    <search className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        {/* Search input */}
        <input
          type="search"
          name="search"
          placeholder="Search my blog"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          ref={searchInputRef}
        />
      </form>
      {/* Search button */}
      <button onClick={handleSubmit} className={styles.searchButton}>
        <SearchIcon className={styles.searchIcon} />
      </button>
    </search>
  );
};

// Export SearchBar component
export default SearchBar;
