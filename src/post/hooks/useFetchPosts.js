// Import dependencies
import { useState, useEffect } from "react";
import axios from "axios";

// Import hooks
import useToastContext from "common/hooks/useToastContext";

// Define useFetchPosts custom hook
const useFetchPosts = (apiUrl, accessToken = "") => {
  // Initial configuration
  const initialPage = 1;
  const limit = 3;

  // Destructure useToastContext hook
  const { showToast } = useToastContext();

  // State variables
  const [posts, setPosts] = useState([]); // Store an array of posts
  const [totalPostCount, setTotalPostCount] = useState(0); // Track total number of posts
  const [visiblePostCount, setVisiblePostCount] = useState(0); // Track number of currently visible posts
  const [page, setPage] = useState(initialPage); // Store current page number
  const [isPostsFetched, setIsPostsFetched] = useState(false); // Indicate whether posts have been fetched from server
  const [isTotalPostCountFetched, setIsTotalPostCountFetched] = useState(false); // Indicate whether count of total posts have been fetched from server

  useEffect(() => {
    // Create an AbortController for managing requests
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Function to fetch total posts count
    const fetchTotalPostCount = async () => {
      try {
        // Send a GET request to fetch total count of posts
        const response = await axios.get(apiUrl, {
          signal,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        });

        // Set isTotalPostCountFetched to true once count of total posts successfully fetched
        setIsTotalPostCountFetched(response.data.length > 0);

        // Set total count of posts
        setTotalPostCount(response.data.length);
        showToast("post count fetched");
      } catch (error) {
        showToast(error.response?.data.error || "Internal Server Error");
      }
    };

    fetchTotalPostCount();

    return () => {
      // Cleanup by aborting request
      abortController.abort();
    };
  }, [apiUrl, accessToken]);

  useEffect(() => {
    // Create an AbortController for managing requests
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Function to fetch posts
    const fetchPosts = async () => {
      try {
        // Send a GET request to fetch post data with pagination
        const response = await axios.get(
          `${apiUrl}?&_page=${page}&_limit=${limit}`,
          {
            signal,
            headers: accessToken
              ? { Authorization: `Bearer ${accessToken}` }
              : {},
          }
        );

        // Set isPostsFetched to true once posts successfully fetched
        setIsPostsFetched(response.data.length > 0);

        // Set post state with fetched data (replace existing posts)
        setPosts(response.data);

        // Update visibility count with fetched data
        setVisiblePostCount((prev) => prev + response.data.length);
        showToast("post fetched");
      } catch (error) {
        showToast(error.response?.data.error || "Internal Server Error");
      }
    };

    fetchPosts();

    return () => {
      // Cleanup by aborting request
      abortController.abort();
    };
  }, [apiUrl, accessToken, page, limit]);

  // Handle "Load More" button click by incrementing page number
  const handleOnLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Render useFetchPosts custom hook
  return {
    posts,
    totalPostCount,
    visiblePostCount,
    isPostsFetched,
    isTotalPostCountFetched,
    handleOnLoadMore,
  };
};

// Define useFetchPosts custom hook
export default useFetchPosts;
