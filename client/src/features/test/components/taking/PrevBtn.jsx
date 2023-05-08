import React from "react";
import { useTest } from "../../stores/useTest";
import { Button } from "@chakra-ui/react";

const PrevBtn = () => {
  const [currQuestionIndex, setCurrQuestionIndex] = useTest((state) => [
    state.currQuestionIndex,
    state.setCurrQuestionIndex,
  ]);

  const handlePrev = () => {
    if (currQuestionIndex >= 1) setCurrQuestionIndex(currQuestionIndex - 1);
  };

  return (
    <Button
      colorScheme="blackAlpha"
      onClick={handlePrev}
      isDisabled={currQuestionIndex === 0}
    >
      Prev
    </Button>
  );
};

export default PrevBtn;
