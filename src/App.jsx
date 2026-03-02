import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/components/auth/AuthContext';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

// Pages that don't require authentication
const PUBLIC_PAGES = ['Acceso', 'Registro', 'RecuperarPassword', 'IniciarSesion'];

// Pages accessible with auth but without premium (paywall-free)
const AUTH_ONLY_PAGES = ['Suscripcion'];

// Pages that require admin role
const ADMIN_PAGES = ['Admin'];

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/Acceso" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoadingAuth, isAdmin } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/Acceso" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/Dashboard" replace />;
  }

  return children;
};

const PremiumRoute = ({ children }) => {
  const { isAuthenticated, isLoadingAuth, isPremium, isLoadingSubscription, isAdmin } = useAuth();

  if (isLoadingAuth || isLoadingSubscription) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/Acceso" replace />;
  }

  if (!isPremium && !isAdmin) {
    return <Navigate to="/Suscripcion" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Main page route */}
      <Route path="/" element={
        PUBLIC_PAGES.includes(mainPageKey) ? (
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        ) : AUTH_ONLY_PAGES.includes(mainPageKey) ? (
          <ProtectedRoute>
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          </ProtectedRoute>
        ) : (
          <PremiumRoute>
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          </PremiumRoute>
        )
      } />

      {/* Public pages */}
      {Object.entries(Pages)
        .filter(([path]) => PUBLIC_PAGES.includes(path))
        .map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}

      {/* Auth-only pages (no premium required) */}
      {Object.entries(Pages)
        .filter(([path]) => AUTH_ONLY_PAGES.includes(path))
        .map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <ProtectedRoute>
                <LayoutWrapper currentPageName={path}>
                  <Page />
                </LayoutWrapper>
              </ProtectedRoute>
            }
          />
        ))}

      {/* Admin pages (require admin role) */}
      {Object.entries(Pages)
        .filter(([path]) => ADMIN_PAGES.includes(path))
        .map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <AdminRoute>
                <LayoutWrapper currentPageName={path}>
                  <Page />
                </LayoutWrapper>
              </AdminRoute>
            }
          />
        ))}

      {/* Premium pages (require active subscription) */}
      {Object.entries(Pages)
        .filter(([path]) => !PUBLIC_PAGES.includes(path) && !AUTH_ONLY_PAGES.includes(path) && !ADMIN_PAGES.includes(path))
        .map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <PremiumRoute>
                <LayoutWrapper currentPageName={path}>
                  <Page />
                </LayoutWrapper>
              </PremiumRoute>
            }
          />
        ))}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AppRoutes />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
