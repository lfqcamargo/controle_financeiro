import { IncomeItemCard } from "./components/income-item-card";
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Home,
  Gift,
  CreditCard,
  Wallet,
} from "lucide-react";
import { CreateIncomeTypeDialog } from "./components/create-income-type-dialog";
import { CreateIncomeDialog } from "./components/create-income-dialog";
import { useState } from "react";

export function IncomePage() {
  const [isCreateIncomeTypeDialogOpen, setIsCreateIncomeTypeDialogOpen] =
    useState(false);
  const [isCreateIncomeDialogOpen, setIsCreateIncomeDialogOpen] =
    useState(false);

  const incomes = [
    {
      title: "Salário",
      amount: "R$ 4.500,00",
      category: "Trabalho",
      date: "Todo mês",
      icon: <Briefcase className="w-5 h-5" />,
      variant: "salary" as const,
    },
    {
      title: "Freelance Web",
      amount: "R$ 1.200,00",
      category: "Freelance",
      date: "Esta semana",
      icon: <DollarSign className="w-5 h-5" />,
      variant: "freelance" as const,
    },
    {
      title: "Aluguel Imóvel",
      amount: "R$ 800,00",
      category: "Investimentos",
      date: "Este mês",
      icon: <Home className="w-5 h-5" />,
      variant: "investment" as const,
    },
    {
      title: "Venda Online",
      amount: "R$ 350,00",
      category: "Vendas",
      date: "Há 2 dias",
      icon: <TrendingUp className="w-5 h-5" />,
      variant: "sales" as const,
    },
    {
      title: "Presente Aniversário",
      amount: "R$ 200,00",
      category: "Outros",
      date: "Há 3 dias",
      icon: <Gift className="w-5 h-5" />,
      variant: "other" as const,
    },
    {
      title: "Cashback Cartão",
      amount: "R$ 45,80",
      category: "Cashback",
      date: "Há 5 dias",
      icon: <CreditCard className="w-5 h-5" />,
      variant: "cashback" as const,
    },
    {
      title: "Consultoria TI",
      amount: "R$ 900,00",
      category: "Freelance",
      date: "Semana passada",
      icon: <DollarSign className="w-5 h-5" />,
      variant: "freelance" as const,
    },
    {
      title: "Dividendos",
      amount: "R$ 125,30",
      category: "Investimentos",
      date: "Semana passada",
      icon: <TrendingUp className="w-5 h-5" />,
      variant: "investment" as const,
    },
  ];

  const totalIncome = incomes.reduce((sum, income) => {
    const value = parseFloat(
      income.amount.replace("R$ ", "").replace(",", ".")
    );
    return sum + value;
  }, 0);

  const categoryTotals = incomes.reduce((acc, income) => {
    const value = parseFloat(
      income.amount.replace("R$ ", "").replace(",", ".")
    );
    acc[income.category] = (acc[income.category] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).reduce((a, b) =>
    categoryTotals[a[0]] > categoryTotals[b[0]] ? a : b
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Minhas Receitas
            </h1>
            <p className="text-muted-foreground">
              Acompanhe todas as suas fontes de renda.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <CreateIncomeTypeDialog
            open={isCreateIncomeTypeDialogOpen}
            onOpenChange={setIsCreateIncomeTypeDialogOpen}
          />
          <CreateIncomeDialog
            open={isCreateIncomeDialogOpen}
            onOpenChange={setIsCreateIncomeDialogOpen}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                Total Recebido
              </p>
              <p className="text-green-700 dark:text-green-300 text-2xl font-bold">
                R$ {totalIncome.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-green-700 dark:text-green-300" />
          </div>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                Nº de Receitas
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-2xl font-bold">
                {incomes.length}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-700 dark:text-blue-300" />
          </div>
        </div>

        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 dark:text-purple-300 text-sm font-medium">
                Maior Categoria
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-lg font-bold">
                {topCategory[0]}
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                R$ {topCategory[1].toFixed(2).replace(".", ",")}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-700 dark:text-purple-300" />
          </div>
        </div>

        <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700 dark:text-orange-300 text-sm font-medium">
                Média por Receita
              </p>
              <p className="text-orange-700 dark:text-orange-300 text-2xl font-bold">
                R$ {(totalIncome / incomes.length).toFixed(2).replace(".", ",")}
              </p>
            </div>
            <Briefcase className="w-8 h-8 text-orange-700 dark:text-orange-300" />
          </div>
        </div>
      </div>

      {/* Income Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Todas as Receitas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {incomes.map((income, index) => (
            <IncomeItemCard
              key={index}
              title={income.title}
              amount={income.amount}
              category={income.category}
              date={income.date}
              icon={income.icon}
              variant={income.variant}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
