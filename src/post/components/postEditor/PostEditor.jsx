// Import styles
import "./postEditor.css";

// Import dependencies
import { useEffect, useRef } from "react";

// Import hooks
import useAuthContext from "common/hooks/useAuthContext";

// Define PostEditor component for creating and editing blog post content
const PostEditor = ({ onEditorChange, initialContent }) => {
  // Ref for accessing EditorJS instance
  const editorRef = useRef();

  // Accessing authentication information using custom hook
  const { authenticatedUser } = useAuthContext();

  useEffect(() => {
    // Check if EditorJS instance is not already initialized
    if (!editorRef.current) {
      // Function to initialize EditorJS instance
      const initialiseEditor = async () => {
        try {
          // Dynamic imports for EditorJS tools
          const EditorJS = (await import("@editorjs/editorjs")).default;
          const Header = (await import("@editorjs/header")).default;
          const List = (await import("@editorjs/list")).default;
          const Quote = (await import("@editorjs/quote")).default;
          const ImageTool = (await import("@editorjs/image")).default;
          const InlineCode = (await import("@editorjs/inline-code")).default;
          const CodeTool = (await import("@editorjs/code")).default;
          const Embed = (await import("@editorjs/embed")).default;

          // Create a new EditorJS instance
          const editor = new EditorJS({
            // ID of element that should contain Editor
            holder: "postEditor",

            // Tools list
            tools: {
              header: {
                class: Header,
                inlineToolbar: true,
                config: {
                  levels: [2, 3],
                  defaultLevel: 2,
                },
              },
              list: {
                class: List,
                inlineToolbar: true,
                config: {
                  defaultStyle: "unordered",
                },
              },
              quote: {
                class: Quote,
                config: {
                  quotePlaceholder: "",
                  captionPlaceholder: "",
                },
              },
              inlineCode: {
                class: InlineCode,
                inlineToolbar: true,
              },
              image: {
                class: ImageTool,
                config: {
                  endpoints: {
                    byFile: `${process.env.REACT_APP_API_URI_UPLOAD_IMAGE}/imageByFile`, // Backend file uploader endpoint
                  },
                  additionalRequestHeaders: {
                    Authorization: `Bearer ${authenticatedUser.accessToken}`,
                  },
                },
              },
              embed: Embed,
              code: CodeTool,
            },

            // Internationalization configuration
            i18n: {
              messages: {
                toolNames: {
                  Text: "Paragraph",
                  Header: "Heading",
                  InlineCode: "Inline Code",
                  Image: "Image",
                },
              },
            },

            // Set a custom placeholder
            placeholder: "Write something...",

            // onReady callback
            onReady: () => {
              // Store the EditorJS instance in the ref
              editorRef.current = editor;
            },

            // Enable autofocus
            autofocus: true,

            // Previously saved data that should be rendered
            data: initialContent,

            // onChange callback
            onChange: async () => {
              // Save content using EditorJS saver
              let content = await editor.saver.save();

              // Call onEditorChange callback if available
              if (onEditorChange) {
                onEditorChange(content);
              }
            },
          });
        } catch (error) {
          console.error("Error initializing EditorJS:", error);
        }
      };

      // Initialize EditorJS instance
      initialiseEditor();
    }

    // Cleanup function
    return () => {
      // Destroy EditorJS instance
      editorRef?.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  // Render PostEditor component
  return <div className="postEditor" id="postEditor"></div>;
};

// Export PostEditor component
export default PostEditor;
