import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Forgot, Login, Reset, Signup } from "../features/auth/pages";
import { Home, TestDetail, TestTaking } from "../features/test/pages";
import { TestForm, Questions } from "../features/management/pages";
import { NotFound } from "../pages/NotFound";
import { DefaultLayout } from "../components/layout";
import { PrivateRoute } from "../components/common";
import TestResult from "../features/test/pages/TestResult";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    ),
    children: [
      {
        path: "auth",
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "forgot", element: <Forgot /> },
          { path: "reset", element: <Reset /> },
        ],
      },
      {
        path: "/",
        element: <PrivateRoute Component={<DefaultLayout />} />,
        children: [
          { path: "/", element: <Home /> },
          {
            path: "test",
            children: [
              { path: ":testCode", element: <TestDetail /> },
              {
                path: ":testCode/taking",
                element: <TestTaking />,
              },
              {
                path: ":testCode/result",
                element: <TestResult />,
              },
            ],
          },
          {
            path: "management",
            children: [
              {
                path: "test/:code",
                element: <Questions />,
                children: [
                  { path: "create", element: <TestForm /> },
                  { path: "questions" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const RouteProvider = () => <RouterProvider router={router} />;
export default RouteProvider;
