import { Plus, Search } from "lucide-react";
import { ButtonLabel } from "@/components/Button/Label";
import { Card } from "@/components/Card";
import { DialogSaveTransaction } from "@/components/Dialog/SaveTransaction";
import { InputLabel } from "@/components/InputLabel";
import { SelectLabel } from "@/components/SelectLabel";
import { TransactionsTable } from "@/components/TransactionsTable";
import { useTransactions } from "./hook";

export function Transactions() {
  const {
    filters,
    periods,
    typeFilters,
    categoryFilters,
    filteredTransactions,
    transactionColumnsCustom,
    handleChangeFilter,
  } = useTransactions();

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
        <DialogSaveTransaction>
          <ButtonLabel size="sm">
            <Plus className="size-4" />
            Nova transação
          </ButtonLabel>
        </DialogSaveTransaction>
      </div>
      <Card className="w-full pt-5 px-6 pb-6 flex flex-wrap items-center gap-4">
        <InputLabel
          label="Buscar"
          placeholder="Buscar por descrição"
          preInput={<Search className="size-4" />}
          value={filters.search}
          onChange={(e) => handleChangeFilter("search", e.target.value)}
        />
        <SelectLabel
          label="Tipo"
          valuePlaceholder="Selecione o tipo"
          items={typeFilters}
          value={filters.type}
          onValueChange={(value) => handleChangeFilter("type", value)}
        />
        <SelectLabel
          label="Categoria"
          items={categoryFilters}
          value={filters.category}
          onValueChange={(value) => handleChangeFilter("category", value)}
        />
        <SelectLabel
          label="Período"
          items={periods}
          value={filters.period}
          onValueChange={(value) => handleChangeFilter("period", value)}
        />
      </Card>
      <div>
        <TransactionsTable
          data={filteredTransactions}
          columns={transactionColumnsCustom}
        />
      </div>
    </div>
  );
}
