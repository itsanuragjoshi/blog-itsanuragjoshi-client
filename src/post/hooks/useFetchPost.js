// Import dependencies
import { useState, useEffect } from "react";
import axios from "axios";

// Import hooks
import useToastContext from "common/hooks/useToastContext";

// Define useFetchPost custom hook
const useFetchPost = (postId) => {
  // Destructure useToastContext hook
  const { showToast } = useToastContext();

  // State variables
  const [post, setPost] = useState({}); // State to hold post data
  const [isPostFetched, setIsPostFetched] = useState(false); // Indicate whether post has been fetched from server

  useEffect(() => {
    // Create an AbortController for managing requests
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Function to fetch post data
    const fetchPost = async () => {
      try {
        // Send a GET request to fetch post data
        const response = await axios.get(
          `${process.env.REACT_APP_API_URI_POSTS}/${postId}`,
          {
            signal,
          }
        );

        // Update post state with fetched data
        setPost(response.data);
        // Set isPostFetched to true once data is successfully fetched
        setIsPostFetched(true);
      } catch (error) {
        showToast(error.response?.data.error || "Error! Unable to fetch post from server");
      }
    };

    fetchPost();

    return () => {
      // Cleanup by aborting request
      abortController.abort();
    };
  }, [postId, showToast]);

  // Render useFetchPost custom hook
  return { post, isPostFetched };
};

// Export useFetchPost custom hook
export default useFetchPost;
