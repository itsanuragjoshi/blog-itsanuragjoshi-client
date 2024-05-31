// Import styles
import styles from "./edit.module.css";

// Import dependencies
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Import components
import PostEditor from "post/components/postEditor/PostEditor";
import PostPreview from "post/components/postPreview/PostPreview";

// Import hooks
import useAuthContext from "common/hooks/useAuthContext";
import useToastContext from "common/hooks/useToastContext";
import useFetchPost from "post/hooks/useFetchPost";

// Define Edit component
const Edit = () => {
  // Extract post ID from route parameters
  const { id } = useParams();
  const postId = id;

  // Destructure useAuthContext hook
  const { authenticatedUser } = useAuthContext();

  // Destructure useToastContext hook
  const { showToast } = useToastContext();

  // Destructure useFetchPost hook
  const { post, isPostFetched } = useFetchPost(postId);

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // State variables
  const [postTitle, setPostTitle] = useState(""); // Manage post title
  const [postContent, setPostContent] = useState({}); // Manage post content
  const [postPreviewTitle, setPostPreviewTitle] = useState(""); // Manage post preview title
  const [postPreviewDescription, setPostPreviewDescription] = useState(""); // Manage post preview title
  const [showPreview, setShowPreview] = useState(false); // Control visibility of post preview

  useEffect(() => {
    if (isPostFetched) {
      setPostTitle(post.postTitle);
      setPostContent(post.postContent);
      setPostPreviewTitle(post.postPreviewTitle);
      setPostPreviewDescription(post.postPreviewDescription);
    }

    return () => {
      setPostTitle("");
      setPostContent({});
      setPostPreviewTitle("");
      setPostPreviewDescription("");
    };
  }, [
    isPostFetched,
    post.postTitle,
    post.postContent,
    post.postPreviewTitle,
    post.postPreviewDescription,
  ]);

  // Reference to textarea element for dynamic height adjustment
  const textareaRef = useRef(null);

  // Handler for toggling preview
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Handler for title change
  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
    // Update textarea height dynamically based on content
    updateTextareaHeight();
  };

  // Update textarea height dynamically based on content
  const updateTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Handler for editor content change
  const handleEditorChange = (editorData) => {
    setPostContent(editorData);
  };

  // Adjust textarea height on initial render
  useEffect(() => {
    updateTextareaHeight();
  }, [postTitle]);

  // Handler for updating post
  const handlePublish = async (previewData) => {
    try {
      // Extract images from postContent
      const images = postContent?.blocks
        ?.filter((block) => block.type === "image")
        .map((imageBlock) => imageBlock.data.file.url);

      // Array to store updated image blocks
      const updatedImages = [];

      // Rename each image file locally and post to server
      if (images?.length > 0) {
        for (const imageUrl of images) {
          try {
            // Send a POST request to backend server to rename file
            const renameResponse = await axios.post(
              `${process.env.REACT_APP_API_URI_UPLOAD_IMAGE}/imageByFilePublished`,
              { imageURL: imageUrl },
              {
                headers: {
                  Authorization: `Bearer ${authenticatedUser.accessToken}`,
                },
              }
            );

            // If rename is successful, find and update image block
            if (renameResponse.data.success === 1) {
              // Include renamed image URL in postContent
              const renamedImageUrl = renameResponse.data.file.url;

              // Find and update image block directly
              const imageBlockIndex = postContent.blocks.findIndex(
                (imageBlock) =>
                  imageBlock.type === "image" &&
                  imageBlock.data.file?.url === imageUrl
              );

              if (imageBlockIndex !== -1) {
                // Update image block in place
                postContent.blocks[imageBlockIndex] = {
                  ...postContent.blocks[imageBlockIndex],
                  data: {
                    ...postContent.blocks[imageBlockIndex].data,
                    file: { url: renamedImageUrl },
                  },
                };

                updatedImages.push(postContent.blocks[imageBlockIndex]);

                // Check if current image is postPreviewImage
                if (previewData.postPreviewImage === imageUrl) {
                  // Update postPreviewImage with renamed image URL
                  previewData.postPreviewImage = renamedImageUrl;
                }
              }
            }
          } catch (error) {
            showToast("Error! Unable to rename image");
          }
        }
      }

      // Update postContent with array of updated image blocks
      setPostContent((prevPostContent) => ({
        ...prevPostContent,
        blocks: updatedImages,
      }));

      // Send a PUT request to update post
      const response = await axios.put(
        `${process.env.REACT_APP_API_URI_POSTS}/${postId}`,
        {
          postTitle: postTitle,
          postContent: postContent,
          ...previewData,
        },
        {
          headers: {
            Authorization: `Bearer ${authenticatedUser.accessToken}`,
          },
        }
      );

      // Display success message as a toast
      showToast(response?.data.success);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      showToast(error.response?.data.error || "Internal Server Error");
    }
  };
  // Render Edit component
  return (
    <main className="edit">
      <div className="container">
        {/* Conditionally render content if data has been fetched */}
        {postTitle && postContent ? (
          <>
            {/* Post Title */}
            <div className={styles.postTitle}>
              <textarea
                ref={textareaRef}
                maxLength="150"
                placeholder="Title"
                value={postTitle}
                onChange={handleTitleChange}
                rows="1"
              ></textarea>
            </div>

            {/* Post Content */}
            <PostEditor
              onEditorChange={handleEditorChange}
              initialContent={postContent}
            />
            {/* Preview button */}
            <div className={styles.actionWrapper}>
              <button className="button buttonPrimary" onClick={togglePreview}>
                {showPreview ? "Back to Edit" : "Preview & Update Post"}
              </button>
            </div>

            {/* Conditionally render PostPreview component */}
            {showPreview ? (
              <PostPreview
                postTitle={postTitle}
                postContent={postContent}
                postPreviewTitleInitial={postPreviewTitle}
                postPreviewDescriptionInitial={postPreviewDescription}
                onPublish={handlePublish}
                onPreview={togglePreview}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </main>
  );
};

// Export Edit component
export default Edit;
