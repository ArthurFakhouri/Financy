import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

export function useHeader() {
  const [screenWidth, setScreenWidth] = useState(0)
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  function handleProfile() {
    navigate("/profile");
  }

  const avatarFallback = useMemo(() => {
    let fallback = "";
    if (user) {
      const splittedName = user.full_name.split(" ");

      if (splittedName.length > 1) {
        const size = splittedName.length
        fallback = splittedName[0].charAt(0) + splittedName[size - 1].charAt(0);
      } else {
        fallback = user.full_name.slice(0, 2);
      }
      fallback = fallback.toUpperCase();
    }
    return fallback;
  }, [user]);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  return {
    screenWidth,
    avatarFallback,
    pathname: location.pathname,
    handleProfile,
  };
}
