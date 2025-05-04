import { useAuth, useUser } from "@clerk/clerk-react";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useStore } from "./store";

// Lazy loaded components
const HomePage = lazy(() => import("./pages/HomePage"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));
const UserDashboardPage = lazy(() => import("./pages/UserDashboardPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));

function App() {
  const location = useLocation();
  const { isSignedIn, isLoaded } = useUser();
  const { fetchSavedJobs, fetchAppliedJobs } = useStore();

  const { getToken } = useAuth();

  // Fetch user data when authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (isLoaded && isSignedIn) {
        const token = await getToken();

        console.log("Token:", token);
        if (token) {
          await fetchSavedJobs(token);
          await fetchAppliedJobs(token);
        }
      }
    };
    fetchData();
  }, [isLoaded, isSignedIn, fetchSavedJobs, fetchAppliedJobs, getToken]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
