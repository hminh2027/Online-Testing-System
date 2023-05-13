import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div className="relative bg-slate-100">
      <Header />
      <Container maxW="8xl" p="20">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};
