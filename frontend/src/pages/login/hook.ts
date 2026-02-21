import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth";
import { type LoginProps, loginSchema } from "./validation";

export function useLogin() {
  const [viewPassword, setViewPassword] = useState(false);

  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const loginForm = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = loginForm;

  function handleSignUp() {
    navigate("/signup");
  }

  function handleTogglePassword(viewPassword: boolean) {
    setViewPassword(viewPassword);
  }

  async function onSubmit(data: LoginProps) {
    try {
      const loginMutate = await login({
        email: data.email,
        password: data.password
      });

      if (loginMutate) {
        toast.success("Login realizado com sucesso!")
      }

    } catch (err) {
      toast.error(`${err}`);
    }
  }

  return {
    errors,
    viewPassword,
    register,
    onSubmit,
    handleSignUp,
    handleSubmit,
    handleTogglePassword,
  };
}
