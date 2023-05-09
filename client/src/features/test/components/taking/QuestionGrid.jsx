import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useTest } from "../../stores/useTest";
import QuestionCircle from "./QuestionCircle";

const QuestionGrid = () => {
  const test = useTest((state) => state.test);

  return (
    <SimpleGrid columns={5} spacing={3} w="fit-content" m="auto">
      {test.questions.map((question) => (
        <QuestionCircle index={question.index} key={question.index} />
      ))}
    </SimpleGrid>
  );
};

export default QuestionGrid;
