// Import dependencies
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import hooks
import useToastContext from "common/hooks/useToastContext";

// Define useDeletePost custom hook
const useDeletePost = (postId, accessToken) => {
  // Destructure useToastContext hook
  const { showToast } = useToastContext();

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // State variables
  const [isPostDeleted, setIsPostDeleted] = useState(false); // Track whether post has been deleted
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Control visibility of post confirm delete overlay

  // Function to show the delete confirmation overlay
  const showDeleteConfirmation = async () => {
    setShowDeleteConfirm(true);
  };

  // Function to hide the delete confirmation overlay
  const hideDeleteConfirmation = async () => {
    setShowDeleteConfirm(false);
  };

  // Function to delete post data
  const deletePost = async () => {
    try {
      if (postId) {
        // Send a DELETE request to delete post data with Authorization header
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URI_POSTS}/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Set isPostDeleted to true once post data is successfully deleted
        setIsPostDeleted(true);

        // Display success message as a toast
        showToast(response?.data.success || "Success! Your post has been deleted");

        // Navigate to dashboard
        navigate("/dashboard");

      }
    } catch (error) {
      showToast(error.response?.data.error || "Internal Server Error");
    } finally {
      hideDeleteConfirmation();
    }
  };

  // Render useDeletePost custom hook
  return {
    deletePost,
    isPostDeleted,
    showDeleteConfirm,
    showDeleteConfirmation,
    hideDeleteConfirmation,
  };
};

// Export useDeletePost custom hook
export default useDeletePost;
