import { FinancialCard } from "./components/financial-card";
import { TransactionsList } from "./components/transactions-list";
import { ExpenseChart } from "./components/expense-chart";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard Financeiro
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo das suas finanças.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Nova Transação
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FinancialCard
          title="Saldo Total"
          value="R$ 8.247,50"
          subtitle="Disponível em todas as contas"
          icon={<Wallet className="w-5 h-5" />}
          variant="balance"
          trend={{ value: "+12.5%", isPositive: true }}
        />

        <FinancialCard
          title="Receitas do Mês"
          value="R$ 6.300,00"
          subtitle="Janeiro 2024"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="income"
          trend={{ value: "+8.2%", isPositive: true }}
        />

        <FinancialCard
          title="Despesas do Mês"
          value="R$ 3.150,00"
          subtitle="Janeiro 2024"
          icon={<TrendingDown className="w-5 h-5" />}
          variant="expense"
          trend={{ value: "-5.1%", isPositive: false }}
        />

        <FinancialCard
          title="Investimentos"
          value="R$ 15.420,80"
          subtitle="Carteira diversificada"
          icon={<PiggyBank className="w-5 h-5" />}
          variant="investment"
          trend={{ value: "+18.7%", isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart />
        <TransactionsList />
      </div>
    </div>
  );
}
