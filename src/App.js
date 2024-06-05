import { lazy, Suspense } from "react"; // Import for code splitting
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom"; // Import for routing

// Import hooks
import useThemeContext from "common/hooks/useThemeContext";
import useAuthContext from "common/hooks/useAuthContext";
import useToastContext from "common/hooks/useToastContext";

// Import components
import Footer from "common/components/footer/Footer";
import Header from "common/components/header/Header";
import Loader from "common/components/loader/Loader";
import Error403 from "common/components/error/error403";
import Error404 from "common/components/error/error404";
import Toast from "common/components/toast/Toast";
import MetaTags from "common/components/metaTags/MetaTags";
import { HelmetProvider } from "react-helmet-async";

// Import pages
const Home = lazy(() => import("pages/home/home"));
const Draft = lazy(() => import("pages/draft/draft"));
const Edit = lazy(() => import("pages/edit/edit"));
const Detail = lazy(() => import("pages/detail/detail"));
const Login = lazy(() => import("pages/login/login"));
const Register = lazy(() => import("pages/register/register"));
const Search = lazy(() => import("pages/search/search"));
const Dashboard = lazy(() => import("pages/dashboard/dashboard"));

// Define App component
const App = () => {
  const { theme } = useThemeContext(); // Custom hook to get theme
  const { isAuthenticated } = useAuthContext(); // Custom hook to get authentication status
  const { toastList } = useToastContext(); // Custom hook to fetch and show toast notification

  // Render App component
  return (
    <HelmetProvider>
      <MetaTags
        title="Anurag Joshi's Blog - To Code and Beyond"
        description="Welcome to Anurag Joshi's Blog. Discover insights, stories, and ideas from the world of coding and beyond."
      />
      <div className={`App ${theme}`}>
        <BrowserRouter>
          {/* Header component */}
          <Header />

          {/* Toast Notification component */}
          <Toast toastList={toastList} />

          {/* Suspense for lazy-loaded components with loading fallback */}
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* PUBLIC ROUTES (NO AUTHENTICATION REQUIRED) */}
              {/* Home route */}
              <Route path="/" element={<Home />} />

              {/* Detail route */}
              <Route path="/:id" element={<Detail />} />

              {/* Search route */}
              <Route path="/search" element={<Search />} />

              {/* Edit route with an error component */}
              <Route path="/edit" element={<Error404 />} />

              {/* AUTHENTICATED ROUTES (AUTHENTICATION REQUIRED) */}
              {/* Login route with authentication check */}
              <Route
                path="/login"
                element={
                  !isAuthenticated ? <Login /> : <Navigate to="/" replace />
                }
              />

              {/* Register route with authentication check */}
              <Route
                path="/register"
                element={isAuthenticated ? <Register /> : <Error403 />}
              />

              {/* Draft route with authentication check */}
              <Route
                path="/draft"
                element={isAuthenticated ? <Draft /> : <Error403 />}
              />

              {/* Edit route with authentication check */}
              <Route
                path="/edit/:id"
                element={isAuthenticated ? <Edit /> : <Error403 />}
              />

              {/* Dashboard route with authentication check */}
              <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Error403 />}
              />

              {/* Catch-all route for unknown paths */}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
          {/* Footer component */}
          <Footer />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
};

// Export App component
export default App;
