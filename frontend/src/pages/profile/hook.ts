import { useAuthStore } from "@/stores/auth"

export function useProfile() {

  const {
    user,
    logout,
  } = useAuthStore()

  function handleLogOut() {
    logout()
  }

  return {
    user,
    handleLogOut,
  }
}