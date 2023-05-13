import { SimpleGrid } from "@chakra-ui/react";
import QuestionCircle from "./QuestionCircle";

const QuestionGrid = ({ questions }) => {
  return (
    <SimpleGrid columns={5} spacing={3} w="fit-content" m="auto">
      {questions.map((question) => (
        <QuestionCircle index={question.index} key={question.index} />
      ))}
    </SimpleGrid>
  );
};

export default QuestionGrid;
