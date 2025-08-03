import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ExpenseCategory = {
  name: string;
  value: number;
  color: string;
};

const expenseData: ExpenseCategory[] = [
  { name: "Moradia", value: 1200, color: "#ef4444" },
  { name: "Alimentação", value: 800, color: "#f97316" },
  { name: "Transporte", value: 400, color: "#eab308" },
  { name: "Saúde", value: 300, color: "#10b981" },
  { name: "Lazer", value: 250, color: "#3b82f6" },
  { name: "Outros", value: 200, color: "#a855f7" },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: {
    payload: {
      name: string;
      value: number;
    };
  }[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md bg-background border border-border p-3 shadow-md">
        <p className="text-sm font-medium text-foreground">{data.name}</p>
        <p className="text-muted-foreground text-xs">
          {data.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    );
  }
  return null;
};

export function ExpenseChart() {
  return (
    <Card className="bg-background border border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent ?? 0 * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {expenseData.map((category) => (
            <div
              key={category.name}
              className="flex items-center gap-2 rounded-md px-2 py-1"
            >
              <div
                className="h-3 w-3 rounded-full border border-muted"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-foreground">{category.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
