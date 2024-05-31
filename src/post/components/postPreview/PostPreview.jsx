// Import styles
import styles from "./postPreview.module.css";

// Import dependencies
import { useState, useEffect, useRef } from "react";

// Import components
import Overlay from "common/components/overlay/Overlay";
import Contenteditable from "common/components/contenteditable/Contenteditable";

// Define PostPreview component to create a preview of a blog post before publishing
const PostPreview = ({
  postTitle,
  postContent,
  onPublish,
  onPreview,
  postPreviewTitleInitial,
  postPreviewDescriptionInitial,
}) => {
  // Initial Configuration
  const MAX_TITLE_LENGTH = 100; // Maximum character length for title
  const MAX_DESCRIPTION_LENGTH = 140; // Maximum character length for description

  // State variables
  const [postPreviewImages, setPostPreviewImages] = useState([]); // Store an array of post preview images
  const [showImageSelection, setShowImageSelection] = useState(false); // Control visibility of image selection component
  const [selectedImage, setSelectedImage] = useState(null); // Store currently selected image
  const [postPreviewTitle, setPostPreviewTitle] = useState(
    postPreviewTitleInitial ?? postTitle.slice(0, 100)
  ); // Store a preview of post title (first 100 characters)
  const [postPreviewDescription, setPostPreviewDescription] = useState(
    postPreviewDescriptionInitial ??
      postContent?.blocks?.[0]?.data?.text?.slice(0, 140)
  ); // Store a preview of post description (first 140 characters)

  // Refs for accessing input elements
  const previewTitleInputRef = useRef(null);
  const previewDescriptionInputRef = useRef(null);

  // Effect to update post preview images when post content changes
  useEffect(() => {
    const images = postContent?.blocks
      ?.filter((block) => block.type === "image")
      .map((imageBlock) => imageBlock.data.file.url);

    setPostPreviewImages(images || []);

    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [postContent]);

  // Handler for title change
  const handleTitleChange = (value) => {
    const currentLength = value.length;
    // Trim title if it exceeds maximum length
    if (currentLength > MAX_TITLE_LENGTH) {
      const trimmedValue = value.slice(0, MAX_TITLE_LENGTH);
      setPostPreviewTitle(trimmedValue);
    } else {
      setPostPreviewTitle(value);
    }
    // Update input height dynamically
    updateInputHeight(previewTitleInputRef);
  };

  // Handler for description change
  const handleDescriptionChange = (value) => {
    const currentLength = value.length;
    // Trim description if it exceeds maximum length
    if (currentLength > MAX_DESCRIPTION_LENGTH) {
      const trimmedValue = value.slice(0, MAX_DESCRIPTION_LENGTH);
      setPostPreviewDescription(trimmedValue);
    } else {
      setPostPreviewDescription(value);
    }
    // Update input height dynamically
    updateInputHeight(previewDescriptionInputRef);
  };

  // Handler for key press events to limit input length
  const handleKeyPress = (e, maxLength) => {
    const input = e.target;
    const currentLength = input.textContent.length;

    // Prevent typing beyond limit
    if (currentLength >= maxLength && e.key !== "Backspace") {
      e.preventDefault();
    }

    // Disallow Enter key
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Update input height dynamically based on content
  const updateInputHeight = (inputRef) => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto";
      input.style.height = `${input.scrollHeight}px`;
    }
  };

  // Handler for clicking image selection button
  const handleImageSelectionClick = () => {
    setShowImageSelection(true);
  };

  // Handler for image selection
  const handleImageSelection = (selectedImage) => {
    setSelectedImage(selectedImage);
  };

  // Handler for finishing image selection
  const handleDoneClick = () => {
    setShowImageSelection(false);
  };

  // Handler for publishing post with preview data
  const handlePublish = () => {
    onPublish({
      postPreviewImage: selectedImage,
      postPreviewTitle,
      postPreviewDescription,
    });
  };

  // Render PostPreview component
  return (
    // Overlay component for displaying post preview as an overlay
    <Overlay onClose={onPreview}>
      <div className={styles.postPreview}>
        {/* Preview Image */}
        <div className={styles.postPreviewImage}>
          {postPreviewImages.length === 0 ? (
            <p>
              Include a high-quality image in your story to make it more
              inviting to readers.
            </p>
          ) : (
            <>
              <img src={selectedImage} alt="Preview" />
              <div className={styles.imageButtons}>
                <button
                  className={`${styles.changeImageButton} button buttonPrimary`}
                  onClick={handleImageSelectionClick}
                >
                  Change Preview Image
                </button>
              </div>
              {showImageSelection ? (
                // Display image selection component
                <ImageSelection
                  images={postPreviewImages}
                  onSelect={handleImageSelection}
                  onDoneClick={handleDoneClick}
                  selectedImage={selectedImage}
                />
              ) : null}
            </>
          )}
        </div>

        {/* Preview Title */}
        <div className={styles.postPreviewTitle}>
          <label htmlFor="postPreviewTitle">Preview Title:</label>
          {/* Custom contenteditable component for editable title */}
          <Contenteditable
            id="postPreviewTitle"
            value={postPreviewTitle}
            onChange={handleTitleChange}
            onKeyDown={(e) => handleKeyPress(e, MAX_TITLE_LENGTH)}
            maxLength={MAX_TITLE_LENGTH}
            placeholder="Write a preview title"
          />
        </div>

        {/* Preview Description */}
        <div className={styles.postPreviewDescription}>
          <label htmlFor="postPreviewDescription">Preview Description:</label>
          {/* Custom contenteditable component for editable description */}
          <Contenteditable
            id="postPreviewDescription"
            value={postPreviewDescription}
            onChange={handleDescriptionChange}
            onKeyDown={(e) => handleKeyPress(e, MAX_DESCRIPTION_LENGTH)}
            maxLength={MAX_DESCRIPTION_LENGTH}
            placeholder="Write a preview description"
          />
        </div>

        {/* Publish button */}
        <div className="actionWrapper">
          <button className="button buttonPrimary" onClick={handlePublish}>
            Publish Post
          </button>
        </div>
      </div>
    </Overlay>
  );
};

// Export PostPreview component
export default PostPreview;

// Define ImageSelection component for choosing a preview image
const ImageSelection = ({ images, onSelect, onDoneClick, selectedImage }) => {
  // Render ImageSelection component
  return (
    <div className={styles.imageSelection}>
      {/* Done button for finishing image selection */}
      <button
        className={`${styles.doneButton} buttonPrimary`}
        onClick={onDoneClick}
      >
        Done
      </button>
      {/* Image list for selecting a preview image */}
      <div className={styles.imageList}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Select ${index + 1}`}
            onClick={() => onSelect(image)}
            className={selectedImage === image ? styles.selected : ""}
          />
        ))}
      </div>
    </div>
  );
};
