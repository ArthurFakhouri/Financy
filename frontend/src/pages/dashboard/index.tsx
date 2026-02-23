import { format } from "date-fns";
import {
  BriefcaseBusiness,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Wallet,
} from "lucide-react";
import { Card } from "@/components/Card";
import { CategoryIcons } from "@/components/CategoryIcons";
import { CategoryTag } from "@/components/CategoryTag";
import { DialogSaveTransaction } from "@/components/Dialog/SaveTransaction";
import { Link } from "@/components/Link";
import { useDashboard } from "./hook";

export function Dashboard() {
  const {
    totalBalance,
    recentTransactions,
    totalRevenueCurrMonth,
    totalExpenseCurrMonth,
    categoriesWithMoreTransactions,
    formatValue,
    formatValueByType,
  } = useDashboard();

  return (
    <div className="px-4 md:px-12 flex flex-col gap-4 md:gap-8">
      <div className="w-full flex flex-wrap items-center gap-6">
        <Card className="flex-1 min-w-[225px] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Wallet className="size-5 text-purple-base" />
            <span className="uppercase text-xs font-medium text-gray-500 tracking-[0.6px]">
              Saldo total
            </span>
          </div>
          <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
            {formatValue(totalBalance)}
          </strong>
        </Card>
        <Card className="flex-1 min-w-[225px] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <CircleArrowUp className="size-5 text-brand-base" />
            <span className="uppercase text-xs font-medium text-gray-500 tracking-[0.6px]">
              Receitas do mês
            </span>
          </div>
          <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
            {formatValue(totalRevenueCurrMonth)}
          </strong>
        </Card>
        <Card className="flex-1 min-w-[225px] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <CircleArrowDown className="size-5 text-red-base" />
            <span className="uppercase text-xs font-medium text-gray-500 tracking-[0.6px]">
              Despesas do mês
            </span>
          </div>
          <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
            {formatValue(totalExpenseCurrMonth)}
          </strong>
        </Card>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <Card className="w-full p-0 flex-1 lg:flex-none lg:w-[calc((2/3*100%)-8px)]">
          <div className="flex items-center justify-between border-b border-b-gray-200 px-6 py-5">
            <h2 className="uppercase text-xs tracking-[0.6px] text-gray-500">
              Transações recentes
            </h2>
            <Link to={"/transactions"}>
              Ver todas
              <ChevronRight className="size-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recentTransactions.map((transaction) => {
              return (
                <div
                  key={transaction.id}
                  className="min-w-fit flex py-4 border-b border-b-gray-200"
                >
                  <div className="flex-2 min-w-[320px] flex items-center px-6 gap-4">
                    <div
                      className="min-w-10 min-h-10 size-10 rounded-[8px] flex items-center justify-center"
                      style={{
                        backgroundColor: `var(--color-${transaction.category.color}-light)`,
                        color: `var(--color-${transaction.category.color}-base)`,
                      }}
                    >
                      <CategoryIcons
                        icon={transaction.category.icon}
                        className="size-4"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <strong className="font-medium text-gray-800">
                        {transaction.description}
                      </strong>
                      <span className="text-sm leading-[20px] text-gray-600">
                        {format(transaction.date, "dd/MM/yy")}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-[160px] w-[160px] flex items-center justify-center px-6">
                    <CategoryTag
                      style={{
                        backgroundColor: `var(--color-${transaction.category.color}-light)`,
                        color: `var(--color-${transaction.category.color}-base)`,
                      }}
                    >
                      {transaction.category.title}
                    </CategoryTag>
                  </div>
                  <div className="min-w-[160px] w-[160px] flex items-center justify-end pr-6">
                    <span className="flex items-center gap-2 text-sm font-semibold leading-[20px]">
                      {formatValueByType(transaction.type, transaction.value)}
                      {transaction.type === "expense" && (
                        <CircleArrowDown className="min-w-4 min-h-4 size-4 text-red-base" />
                      )}
                      {transaction.type === "revenue" && (
                        <CircleArrowUp className="min-w-4 min-h-4 size-4 text-green-base" />
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex px-6 py-5 items-center justify-center">
            <DialogSaveTransaction>
              <button
                type="button"
                className="flex items-center gap-1 text-brand-base hover:cursor-pointer hover:underline"
              >
                <Plus className="size-5" />
                Nova transação
              </button>
            </DialogSaveTransaction>
          </div>
        </Card>
        <Card className="w-full h-fit p-0 md:w-auto flex-1">
          <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-b-gray-200">
            <h2 className="uppercase text-xs tracking-[0.6px] text-gray-500">
              Categorias
            </h2>
            <Link to={"/categories"}>
              Gerenciar
              <ChevronRight className="size-5" />
            </Link>
          </div>
          <div className="flex flex-col gap-5 p-6 overflow-x-auto">
            {categoriesWithMoreTransactions.map((category) => {
              return (
                <div key={category.id} className="flex items-center gap-1">
                  <CategoryTag
                    style={{
                      backgroundColor: `var(--color-${category.color}-light)`,
                      color: `var(--color-${category.color}-base)`,
                    }}
                  >
                    {category.title}
                  </CategoryTag>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 min-w-[50px] w-[50px] flex items-center justify-end">
                      <span className="text-sm leading-[20px] text-gray-600">
                        {category.transactions.length} itens
                      </span>
                    </div>
                    <strong className="min-w-[88px] w-[88px] overflow-x-auto text-right font-semibold text-sm leading-[20px] text-gray-800">
                      {formatValue(
                        category.transactions.reduce(
                          (acc, transaction) => acc + transaction.value,
                          0,
                        ),
                      )}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
