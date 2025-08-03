import { Suspense } from "react";
import { SignInForm } from "./components/sign-in-form";
import { LockKeyhole } from "lucide-react";
import { SiGooglechrome } from "@icons-pack/react-simple-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function SignInPage() {
  function handleGoogleSignIn() {
    // Aqui você chamaria seu método real de autenticação via Google
    alert("Implementar autenticação Google aqui");
  }

  return (
    <div className="flex w-full flex-col items-center px-12 py-8">
      <div className="mb-6 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/30">
          <LockKeyhole className="h-12 w-12 text-primary" />
        </div>
      </div>

      <Card className="w-full max-w-[500px] border border-border bg-card shadow-lg dark:border-border/30 dark:bg-card/95">
        <CardHeader className="space-y-2 pb-4 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Acessar painel
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Acompanhe seu estoque pelo painel do Controle Financeiro!
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pb-4">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <SiGooglechrome size={20} />
            Entrar com Google
          </Button>

          <div className="my-2 text-muted-foreground ">
            <span className="flex w-full pb-3 text-sm dark:bg-card/95 justify-center">
              ou
            </span>
            <Separator />
          </div>
        </CardContent>

        <CardContent className="pb-8">
          <Suspense fallback={<div>Carregando...</div>}>
            <SignInForm />
          </Suspense>
        </CardContent>
      </Card>

      <div className="mt-6 flex w-full max-w-[500px] justify-between">
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:bg-background/10 dark:hover:text-foreground"
        >
          <Link to={"/auth/help"} className="text-sm">
            Precisa de ajuda?
          </Link>
        </Button>

        <Button
          variant="default"
          asChild
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
        >
          <Link to={"/auth/sign-up"}>Novo Usuário</Link>
        </Button>
      </div>
    </div>
  );
}
