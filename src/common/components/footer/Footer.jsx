// Import styles
import styles from "./footer.module.css";

// Define Footer component displaying developer information
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Render Footer component
  return (
    <footer className={styles.mainFooter}>
      <pre>
        <span>© {currentYear}, </span>
        <span>Developed with ❤️ by </span>
        <a
          href="https://github.com/itsanuragjoshi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ANURAG JOSHI
        </a>
      </pre>
    </footer>
  );
};

// Export Footer component
export default Footer;
