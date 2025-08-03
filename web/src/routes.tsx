import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth-layout";
import { SignInPage } from "./pages/auth/sign-in/sign-in-page";
import { SignUpPage } from "./pages/auth/sign-up/sign-up-page";
import { DashboardPage } from "./pages/dashboard/dashboard-page";
import { AppLayout } from "./pages/_layouts/app-layout";
import { IncomePage } from "./pages/income/income-page";
import { ExpensesPage } from "./pages/expense/expense-page";
import { TransactionsPage } from "./pages/transactions/transactions-page";

export const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "income",
        element: <IncomePage />,
      },
      {
        path: "expense",
        element: <ExpensesPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
    ],
  },
]);
