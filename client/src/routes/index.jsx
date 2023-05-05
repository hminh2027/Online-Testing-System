import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Login, Signup, Forgot, Reset } from "../features/auth/pages";
import { Home, TestDetail, TestTaking } from "../features/test/pages";
import { PrivateRoute } from "../components/common";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            position: "top-right",
            isClosable: true,
            duration: 3000,
          },
        }}
      >
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
          { path: ":testId", element: <TestDetail /> },
          {
            path: ":testId/taking",
            element: <PrivateRoute Component={<TestTaking />} />,
          },
        ],
      },
    ],
  },
]);

const RouteProvider = () => <RouterProvider router={router} />;
export default RouteProvider;
