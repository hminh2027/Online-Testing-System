import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { PrivateRoute } from "../components/common";
import { DefaultLayout } from "../components/layout";
import { Forgot, Login, Reset, Signup } from "../features/auth/pages";
import { CreateTest, ManagementHome } from "../features/management/pages";
import EditTest from "../features/management/pages/EditTest";
import { Home, TestDetail, TestTaking } from "../features/test/pages";
import TestResult from "../features/test/pages/TestResult";
import { NotFound } from "../pages/NotFound";
import { QuestionList } from "../features/management/components/QuestionList";
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
                path: "test",

                children: [
                  {
                    path: "",
                    element: <PrivateRoute Component={<ManagementHome />} />,
                  },
                  {
                    path: "create",
                    element: <PrivateRoute Component={<CreateTest />} />,
                  },
                  {
                    path: ":testCode/edit",
                    element: <PrivateRoute Component={<EditTest />} />,
                  },
                  {
                    path: ":testCode/questions",
                    element: <PrivateRoute Component={<QuestionList />} />,
                  },
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
