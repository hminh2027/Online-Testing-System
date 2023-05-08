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
      colorScheme="blue"
      onClick={handleNext}
      isDisabled={currQuestionIndex === test.questions.length - 1}
    >
      Next
    </Button>
  );
};

export default NextBtn;
