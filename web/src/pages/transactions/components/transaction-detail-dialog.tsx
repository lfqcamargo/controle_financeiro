import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Tag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  ShoppingCart,
  Briefcase,
} from "lucide-react";
import type { Transaction } from "../page"; // Importar o tipo Transaction

interface TransactionDetailDialogProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
  getCategoryLabel: (
    categoryValue: string,
    type: "income" | "expense"
  ) => string;
  getCategoryColor: (
    categoryValue: string,
    type: "income" | "expense"
  ) => string;
  getCategoryTextColor: (
    categoryValue: string,
    type: "income" | "expense"
  ) => string;
}

export function TransactionDetailDialog({
  transaction,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  formatCurrency,
  getCategoryLabel,
  getCategoryColor,
  getCategoryTextColor,
}: TransactionDetailDialogProps) {
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 rounded-lg" />
        <div className="relative">
          <DialogHeader className="space-y-4 pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                  transaction.type === "income"
                    ? "bg-gradient-to-br from-green-500 to-green-600"
                    : "bg-gradient-to-br from-red-500 to-red-600"
                }`}
              >
                {transaction.type === "income" ? (
                  <TrendingUp className="w-6 h-6 text-white" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <DialogTitle className="text-foreground text-xl font-bold">
                  {transaction.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">
                  Detalhes da{" "}
                  {transaction.type === "income" ? "receita" : "despesa"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-medium text-foreground">Valor:</span>
              <span
                className={`font-semibold ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {formatCurrency(transaction.amount)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-foreground">Categoria:</span>
              <span
                className={`font-semibold ${getCategoryTextColor(
                  transaction.category,
                  transaction.type
                )}`}
              >
                {getCategoryLabel(transaction.category, transaction.type)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-foreground">Data:</span>
              <span className="font-semibold text-foreground">
                {new Date(transaction.date).toLocaleDateString("pt-BR")}
              </span>
            </div>

            {transaction.items && transaction.items.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2 text-foreground">
                    {transaction.type === "expense" ? (
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    )}
                    Itens Detalhados:
                  </h4>
                  <div className="max-h-40 overflow-y-auto pr-2">
                    <div className="grid grid-cols-12 text-xs font-semibold text-muted-foreground pb-1 border-b border-gray-200 dark:border-gray-700">
                      <span className="col-span-5">Nome</span>
                      <span className="col-span-2 text-center">Qtd</span>
                      <span className="col-span-2 text-right">Unit.</span>
                      <span className="col-span-3 text-right">Total</span>
                    </div>
                    <div className="space-y-2 pt-2">
                      {transaction.items.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 text-sm text-foreground"
                        >
                          <span className="col-span-5 truncate">
                            {item.name}
                          </span>
                          <span className="col-span-2 text-center">
                            {item.quantity}
                          </span>
                          <span className="col-span-2 text-right">
                            {formatCurrency(item.unitPrice)}
                          </span>
                          <span className="col-span-3 text-right font-medium">
                            {formatCurrency(item.totalPrice)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onEdit}
              className="flex-1 h-11 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 bg-transparent"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete(transaction.id)}
              className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
