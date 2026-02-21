import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react";
import { Controller } from "react-hook-form";
import logo from "@/assets/logo.svg";
import { ButtonLabel } from "@/components/Button/Label";
import { Card } from "@/components/Card";
import { CheckBox } from "@/components/CheckBox";
import { Divider } from "@/components/Divider";
import { InputLabel } from "@/components/InputLabel";
import { Link } from "@/components/Link";
import { useLogin } from "./hook";

export function Login() {
  const {
    errors,
    control,
    viewPassword,
    register,
    onSubmit,
    handleSignUp,
    handleSubmit,
    handleTogglePassword,
  } = useLogin();

  return (
    <div className="min-w-dvw min-h-dvh p-4 flex flex-col items-center justify-center gap-8 bg-gray-100">
      <img src={logo} alt="Financy logo" />
      <Card className="max-w-[448px] w-full flex flex-col gap-8">
        <div className="flex flex-col">
          <strong className="text-xl text-center text-gray-800">
            Fazer login
          </strong>
          <span className="text-gray-600 text-center">
            Entre na sua conta para continuar
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <InputLabel
              label="E-mail"
              htmlFor="email"
              id="email"
              type="email"
              autoFocus
              {...register("email")}
              placeholder="mail@exemplo.com"
              preInput={<Mail className="size-4" />}
              error={errors.email?.message}
            />
            <InputLabel
              label="Senha"
              htmlFor="password"
              id="password"
              type={viewPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              {...register("password")}
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
              error={errors.password?.message}
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Controller
                control={control}
                name="rememberMe"
                render={({ field }) => {
                  return <CheckBox checked={field.value} onCheckedChange={field.onChange}>Lembrar-me</CheckBox>;
                }}
              />
              <Link to={"#"}>Recuperar senha</Link>
            </div>
          </div>
          <ButtonLabel type="submit">Entrar</ButtonLabel>
          <Divider>ou</Divider>
          <div className="flex flex-col gap-4">
            <span className="text-sm leading-[20px] text-gray-600 text-center">
              Ainda não tem uma conta?
            </span>
            <ButtonLabel type="button" variant="outline" onClick={handleSignUp}>
              <UserRoundPlus className="size-4.5" />
              Criar conta
            </ButtonLabel>
          </div>
        </form>
      </Card>
    </div>
  );
}
