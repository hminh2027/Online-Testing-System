import React from "react";
import { DefaultLayout } from "../../../components/layout";
import { Box, Flex } from "@chakra-ui/react";
import { CategoryList, CodeInput, SearchInput } from "../components";

export const Home = () => {
  return (
    <DefaultLayout>
      <Flex justify={"space-between"}>
        <Box w={"60%"}>
          <SearchInput />
        </Box>
        <Box w={"38%"}>
          <CodeInput />
        </Box>
      </Flex>

      <CategoryList />
    </DefaultLayout>
  );
};
