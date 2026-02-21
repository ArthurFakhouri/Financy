import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/Toast";
import { useAuthStore } from "@/stores/auth";
import { type SignUpProps, signUpSchema } from "./validation";

export function useSignUp() {
  const [viewPassword, setViewPassword] = useState(false);

  const signUp = useAuthStore((state) => state.signUp);

  const navigate = useNavigate();

  const signUpForm = useForm<SignUpProps>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = signUpForm;

  function handleLogin() {
    navigate("/login");
  }

  function handleTogglePassword(viewPassword: boolean) {
    setViewPassword(viewPassword);
  }

  async function onSubmit(data: SignUpProps) {
    try {
      const signUpMutate = await signUp({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      });

      if (signUpMutate) {
        toast.success("Cadastro realizado com sucesso!");
      }
    } catch (err) {
      toast.error("Não foi possível realizar o cadastro");
    }
  }

  return {
    errors,
    viewPassword,
    isSubmitting,
    register,
    onSubmit,
    handleLogin,
    handleSubmit,
    handleTogglePassword,
  };
}
