"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Receipt,
  FileText,
  Calendar,
  Tag,
  X,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Trash2,
  ShoppingCart,
  Calculator,
} from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

const expenseItemSchema = z.object({
  name: z.string().min(1, "Nome do item obrigatório"),
  quantity: z.coerce.number().positive("Quantidade deve ser maior que 0"),
  unitPrice: z.coerce.number().positive("Preço unitário deve ser maior que 0"),
  totalPrice: z.coerce.number().positive("Preço total deve ser maior que 0"),
});

const schema = z.object({
  title: z.string().min(1, "Título obrigatório").max(100, "Título muito longo"),
  amount: z.coerce
    .number()
    .positive("Informe um valor válido")
    .max(999999.99, "Valor muito alto"),
  category: z.string().min(1, "Categoria obrigatória"),
  date: z.string().min(1, "Data obrigatória"),
  hasItems: z.boolean().default(false),
  items: z.array(expenseItemSchema).optional(),
});

const categoryOptions = [
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

type FormData = z.infer<typeof schema>;
type ExpenseItem = z.infer<typeof expenseItemSchema>;

export function CreateExpenseDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
      hasItems: false,
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const {
    formState: { errors, isValid, isDirty },
    control,
    watch,
    setValue,
  } = form;

  const hasItems = watch("hasItems");
  const items = watch("items") || [];

  // Calcular total automaticamente baseado nos itens
  useEffect(() => {
    if (hasItems && items.length > 0) {
      const total = items.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0
      );
      setValue("amount", total, { shouldValidate: true });
    }
  }, [hasItems, items, setValue]);

  // Calcular preço total do item quando quantidade ou preço unitário mudam
  const calculateItemTotal = (index: number) => {
    const item = items[index];
    if (item && item.quantity && item.unitPrice) {
      const total = item.quantity * item.unitPrice;
      setValue(`items.${index}.totalPrice`, total, { shouldValidate: true });
    }
  };

  const addNewItem = () => {
    append({
      name: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    });
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Nova despesa:", {
      ...data,
      amount: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(data.amount),
      items: data.hasItems
        ? data.items?.map((item) => ({
            ...item,
            unitPrice: new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.unitPrice),
            totalPrice: new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.totalPrice),
          }))
        : undefined,
    });

    setSubmitSuccess(true);

    setTimeout(() => {
      form.reset({
        title: "",
        amount: 0,
        category: "",
        date: new Date().toISOString().split("T")[0],
        hasItems: false,
        items: [],
      });
      setSubmitSuccess(false);
      setIsSubmitting(false);
      setOpen(false);
    }, 1500);
  }

  function handleCancel() {
    form.reset({
      title: "",
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
      hasItems: false,
      items: [],
    });
    setSubmitSuccess(false);
    setIsSubmitting(false);
    setOpen(false);
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen && !isSubmitting) {
      handleCancel();
    } else {
      setOpen(newOpen);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);
  };

  const selectedCategory = categoryOptions.find(
    (cat) => cat.value === watch("category")
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-2">
          <Plus className="w-4 h-4" />
          Nova Despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-red-950 dark:via-gray-900 dark:to-orange-950 rounded-lg" />

        <div className="relative">
          <DialogHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-foreground text-xl font-bold">
                    Nova Despesa
                  </DialogTitle>
                  <p className="text-muted-foreground text-sm">
                    Registre um novo gasto com detalhamento opcional
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>

          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">
                  Despesa criada com sucesso!
                </h3>
                <p className="text-muted-foreground text-sm">
                  A nova despesa foi adicionada ao seu registro.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-red-600" />
                    Título da Despesa
                  </Label>
                  <div className="relative">
                    <Input
                      id="title"
                      {...form.register("title")}
                      placeholder="Ex: Supermercado, Gasolina, Conta de Luz..."
                      className={`pl-4 pr-10 h-11 transition-all duration-200 ${
                        errors.title
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : watch("title")
                          ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                          : "focus:border-blue-500 focus:ring-blue-200"
                      }`}
                      disabled={isSubmitting}
                    />
                    {watch("title") && !errors.title && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                    {errors.title && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                    )}
                  </div>
                  {errors.title && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.title.message}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {watch("title")?.length || 0}/100 caracteres
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-600" />
                    Categoria
                  </Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          className={`h-11 transition-all duration-200 ${
                            errors.category
                              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                              : field.value
                              ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                              : "focus:border-blue-500 focus:ring-blue-200"
                          }`}
                        >
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${category.color}`}
                                />
                                <span>{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.category.message}
                    </p>
                  )}
                  {selectedCategory && (
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-3 h-3 rounded-full ${selectedCategory.color}`}
                      />
                      <span className={selectedCategory.textColor}>
                        Categoria selecionada: {selectedCategory.label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    Data da Despesa
                  </Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      {...form.register("date")}
                      className={`pl-4 pr-10 h-11 transition-all duration-200 ${
                        errors.date
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : watch("date")
                          ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                          : "focus:border-blue-500 focus:ring-blue-200"
                      }`}
                      disabled={isSubmitting}
                    />
                    {watch("date") && !errors.date && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                    {errors.date && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                    )}
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Toggle para detalhamento de itens */}
                <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-800/20 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-red-600" />
                      Detalhar itens da despesa
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Adicione itens individuais para controle detalhado (ex:
                      produtos do mercado)
                    </p>
                  </div>
                  <Controller
                    name="hasItems"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </div>

                {/* Seção de itens */}
                {hasItems ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-red-600" />
                        Itens da Despesa
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addNewItem}
                        disabled={isSubmitting}
                        className="gap-2 bg-transparent"
                      >
                        <Plus className="w-3 h-3" />
                        Adicionar Item
                      </Button>
                    </div>

                    {fields.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Nenhum item adicionado ainda</p>
                        <p className="text-xs">
                          Clique em "Adicionar Item" para começar
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {fields.map((field, index) => (
                          <div
                            key={field.id}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50"
                          >
                            <div className="grid grid-cols-12 gap-3 items-end">
                              <div className="col-span-5">
                                <Label className="text-xs font-medium">
                                  Nome do Item
                                </Label>
                                <Input
                                  {...form.register(`items.${index}.name`)}
                                  placeholder="Ex: Arroz, Feijão, Gasolina..."
                                  className="h-9 text-sm"
                                  disabled={isSubmitting}
                                />
                                {errors.items?.[index]?.name && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.items[index]?.name?.message}
                                  </p>
                                )}
                              </div>

                              <div className="col-span-2">
                                <Label className="text-xs font-medium">
                                  Qtd
                                </Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  {...form.register(`items.${index}.quantity`, {
                                    onChange: () => calculateItemTotal(index),
                                  })}
                                  placeholder="1"
                                  className="h-9 text-sm"
                                  disabled={isSubmitting}
                                />
                              </div>

                              <div className="col-span-2">
                                <Label className="text-xs font-medium">
                                  Preço Unit.
                                </Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  {...form.register(
                                    `items.${index}.unitPrice`,
                                    {
                                      onChange: () => calculateItemTotal(index),
                                    }
                                  )}
                                  placeholder="0,00"
                                  className="h-9 text-sm"
                                  disabled={isSubmitting}
                                />
                              </div>

                              <div className="col-span-2">
                                <Label className="text-xs font-medium">
                                  Total
                                </Label>
                                <div className="h-9 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-600 rounded-md text-sm flex items-center font-medium text-red-700 dark:text-red-300">
                                  {formatCurrency(
                                    watch(`items.${index}.totalPrice`) || 0
                                  )}
                                </div>
                              </div>

                              <div className="col-span-1">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeItem(index)}
                                  disabled={isSubmitting}
                                  className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Total calculado */}
                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-700 dark:text-red-300">
                          Total Calculado:
                        </span>
                      </div>
                      <span className="text-lg font-bold text-red-700 dark:text-red-300">
                        {formatCurrency(watch("amount") || 0)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label
                      htmlFor="amount"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Receipt className="w-4 h-4 text-red-600" />
                      Valor da Despesa
                    </Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        max="999999.99"
                        {...form.register("amount")}
                        placeholder="0,00"
                        className={`pl-4 pr-10 h-11 transition-all duration-200 ${
                          errors.amount
                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                            : watch("amount") && watch("amount") > 0
                            ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                            : "focus:border-blue-500 focus:ring-blue-200"
                        }`}
                        disabled={isSubmitting}
                      />
                      {watch("amount") &&
                        watch("amount") > 0 &&
                        !errors.amount && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                        )}
                      {errors.amount && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                      )}
                    </div>
                    {errors.amount && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.amount.message}
                      </p>
                    )}
                    {watch("amount") && watch("amount") > 0 && (
                      <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                        Valor formatado: {formatCurrency(watch("amount"))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 h-11 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 bg-transparent"
                  disabled={isSubmitting}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || !isDirty || isSubmitting}
                  className="flex-1 h-11 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Despesa
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
