import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseItemCardProps {
  title: string;
  amount: string;
  category: string;
  date: string;
  icon: ReactNode;
  variant:
    | "food"
    | "transport"
    | "health"
    | "entertainment"
    | "utilities"
    | "other";
}

export function ExpenseItemCard({
  title,
  amount,
  category,
  date,
  icon,
  variant,
}: ExpenseItemCardProps) {
  const variants = {
    food: {
      card: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-700 dark:text-orange-300",
    },
    transport: {
      card: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-700 dark:text-blue-300",
    },
    health: {
      card: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-300",
    },
    entertainment: {
      card: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-700 dark:text-purple-300",
    },
    utilities: {
      card: "bg-yellow-50 dark:bg-yellow-900/20",
      text: "text-yellow-700 dark:text-yellow-300",
    },
    other: {
      card: "bg-gray-50 dark:bg-gray-900/20",
      text: "text-gray-700 dark:text-gray-300",
    },
  };

  const style = variants[variant];

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-md cursor-pointer ${style.card}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${style.text} truncate`}>
          {title}
        </CardTitle>
        <div className={style.text}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-xl font-bold ${style.text} mb-1`}>{amount}</div>
        <div className="flex justify-between items-center text-xs">
          <span className={style.text}>{category}</span>
          <span className={`${style.text} opacity-75`}>{date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
