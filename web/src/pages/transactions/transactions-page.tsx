"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, TrendingUp, TrendingDown, Tag } from "lucide-react";
import { TransactionDetailDialog } from "./components/transaction-detail-dialog";
import { CreateIncomeDialog } from "../income/components/create-income-dialog";
import { CreateExpenseDialog } from "../expense/components/create-expense-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Definindo o tipo para uma transação
export type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
  type: "income" | "expense";
  items?: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
};

// Dados de exemplo para as transações
const initialTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salário Mensal",
    amount: 3500.0,
    category: "salary",
    date: "2025-07-01",
    type: "income",
  },
  {
    id: "2",
    title: "Supermercado",
    amount: 285.5,
    category: "food",
    date: "2025-07-03",
    type: "expense",
    hasItems: true,
    items: [
      { name: "Arroz 5kg", quantity: 1, unitPrice: 15.0, totalPrice: 15.0 },
      { name: "Feijão 1kg", quantity: 2, unitPrice: 8.0, totalPrice: 16.0 },
      { name: "Frango 1kg", quantity: 1, unitPrice: 25.0, totalPrice: 25.0 },
      { name: "Leite 1L", quantity: 4, unitPrice: 4.5, totalPrice: 18.0 },
      { name: "Pão", quantity: 1, unitPrice: 7.5, totalPrice: 7.5 },
      { name: "Verduras", quantity: 1, unitPrice: 12.0, totalPrice: 12.0 },
      { name: "Outros", quantity: 1, unitPrice: 192.0, totalPrice: 192.0 },
    ],
  },
  {
    id: "3",
    title: "Freelance Projeto Alpha",
    amount: 1200.0,
    category: "freelance",
    date: "2025-07-05",
    type: "income",
    hasItems: true,
    items: [
      { name: "Design UI", quantity: 1, unitPrice: 500.0, totalPrice: 500.0 },
      {
        name: "Desenvolvimento Frontend",
        quantity: 1,
        unitPrice: 700.0,
        totalPrice: 700.0,
      },
    ],
  },
  {
    id: "4",
    title: "Conta de Luz",
    amount: 150.0,
    category: "utilities",
    date: "2025-07-08",
    type: "expense",
  },
  {
    id: "5",
    title: "Investimento CDB",
    amount: 200.0,
    category: "investment",
    date: "2025-07-10",
    type: "income",
  },
  {
    id: "6",
    title: "Cinema com Amigos",
    amount: 80.0,
    category: "entertainment",
    date: "2025-07-12",
    type: "expense",
  },
  {
    id: "7",
    title: "Venda de Item Usado",
    amount: 150.0,
    category: "sales",
    date: "2025-07-15",
    type: "income",
  },
  {
    id: "8",
    title: "Consulta Médica",
    amount: 300.0,
    category: "health",
    date: "2025-07-18",
    type: "expense",
  },
  {
    id: "9",
    title: "Transporte - Uber",
    amount: 45.0,
    category: "transport",
    date: "2025-07-20",
    type: "expense",
  },
  {
    id: "10",
    title: "Cashback Cartão",
    amount: 25.0,
    category: "cashback",
    date: "2025-07-22",
    type: "income",
  },
];

const categoryOptionsIncome = [
  {
    value: "salary",
    label: "Salário",
    color: "bg-blue-500",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  {
    value: "freelance",
    label: "Freelance",
    color: "bg-purple-500",
    textColor: "text-purple-700 dark:text-purple-300",
  },
  {
    value: "investment",
    label: "Investimentos",
    color: "bg-green-500",
    textColor: "text-green-700 dark:text-green-300",
  },
  {
    value: "sales",
    label: "Vendas",
    color: "bg-orange-500",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  {
    value: "cashback",
    label: "Cashback",
    color: "bg-pink-500",
    textColor: "text-pink-700 dark:text-pink-300",
  },
  {
    value: "other",
    label: "Outros",
    color: "bg-gray-500",
    textColor: "text-gray-700 dark:text-gray-300",
  },
];

const categoryOptionsExpense = [
  {
    value: "food",
    label: "Alimentação",
    color: "bg-amber-500",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  {
    value: "transport",
    label: "Transporte",
    color: "bg-cyan-500",
    textColor: "text-cyan-700 dark:text-cyan-300",
  },
  {
    value: "health",
    label: "Saúde",
    color: "bg-emerald-500",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    value: "entertainment",
    label: "Entretenimento",
    color: "bg-violet-500",
    textColor: "text-violet-700 dark:text-violet-300",
  },
  {
    value: "utilities",
    label: "Utilidades",
    color: "bg-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-300",
  },
  {
    value: "shopping",
    label: "Compras",
    color: "bg-rose-500",
    textColor: "text-rose-700 dark:text-rose-300",
  },
  {
    value: "education",
    label: "Educação",
    color: "bg-indigo-500",
    textColor: "text-indigo-700 dark:text-indigo-300",
  },
  {
    value: "other",
    label: "Outros",
    color: "bg-slate-500",
    textColor: "text-slate-700 dark:text-slate-300",
  },
];

export function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ||
      (filterType === "income" && transaction.type === "income") ||
      (filterType === "expense" && transaction.type === "expense");

    const matchesCategory =
      filterCategory === "all" || transaction.category === filterCategory;

    const matchesDate =
      (!filterStartDate ||
        new Date(transaction.date) >= new Date(filterStartDate)) &&
      (!filterEndDate || new Date(transaction.date) <= new Date(filterEndDate));

    return matchesSearch && matchesType && matchesCategory && matchesDate;
  });

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailDialogOpen(true);
  };

  const handleEditTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setIsEditDialogOpen(false);
    setIsDetailDialogOpen(false); // Close detail dialog after edit
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      setIsDetailDialogOpen(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);
  };

  const getCategoryLabel = (
    categoryValue: string,
    type: "income" | "expense"
  ) => {
    const options =
      type === "income" ? categoryOptionsIncome : categoryOptionsExpense;
    return (
      options.find((opt) => opt.value === categoryValue)?.label || categoryValue
    );
  };

  const getCategoryColor = (
    categoryValue: string,
    type: "income" | "expense"
  ) => {
    const options =
      type === "income" ? categoryOptionsIncome : categoryOptionsExpense;
    return (
      options.find((opt) => opt.value === categoryValue)?.color || "bg-gray-500"
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-6xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-foreground mb-8">
          Minhas Movimentações
        </h1>

        {/* Filtros e Busca */}
        <Card className="bg-white dark:bg-gray-900 shadow-lg border-none p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={filterType}
              onValueChange={(value: "all" | "income" | "expense") =>
                setFilterType(value)
              }
            >
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="income">Receitas</SelectItem>
                <SelectItem value="expense">Despesas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {(filterType === "income" || filterType === "all") &&
                  categoryOptionsIncome.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                        <span>{cat.label} (Receita)</span>
                      </div>
                    </SelectItem>
                  ))}
                {(filterType === "expense" || filterType === "all") &&
                  categoryOptionsExpense.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                        <span>{cat.label} (Despesa)</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                placeholder="Data inicial"
                className="flex-1"
              />
              <Input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                placeholder="Data final"
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterCategory("all");
                setFilterStartDate("");
                setFilterEndDate("");
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </Card>

        {/* Lista de Transações */}
        <Card className="bg-white dark:bg-gray-900 shadow-lg border-none">
          <CardContent className="p-0">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium">
                  Nenhuma transação encontrada.
                </p>
                <p className="text-sm">
                  Tente ajustar seus filtros ou adicione novas transações.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "income"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {transaction.title}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <span
                            className={`w-2 h-2 rounded-full ${getCategoryColor(
                              transaction.category,
                              transaction.type
                            )}`}
                          />
                          {getCategoryLabel(
                            transaction.category,
                            transaction.type
                          )}{" "}
                          •{" "}
                          {new Date(transaction.date).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold text-lg ${
                        transaction.type === "income"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Diálogo de Detalhes/Edição */}
      {selectedTransaction && (
        <TransactionDetailDialog
          transaction={selectedTransaction}
          isOpen={isDetailDialogOpen}
          onClose={() => {
            setIsDetailDialogOpen(false);
            setIsEditDialogOpen(false); // Ensure edit dialog is also closed
          }}
          onEdit={() => setIsEditDialogOpen(true)}
          onDelete={handleDeleteTransaction}
          formatCurrency={formatCurrency}
          getCategoryLabel={getCategoryLabel}
          getCategoryColor={getCategoryColor}
        />
      )}

      {/* Diálogo de Edição (condicionalmente renderizado dentro do TransactionDetailDialog ou separadamente) */}
      {isEditDialogOpen && selectedTransaction && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-foreground text-xl font-bold">
                {selectedTransaction.type === "income"
                  ? "Editar Receita"
                  : "Editar Despesa"}
              </DialogTitle>
            </DialogHeader>
            {selectedTransaction.type === "income" ? (
              <CreateIncomeDialog
                initialData={selectedTransaction}
                onSuccess={handleEditTransaction}
                onCancel={() => setIsEditDialogOpen(false)}
                dialogTitle="Editar Receita"
              />
            ) : (
              <CreateExpenseDialog
                initialData={selectedTransaction}
                onSuccess={handleEditTransaction}
                onCancel={() => setIsEditDialogOpen(false)}
                dialogTitle="Editar Despesa"
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
