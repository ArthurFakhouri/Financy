import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { useAuthStore } from "./stores/auth";

type RouteProps = {
  children?: ReactNode;
};

function ProtectedRoute({ children }: RouteProps) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<ProtectedRoute />} />
      <Route path="/transactions" />
      <Route path="/categories" />
      <Route path="/profile" />
    </Routes>
  );
}
