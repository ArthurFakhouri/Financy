import { LogOut, Mail, UserRound } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { ButtonLabel } from "@/components/Button/Label";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { InputLabel } from "@/components/InputLabel";
import { useProfile } from "./hook";

export function Profile() {
  const { user, handleLogOut } = useProfile();

  return (
    <div className="w-full px-4 flex justify-center items-center">
      <Card className="max-w-[448px] w-full flex flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-6">
          <Avatar>{user?.full_name.slice(0, 2).toUpperCase()}</Avatar>
          <div className="flex flex-col gap-0.5">
            <strong className="font-semibold text-center text-gray-800 text-xl leading-[28px]">
              {user?.full_name}
            </strong>
            <span className="text-gray-500 text-center">{user?.email}</span>
          </div>
        </div>
        <Divider className="w-full" textClassName="px-0" />
        <div className="w-full flex flex-col gap-4">
          <InputLabel
            label="Nome completo"
            placeholder="Seu nome completo"
            preInput={<UserRound className="size-4" />}
          />
          <InputLabel
            label="E-mail"
            placeholder="mail@exemplo.com"
            preInput={<Mail className="size-4" />}
            disabled
            helper="O e-mail não pode ser alterado"
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <ButtonLabel type="submit">Salvar alterações</ButtonLabel>
          <ButtonLabel variant="outline" type="button" onClick={handleLogOut}>
            <LogOut className="text-danger size-4.5" />
            Sair da conta
          </ButtonLabel>
        </div>
      </Card>
    </div>
  );
}
