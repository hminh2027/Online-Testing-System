import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Login, Signup, Forgot, Reset } from "../features/auth/pages";
import { Home, TestDetail, TestTaking } from "../features/test/pages";
import { PrivateRoute } from "../components/common";
import React from "react";
import { NotFound } from "../pages/NotFound";
import TestForm from "../features/management/pages/TestForm";
import Questions from "../features/management/pages/Questions";

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
        element: <Home />,
      },
      {
        path: "test",
        children: [
          { path: ":testCode", element: <TestDetail /> },
          {
            path: ":testCode/taking",
            element: <PrivateRoute Component={<TestTaking />} />,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

const RouteProvider = () => <RouterProvider router={router} />;
export default RouteProvider;
