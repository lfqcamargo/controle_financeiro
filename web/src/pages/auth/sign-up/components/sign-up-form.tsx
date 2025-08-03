import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LockKeyhole, Mail, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema, type SignUpFormData } from "../lib/validations";
import { Delay } from "@/utils/delay";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const emailWatch = watch("email");
  const nameWatch = watch("name");
  const passwordWatch = watch("password");
  const confirmPasswordWatch = watch("confirmPassword");

  const activeButton = Boolean(
    emailWatch &&
      nameWatch &&
      passwordWatch &&
      confirmPasswordWatch &&
      !isSubmitting
  );

  async function handleSignUp(data: SignUpFormData) {
    window.alert("teste");
    await Delay();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="userName"
            className="text-base font-medium text-foreground"
          >
            Nome do Usuário
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="userName"
              type="text"
              className="h-12 border-input bg-background pl-10 text-base text-foreground transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-input/50 dark:bg-background/80 dark:focus:border-primary dark:focus:ring-primary/30"
              placeholder="Seu nome de usuário"
              disabled={isSubmitting}
              {...register("name")}
            />
          </div>
          <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
            {errors.name?.message}
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-base font-medium text-foreground"
          >
            Seu e-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              className="h-12 border-input bg-background pl-10 text-base text-foreground transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-input/50 dark:bg-background/80 dark:focus:border-primary dark:focus:ring-primary/30"
              placeholder="seu@email.com"
              disabled={isSubmitting}
              {...register("email")}
            />
          </div>
          <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
            {errors.email?.message}
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-base font-medium text-foreground"
          >
            Sua senha
          </Label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="h-12 border-input bg-background pl-10 pr-10 text-base text-foreground transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-input/50 dark:bg-background/80 dark:focus:border-primary dark:focus:ring-primary/30"
              placeholder="Mínimo de 8 caracteres"
              disabled={isSubmitting}
              {...register("password")}
            />
            <Button
              tabIndex={-1}
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
            >
              {showPassword ? (
                <EyeOff focusable={"false"} className="h-5 w-5" />
              ) : (
                <Eye focusable={"false"} className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
            {errors.password?.message}
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-base font-medium text-foreground"
          >
            Confirme sua senha
          </Label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showRepeatPassword ? "text" : "password"}
              className="h-12 border-input bg-background pl-10 pr-10 text-base text-foreground transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-input/50 dark:bg-background/80 dark:focus:border-primary dark:focus:ring-primary/30"
              placeholder="Repita sua senha"
              disabled={isSubmitting}
              {...register("confirmPassword")}
            />
            <Button
              tabIndex={-1}
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              disabled={isSubmitting}
            >
              {showRepeatPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="min-h-[16px] pl-1 mb-2 text-sm text-destructive">
            {errors.confirmPassword?.message}
          </p>
        </div>
      </div>

      <Button
        disabled={!activeButton}
        className="mt-6 h-12 w-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
        type="submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          "CADASTRAR"
        )}
      </Button>
    </form>
  );
}
