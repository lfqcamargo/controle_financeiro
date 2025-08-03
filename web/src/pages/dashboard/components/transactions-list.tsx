import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Briefcase,
  TrendingUp,
} from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  icon: typeof ShoppingCart;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Salário - Empresa XYZ",
    amount: 5500.0,
    type: "income",
    category: "Salário",
    date: "2024-01-30",
    icon: Briefcase,
  },
  {
    id: "2",
    description: "Supermercado Extra",
    amount: -280.5,
    type: "expense",
    category: "Alimentação",
    date: "2024-01-29",
    icon: ShoppingCart,
  },
  {
    id: "3",
    description: "Aluguel Apartamento",
    amount: -1200.0,
    type: "expense",
    category: "Moradia",
    date: "2024-01-28",
    icon: Home,
  },
  {
    id: "4",
    description: "Combustível Posto Shell",
    amount: -120.0,
    type: "expense",
    category: "Transporte",
    date: "2024-01-27",
    icon: Car,
  },
  {
    id: "5",
    description: "Freelance Design",
    amount: 800.0,
    type: "income",
    category: "Freelance",
    date: "2024-01-26",
    icon: TrendingUp,
  },
  {
    id: "6",
    description: "Restaurante Italiano",
    amount: -95.0,
    type: "expense",
    category: "Alimentação",
    date: "2024-01-25",
    icon: Utensils,
  },
];

export function TransactionsList() {
  return (
    <Card className="bg-background border border-border shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Transações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTransactions.map((transaction) => {
            const Icon = transaction.icon;

            const isIncome = transaction.type === "income";
            const iconBg = isIncome
              ? "bg-green-100 dark:bg-green-900/20"
              : "bg-red-100 dark:bg-red-900/20";
            const iconText = isIncome
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400";

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg px-4 py-3 border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} ${iconText}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge
                        variant="outline"
                        className="text-xs font-medium border ring-1 ring-foreground/10"
                      >
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`font-semibold text-sm ${iconText}`}>
                  {isIncome ? "+" : ""}
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
