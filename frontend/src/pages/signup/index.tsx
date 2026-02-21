import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from "lucide-react";
import logo from "@/assets/logo.svg";
import { ButtonLabel } from "@/components/Button/Label";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { InputLabel } from "@/components/InputLabel";
import { useSignUp } from "./hook";

export function SignUp() {
  const {
    errors,
    viewPassword,
    isSubmitting,
    register,
    onSubmit,
    handleLogin,
    handleSubmit,
    handleTogglePassword
  } = useSignUp();

  return (
    <div className="min-w-dvw min-h-dvh p-4 flex flex-col items-center justify-center gap-8 bg-gray-100">
      <img src={logo} alt="Financy logo" />
      <Card className="max-w-[448px] w-full flex flex-col gap-8">
        <div className="flex flex-col">
          <strong className="text-xl text-center text-gray-800">
            Criar conta
          </strong>
          <span className="text-gray-600 text-center">
            Comece a controlar suas finanças ainda hoje
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <InputLabel
              label="Nome completo"
              htmlFor="fullName"
              id="fullName"
              type="text"
              autoFocus
              placeholder="Seu nome completo"
              {...register("full_name")}
              error={errors.full_name?.message}
              preInput={<UserRound className="size-4" />}
            />
            <InputLabel
              label="E-mail"
              htmlFor="email"
              id="email"
              type="email"
              placeholder="mail@exemplo.com"
              {...register("email")}
              error={errors.email?.message}
              preInput={<Mail className="size-4" />}
            />
            <InputLabel
              label="Senha"
              htmlFor="password"
              id="password"
              type={viewPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              {...register("password")}
              helper="A senha deve ter no mínimo 8 caracteres"
              error={errors.password?.message}
              preInput={<Lock className="size-4" />}
              posInput={
                <button
                  type="button"
                  className="text-gray-700 hover:text-gray-500 hover:cursor-pointer"
                  onClick={() => handleTogglePassword(!viewPassword)}
                >
                  {viewPassword && <Eye className="size-4" />}
                  {!viewPassword && <EyeClosed className="size-4" />}
                </button>
              }
            />
          </div>
          <ButtonLabel type="submit" disabled={isSubmitting}>Cadastrar</ButtonLabel>
          <Divider>ou</Divider>
          <div className="flex flex-col gap-4">
            <span className="text-sm leading-[20px] text-gray-600 text-center">
              Já tem uma conta?
            </span>
            <ButtonLabel disabled={isSubmitting} type="button" variant="outline" onClick={handleLogin}>
              <LogIn className="size-4.5" />
              Fazer login
            </ButtonLabel>
          </div>
        </form>
      </Card>
    </div>
  );
}
