import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  variant: "income" | "expense" | "balance" | "investment";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function FinancialCard({
  title,
  value,
  subtitle,
  icon,
  variant,
  trend,
}: FinancialCardProps) {
  const variants = {
    income: {
      card: "bg-green-100 dark:bg-green-900",
      text: "text-green-700 dark:text-green-300",
    },
    expense: {
      card: "bg-red-100 dark:bg-red-900",
      text: "text-red-700 dark:text-red-300",
    },
    investment: {
      card: "bg-yellow-50 dark:bg-yellow-800",
      text: "text-yellow-800 dark:text-yellow-300",
    },
    balance: {
      card: "bg-slate-100 dark:bg-slate-800",
      text: "text-slate-800 dark:text-slate-200",
    },
  };

  const style = variants[variant];

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-md ${style.card}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${style.text}`}>
          {title}
        </CardTitle>
        <div className={`${style.text}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${style.text}`}>{value}</div>
        {subtitle && <p className={`text-xs mt-1 ${style.text}`}>{subtitle}</p>}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-xs ${style.text}`}>
              {trend.isPositive ? "↗" : "↘"} {trend.value}
            </span>
            <span className={`text-xs ${style.text}`}>
              em relação ao mês anterior
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
