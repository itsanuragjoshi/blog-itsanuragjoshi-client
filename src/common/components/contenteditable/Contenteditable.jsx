// Import dependencies
import { useEffect, useRef } from "react";

// Define Contenteditable component for creating a content-editable div
const Contenteditable = ({
  value, // Content value to display in contenteditable div
  onChange, // Function to handle content changes
  maxLength, // Maximum length allowed for content
  onKeyDown, // Function to handle keydown events
  placeholder, // Placeholder text for contenteditable div
}) => {
  // Reference to contenteditable div
  const contentEditableRef = useRef(null);

  // Update contenteditable div when value prop changes
  useEffect(() => {
    // Check if current content is different from value prop
    if (contentEditableRef.current.textContent !== value) {
      // Update contenteditable div with new value
      contentEditableRef.current.textContent = value;
    }
  }, [value]);

  // Render Contenteditable component
  return (
    <div
      contentEditable="true"
      ref={contentEditableRef}
      onInput={(event) => {
        // Handle input events by updating content
        onChange(event.target.textContent);
      }}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
      placeholder={placeholder}
    />
  );
};

// Export Contenteditable component
export default Contenteditable;
