import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Container } from "@chakra-ui/react";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="relative bg-slate-100">
      <Header />
      <Container maxW="8xl" p="20">
        {children}
      </Container>
      <Footer />
    </div>
  );
};
