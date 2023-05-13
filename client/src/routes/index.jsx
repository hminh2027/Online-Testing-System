import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Forgot, Login, Reset, Signup } from "../features/auth/pages";
import TestForm from "../features/management/pages/TestForm";
import { Home, TestDetail, TestTaking } from "../features/test/pages";
import { NotFound } from "../pages/NotFound";
import { DefaultLayout } from "../components/layout";
import { PrivateRoute } from "../components/common";

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
        element: <DefaultLayout />,
        children: [
          { path: "/", element: <Home /> },
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
        ],
      },
      // {
      //   path: "test",
      //   children: [
      //     { path: ":testCode", element: <TestDetail /> },
      //     {
      //       path: ":testCode/taking",
      //       element: <PrivateRoute Component={<TestTaking />} />,
      //     },
      //   ],
      // },
      // {
      //   path: "management",
      //   children: [
      //     {
      //       path: "test/create",
      //       element: <TestForm />,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const RouteProvider = () => <RouterProvider router={router} />;
export default RouteProvider;
