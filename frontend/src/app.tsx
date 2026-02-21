import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Categories } from "./pages/categories";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { SignUp } from "./pages/signup";
import { Transactions } from "./pages/transactions";
import { useAuthStore } from "./stores/auth";

type RouteProps = {
  children?: ReactNode;
};

function ProtectedRoute({ children }: RouteProps) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? (
    <div className="flex min-w-dvw min-h-dvh flex-col bg-gray-100 gap-4 md:gap-12">
      <Header />
      {children}
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

function PublicRoute({ children }: RouteProps) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
}

export function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
