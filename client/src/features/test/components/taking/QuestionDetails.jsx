import React, { useCallback, useMemo } from "react";
import { useTest } from "../../stores/useTest";
import {
  Box,
  Checkbox,
  Container,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { shallow } from "zustand/shallow";

const testSelector = (state) => [
  state.test,
  state.currQuestionIndex,
  state.userAnswers,
  state.setUserAnswers,
  state.setDoLater,
];
const QuestionDetails = () => {
  const [test, currQuestionIndex, userAnswers, setUserAnswers, setDoLater] =
    useTest(testSelector, shallow);

  const question = useMemo(() => {
    return test.questions.find(
      (question) => question.index === currQuestionIndex
    );
  }, [currQuestionIndex]);

  const handleChangeAnswer = (answerIndex) => {
    console.log(userAnswers);
    setUserAnswers(currQuestionIndex, parseInt(answerIndex));
  };

  const handleChangeLater = () => {
    console.log(userAnswers);
    setDoLater(currQuestionIndex);
  };

console.log(userAnswers[currQuestionIndex].doLater);

  return (
    <Flex width="auto" direction="column" textAlign="center">
      <Text fontSize="3xl" fontWeight="bold">
        Question Number {question.id}
      </Text>
      <Text fontSize="xl">{question.text}</Text>
      <Checkbox
        onChange={handleChangeLater}
        isChecked={userAnswers[currQuestionIndex].doLater}
      >
        Do later
      </Checkbox>
      <Container>
        <RadioGroup
          onChange={handleChangeAnswer}
          value={userAnswers[currQuestionIndex].value}
        >
          <Stack>
            {question.answers
              .sort((a, b) => a.index - b.index)
              .map((answer, index) => (
                <Radio key={answer.id} value={answer.index}>
                  {String.fromCharCode("A".charCodeAt(0) + index)}
                  {". " + answer.text}
                </Radio>
              ))}
          </Stack>
        </RadioGroup>
      </Container>
    </Flex>
  );
};

export default QuestionDetails;
