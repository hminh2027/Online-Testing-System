import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { CategoryList, CodeInput, SearchInput } from "../components";

export const Home = () => {
  return (
    <Stack>
      <Flex justify={"space-between"}>
        <Box w={"60%"}>
          <SearchInput />
        </Box>
        <Box w={"38%"}>
          <CodeInput />
        </Box>
      </Flex>
      <CategoryList />
    </Stack>
  );
};
