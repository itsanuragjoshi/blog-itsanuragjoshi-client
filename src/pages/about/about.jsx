import styles from "./about.module.css";
import SuperAdmin from "assets/itsanuragjoshi.webp";

const About = () => {
  return (
    <main className="about">
      <div className="container">
        <div className={styles.about}>
          <div className={styles.imageWrapper}>
            <img src={SuperAdmin} alt="This is Anurag Joshi" />
          </div>
          <div className={styles.contentWrapper}>
            <h1>Hey there, I'm Anurag Joshi! 👋</h1>
            <h3 className="fontBold">
              Welcome to my little corner of the web! 🚀
            </h3>
            <p>
              I’m a self-taught developer who’s found his groove in the world of
              MERN stack magic (React, Node.js, MongoDB, Express), sprinkled
              with some extra flair from Next.js and Tailwind CSS.
            </p>
            <p>
              Before diving head-first into code, I spent over five years
              navigating the exciting waters of digital marketing and client
              servicing. Imagine me managing website and app projects, running
              digital marketing campaigns like a pro, and optimizing SEO like it
              was my second nature.
            </p>
            <p>
              The result? I bring to the table a unique concoction of design
              sense, business understanding, and technical skills, which I apply
              to every project I work on.
            </p>
            <h3>Why work with me? 🤔</h3>
            <p>
              I believe every project is an opportunity to solve a real problem
              and bring someone’s vision to life. Whether it’s building a
              feature-rich app or creating a website that leaves a lasting
              impression, I approach every project with diligence, creativity,
              and curiosity.
            </p>
            <p>
              Plus, I’m super easy to work with! My experience in client
              servicing means I’m all about communication, collaboration, and
              delivering results that exceed expectations. Think of me as the
              developer who’s as invested in your success as you are (with a few
              extra cups of coffee to fuel the late-night coding sessions ☕).
            </p>
            <p>
              When I’m not coding, you’ll catch me geeking out on the latest
              tech trends, optimizing my playlists for productivity, or learning
              something new. And of course, there's always time for watching
              random YouTube rabbit holes.
            </p>
            <h3>Let's Connect! ✨</h3>
            <p>
              Whether you're a business owner looking to expand your online
              presence, a startup ready to build your next big idea, or just
              someone curious to chat about tech, I'd love to connect.
            </p>
            <div className={styles.links}>
              <a
                href="https://medium.com/@itsanuragjoshi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a>
              <a
                href="https://linkedin.com/in/itsanuragjoshi"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/itsanuragjoshi"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a href="mailto:itsanuragjoshi@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
