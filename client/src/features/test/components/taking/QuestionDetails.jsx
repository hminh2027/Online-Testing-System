import {
  Box,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { useTest } from "../../stores/useTest";

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

  const handleChangeAnswer = (answer) => {
    if (Array.isArray(answer))
      setUserAnswers(
        currQuestionIndex,
        answer.map((value) => parseInt(value)).sort()
      );
    else setUserAnswers(currQuestionIndex, parseInt(answer));
  };

  const handleChangeLater = () => {
    setDoLater(currQuestionIndex);
  };

  return (
    <Flex width="auto" direction="column" textAlign="center">
      <Text fontSize="3xl" fontWeight="bold">
        Question Number {question.index + 1}
      </Text>

      <Text fontSize="xl">{question.text}</Text>
      {question.image_url && (
        <Box m="auto">
          <Image src={question.image_url} width={500} height={300} />
        </Box>
      )}

      <Container>
        {!question.is_multiple ? (
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
        ) : (
          <CheckboxGroup
            onChange={handleChangeAnswer}
            value={
              userAnswers[currQuestionIndex].value === 0
                ? []
                : userAnswers[currQuestionIndex].value
            }
          >
            <Stack>
              {question.answers
                .sort((a, b) => a.index - b.index)
                .map((answer, index) => (
                  <Checkbox key={answer.id} value={answer.index}>
                    {String.fromCharCode("A".charCodeAt(0) + index)}
                    {". " + answer.text}
                  </Checkbox>
                ))}
            </Stack>
          </CheckboxGroup>
        )}

        <Checkbox
          onChange={handleChangeLater}
          isChecked={userAnswers[currQuestionIndex].doLater}
        >
          Do later
        </Checkbox>
      </Container>
    </Flex>
  );
};

export default QuestionDetails;
