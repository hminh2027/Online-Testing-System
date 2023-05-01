import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Login, Signup, Forgot, Reset } from "../features/auth/pages";

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
    ],
  },
]);

const RouteProvider = () => <RouterProvider router={router} />;
export default RouteProvider;
