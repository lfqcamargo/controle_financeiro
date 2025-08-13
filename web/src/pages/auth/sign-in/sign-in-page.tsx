import { LockKeyhole } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { authGoogle } from "@/api/user/auth-google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ToastError } from "@/components/toast-error";

export function SignInPage() {
  const navigate = useNavigate();

  const { mutateAsync: authGoogleFn } = useMutation({
    mutationFn: authGoogle,
  });

  async function handleGoogleSuccess(idToken: string) {
    try {
      await authGoogleFn({ idToken });
      navigate("/");
    } catch (err) {
      ToastError(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Icon Section */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
            <LockKeyhole className="h-10 w-10 text-white" />
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-elegant backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-4 pb-6 text-center">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                Bem-vindo de volta
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Acesse seu painel de controle financeiro
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-8">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleSuccess(credentialResponse.credential ?? "");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            {/* Additional Info */}
            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                Ao continuar, você concorda com nossos{" "}
                <a href="#" className="text-primary hover:underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-primary hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Precisa de ajuda?{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
