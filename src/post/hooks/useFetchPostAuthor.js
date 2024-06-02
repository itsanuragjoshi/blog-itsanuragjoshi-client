// Import dependencies
import { useState, useEffect } from "react";
import axios from "axios";

// Define useFetchPostAuthor custom hook to fetch post author data
const useFetchPostAuthor = (postAuthorId) => {
  // State variables
  const [postAuthor, setPostAuthor] = useState({}); // State to hold author data
  const [isPostAuthorFetched, setIsPostAuthorFetched] = useState(false); // Indicate whether author has been fetched from the server

  useEffect(() => {
    // Function to fetch author data
    const fetchPostAuthor = async () => {
      try {
        if (postAuthorId) {
          // Send a GET request to fetch author data
          const response = await axios.get(
            `${process.env.REACT_APP_API_URI_AUTH}/user/${postAuthorId}`
          );

          // Update author state with fetched data
          setPostAuthor(response.data);
          // Set isPostAuthorFetched to true once data is successfully fetched
          setIsPostAuthorFetched(true);
        }
      } catch (error) {
        // Handle errors if unable to fetch author data
        console.error("Error! Unable to fetch author data from server");
      }
    };
    fetchPostAuthor();
  }, [postAuthorId]);

  // Render useFetchPostAuthor custom hook
  return { postAuthor, isPostAuthorFetched };
};

// Export useFetchPostAuthor custom hook
export default useFetchPostAuthor;
