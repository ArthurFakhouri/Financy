import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

export function useHeader() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate()

  function handleProfile() {
    navigate("/profile")
  }

  return {
    user,
    pathname: location.pathname,
    handleProfile,
  };
}
