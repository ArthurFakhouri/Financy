import { Plus, Search } from "lucide-react";
import { ButtonLabel } from "@/components/Button/Label";
import { Card } from "@/components/Card";
import { InputLabel } from "@/components/InputLabel";

export function Transactions() {
  return (
    <div className="px-4 md:px-12 flex flex-col gap-4 md:gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl leading-[32px] font-bold text-gray-800">
            Transações
          </h1>
          <p className="text-gray-600">
            Gerencie todas as suas transações financeiras
          </p>
        </div>
        <ButtonLabel size="sm">
          <Plus className="size-4" />
          Nova transação
        </ButtonLabel>
      </div>
      <Card className="w-full">
        <InputLabel
          label="Buscar"
          placeholder="Buscar por descrição"
          preInput={<Search className="size-4" />}
        />
      </Card>
    </div>
  );
}
