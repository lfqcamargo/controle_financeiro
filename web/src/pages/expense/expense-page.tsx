import { ExpenseItemCard } from "./components/expense-items-card";
import {
  ShoppingCart,
  Car,
  Heart,
  Gamepad2,
  Home,
  MoreHorizontal,
  Receipt,
} from "lucide-react";
import { CreateExpenseTypeDialog } from "./components/create-expense-type-dialog";
import { CreateExpenseDialog } from "./components/create-expense-dialog";

export function ExpensesPage() {
  const expenses = [
    {
      title: "Supermercado",
      amount: "R$ 245,80",
      category: "Alimentação",
      date: "Hoje",
      icon: <ShoppingCart className="w-5 h-5" />,
      variant: "food" as const,
    },
    {
      title: "Gasolina",
      amount: "R$ 120,00",
      category: "Transporte",
      date: "Ontem",
      icon: <Car className="w-5 h-5" />,
      variant: "transport" as const,
    },
    {
      title: "Farmácia",
      amount: "R$ 65,40",
      category: "Saúde",
      date: "2 dias",
      icon: <Heart className="w-5 h-5" />,
      variant: "health" as const,
    },
    {
      title: "Cinema",
      amount: "R$ 45,00",
      category: "Entretenimento",
      date: "3 dias",
      icon: <Gamepad2 className="w-5 h-5" />,
      variant: "entertainment" as const,
    },
    {
      title: "Conta de Luz",
      amount: "R$ 180,30",
      category: "Utilidades",
      date: "5 dias",
      icon: <Home className="w-5 h-5" />,
      variant: "utilities" as const,
    },
    {
      title: "Restaurante",
      amount: "R$ 85,50",
      category: "Alimentação",
      date: "6 dias",
      icon: <ShoppingCart className="w-5 h-5" />,
      variant: "food" as const,
    },
    {
      title: "Uber",
      amount: "R$ 25,00",
      category: "Transporte",
      date: "1 semana",
      icon: <Car className="w-5 h-5" />,
      variant: "transport" as const,
    },
    {
      title: "Material Escritório",
      amount: "R$ 95,20",
      category: "Outros",
      date: "1 semana",
      icon: <MoreHorizontal className="w-5 h-5" />,
      variant: "other" as const,
    },
  ];

  const totalExpenses = expenses.reduce((sum, expense) => {
    const value = parseFloat(
      expense.amount.replace("R$ ", "").replace(",", ".")
    );
    return sum + value;
  }, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    const value = parseFloat(
      expense.amount.replace("R$ ", "").replace(",", ".")
    );
    acc[expense.category] = (acc[expense.category] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).reduce((a, b) =>
    categoryTotals[a[0]] > categoryTotals[b[0]] ? a : b
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Minhas Despesas
          </h1>
          <p className="text-muted-foreground">
            Controle e organize todos os seus gastos.
          </p>
        </div>
        <div className="flex gap-2">
          <CreateExpenseTypeDialog />
          <CreateExpenseDialog />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                Total Gasto
              </p>
              <p className="text-red-700 dark:text-red-300 text-2xl font-bold">
                R$ {totalExpenses.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <Receipt className="w-8 h-8 text-red-700 dark:text-red-300" />
          </div>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                Nº de Despesas
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-2xl font-bold">
                {expenses.length}
              </p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-700 dark:text-blue-300" />
          </div>
        </div>

        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                Maior Categoria
              </p>
              <p className="text-green-700 dark:text-green-300 text-lg font-bold">
                {topCategory[0]}
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm">
                R$ {topCategory[1].toFixed(2).replace(".", ",")}
              </p>
            </div>
            <Home className="w-8 h-8 text-green-700 dark:text-green-300" />
          </div>
        </div>

        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 dark:text-purple-300 text-sm font-medium">
                Média por Despesa
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-2xl font-bold">
                R${" "}
                {(totalExpenses / expenses.length).toFixed(2).replace(".", ",")}
              </p>
            </div>
            <MoreHorizontal className="w-8 h-8 text-purple-700 dark:text-purple-300" />
          </div>
        </div>
      </div>

      {/* Expenses Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Todas as Despesas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {expenses.map((expense, index) => (
            <ExpenseItemCard
              key={index}
              title={expense.title}
              amount={expense.amount}
              category={expense.category}
              date={expense.date}
              icon={expense.icon}
              variant={expense.variant}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
