import React from "react";
import { useTest } from "../../stores/useTest";
import { Button } from "@chakra-ui/react";

const NextBtn = () => {
  const [test, currQuestionIndex, setCurrQuestionIndex] = useTest((state) => [
    state.test,
    state.currQuestionIndex,
    state.setCurrQuestionIndex,
  ]);

  const handleNext = () => {
    if (currQuestionIndex < test.questions.length - 1)
      setCurrQuestionIndex(currQuestionIndex + 1);
  };

  return (
    <Button
      textColor="white"
      bg="blue.500"
      _hover={{ bg: "blue.700" }}
      onClick={handleNext}
    >
      Next
    </Button>
  );
};

export default NextBtn;
