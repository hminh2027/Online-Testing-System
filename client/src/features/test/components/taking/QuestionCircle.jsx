import { Circle } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTest } from "../../stores/useTest";

const QuestionCircle = ({ index }) => {
  const [statusColor, setStatusColor] = useState("gray");
  const [currQuestionIndex, setCurrQuestionIndex, userAnswers] = useTest(
    (state) => [
      state.currQuestionIndex,
      state.setCurrQuestionIndex,
      state.userAnswers,
    ]
  );

  const getBgColor = (questionIndex) => {
    if (currQuestionIndex === questionIndex) return "linkedin.700";
    const answer = userAnswers[questionIndex];
    if (answer.doLater) return "orange";
    if (answer.value !== 0) return "green";
    return "gray";
  };

  useEffect(() => {
    const color = getBgColor(index);
    setStatusColor(color);
  }, [index, currQuestionIndex]);

  return (
    <Circle
      color="white"
      bg={statusColor}
      size="10"
      fontWeight="bold"
      cursor="pointer"
      onClick={() => setCurrQuestionIndex(index)}
    >
      {index + 1}
    </Circle>
  );
};

export default QuestionCircle;
