import { Circle, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useTest } from "../../stores/useTest";

const QuestionGrid = () => {
  const [test, setCurrQuestionIndex, userAnswers] = useTest((state) => [
    state.test,
    state.setCurrQuestionIndex,
    state.userAnswers,
  ]);

  const getBgColor = (questionIndex) => {
    const answer = userAnswers[questionIndex];
    let color = answer.value === 0 ? "gray" : "green";
    color = answer.doLater ? "orange" : color;
    if (test.currQuestionIndex === questionIndex) return "blue";
    return color;
  };

  const handleChangeQuestion = (id) => {
    setCurrQuestionIndex(id);
  };

  return (
    <SimpleGrid columns={5} spacing={3} w="fit-content" m="auto">
      {test.questions.map((question) => {
        return (
          <Circle
            color="white"
            bg={getBgColor(question.index)}
            key={question.index}
            size="10"
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
            onClick={() => handleChangeQuestion(question.index)}
          >
            {question.index + 1}
          </Circle>
        );
      })}
    </SimpleGrid>
  );
};

export default QuestionGrid;
