import { SignUpForm } from "./components/sign-up-form";
import { User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SiGooglechrome } from "@icons-pack/react-simple-icons";

export function SignUpPage() {
  function handleGoogleSignIn() {
    // Aqui você chamaria seu método real de autenticação via Google
    alert("Implementar autenticação Google aqui");
  }

  return (
    <div className="flex w-full flex-col items-center px-12 py-8">
      <div className="mb-4 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/30">
          <User className="h-12 w-12 text-primary" />
        </div>
      </div>

      <Card className="w-full max-w-[500px] border border-border bg-card shadow-lg dark:border-border/30 dark:bg-card/95">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Criar conta grátis
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Seja um parceiro e comece a gerenciar suas finanças!
          </CardDescription>

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
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>

      <div className="mt-4 flex w-full max-w-[500px] items-center justify-center space-x-2">
        <span className="text-muted-foreground">Já tem uma conta?</span>
        <Link
          to={"/auth/sign-in"}
          className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/90 font-medium"
        >
          Faça Login
        </Link>
      </div>
    </div>
  );
}
