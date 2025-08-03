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
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  DollarSign,
  Tag,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Palette,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório").max(50, "Nome muito longo"),
  description: z.string().max(200, "Descrição muito longa").optional(),
  color: z.string().min(1, "Selecione uma cor"),
});

const colorVariants = {
  blue: {
    name: "Azul Profissional",
    card: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-700",
    bg: "bg-blue-500",
  },
  purple: {
    name: "Roxo Criativo",
    card: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-700",
    bg: "bg-purple-500",
  },
  green: {
    name: "Verde Crescimento",
    card: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-700",
    bg: "bg-green-500",
  },
  orange: {
    name: "Laranja Energia",
    card: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-700",
    bg: "bg-orange-500",
  },
  pink: {
    name: "Rosa Recompensa",
    card: "bg-pink-50 dark:bg-pink-900/20",
    text: "text-pink-700 dark:text-pink-300",
    border: "border-pink-200 dark:border-pink-700",
    bg: "bg-pink-500",
  },
  gray: {
    name: "Cinza Neutro",
    card: "bg-gray-50 dark:bg-gray-900/20",
    text: "text-gray-700 dark:text-gray-300",
    border: "border-gray-200 dark:border-gray-700",
    bg: "bg-gray-500",
  },
};

type FormData = z.infer<typeof schema>;

interface CreateIncomeTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateIncomeTypeDialog({
  open,
  onOpenChange,
}: CreateIncomeTypeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      color: "",
    },
  });

  const {
    formState: { errors, isValid, isDirty },
  } = form;

  async function handleCreateIncomeType(data: FormData) {
    setIsSubmitting(true);

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Novo tipo de receita:", data);

    setSubmitSuccess(true);

    setTimeout(() => {
      form.reset();
      setSubmitSuccess(false);
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  }

  function handleCancelCreateIncomeType() {
    form.reset();
    setSubmitSuccess(false);
    setIsSubmitting(false);
    onOpenChange(false);
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen && !isSubmitting) {
      handleCancelCreateIncomeType();
    } else if (newOpen) {
      onOpenChange(newOpen);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-2">
          <Plus className="w-4 h-4" />
          Novo Tipo de Receita
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-950 dark:via-gray-900 dark:to-blue-950 rounded-lg" />

        <div className="relative">
          <DialogHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-foreground text-xl font-bold">
                    Novo Tipo de Receita
                  </DialogTitle>
                  <p className="text-muted-foreground text-sm">
                    Crie uma nova categoria para organizar suas receitas
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
                  Tipo criado com sucesso!
                </h3>
                <p className="text-muted-foreground text-sm">
                  O novo tipo de receita foi adicionado.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(handleCreateIncomeType)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Nome do Tipo
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Ex: Freelance, Salário, Investimentos..."
                      className={`pl-4 pr-10 h-11 transition-all duration-200 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : form.watch("name")
                          ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                          : "focus:border-blue-500 focus:ring-blue-200"
                      }`}
                      disabled={isSubmitting}
                    />
                    {form.watch("name") && !errors.name && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                    {errors.name && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                    )}
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {form.watch("name")?.length || 0}/50 caracteres
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    Descrição (opcional)
                  </Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    placeholder="Descreva este tipo de receita para facilitar a organização..."
                    className={`min-h-[80px] resize-none transition-all duration-200 ${
                      errors.description
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.description.message}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {form.watch("description")?.length || 0}/200 caracteres
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Palette className="w-4 h-4 text-indigo-600" />
                    Cor do Tipo
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(colorVariants).map(([key, variant]) => {
                      const isSelected = form.watch("color") === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            form.setValue("color", key, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                          }
                          disabled={isSubmitting}
                          className={`relative p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                            isSelected
                              ? `${variant.border} ${variant.card} shadow-lg`
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-full ${variant.bg} shadow-sm`}
                            />
                            <span
                              className={`text-xs font-medium ${
                                isSelected
                                  ? variant.text
                                  : "text-muted-foreground"
                              }`}
                            >
                              {variant.name}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute -top-1 -right-1">
                              <CheckCircle className="w-4 h-4 text-green-500 bg-white dark:bg-gray-900 rounded-full" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.color && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.color.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelCreateIncomeType}
                  className="flex-1 h-11 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 bg-transparent"
                  disabled={isSubmitting}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || !isDirty || isSubmitting}
                  className="flex-1 h-11 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Tipo
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
