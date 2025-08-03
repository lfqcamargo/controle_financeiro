import { AxiosError } from "axios";
import { toast } from "sonner";

interface AxiosErrorResponseData {
  statusCode: number;
  message: string;
  error: string;
}

export function ToastError(error: unknown) {
  if (error instanceof AxiosError) {
    const response = error.response;

    if (!response) {
      return toast.error(
        "Erro ao realizar procedimento. Sem resposta do servidor."
      );
    }

    const data = response.data as AxiosErrorResponseData;
    console.log(data.message);

    switch (data.message) {
      default:
        return toast.error("Erro interno do servidor.");
    }
  }

  return toast.error(
    "Erro ao realizar procedimento. Sem resposta do servidor."
  );
}
