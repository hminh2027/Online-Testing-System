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
      textColor="white"
      bg="gray.500"
      _hover={{ bg: "gray.700" }}
      onClick={handlePrev}
    >
      Prev
    </Button>
  );
};

export default PrevBtn;
