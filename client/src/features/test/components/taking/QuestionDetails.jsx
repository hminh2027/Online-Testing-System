import {
  Box,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { useTest } from "../../stores/useTest";

const testSelector = (state) => [
  state.test,
  state.currQuestionIndex,
  state.userAnswers,
  state.setUserAnswers,
];

const QuestionDetails = () => {
  const [test, currQuestionIndex, userAnswers, setUserAnswers] = useTest(
    testSelector,
    shallow
  );

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
    else setUserAnswers(currQuestionIndex, +answer);
  };

  return (
    <Flex width="auto" direction="column" textAlign="center">
      <Text fontSize="3xl" fontWeight="bold">
        Câu thứ {question.index + 1}
      </Text>

      <Text fontSize="xl">{question.text}</Text>
      {question.image_url && (
        <Box m="auto">
          <Image src={question.image_url} width={500} height={300} />
        </Box>
      )}

      <VStack>
        {!question.is_multiple ? (
          <RadioGroup
            onChange={handleChangeAnswer}
            value={userAnswers[currQuestionIndex].value}
            w="full"
            mt="5"
          >
            <Stack>
              {question.answers
                .sort((a, b) => a.index - b.index)
                .map((answer, index) => (
                  <Flex
                    border="2px"
                    borderColor="gray.200"
                    bgColor={
                      userAnswers[currQuestionIndex].value === answer.index
                        ? "green.500"
                        : "transparent"
                    }
                    color={
                      userAnswers[currQuestionIndex].value === answer.index
                        ? "white"
                        : "inherit"
                    }
                    boxSizing="border-box"
                    align="center"
                    rounded="lg"
                  >
                    <Radio
                      key={answer.id}
                      value={answer.index}
                      w="full"
                      alignItems="center"
                      justifyContent="center"
                      py="4"
                    >
                      {/* {String.fromCharCode("A".charCodeAt(0) + index)} */}
                      {answer.text}
                    </Radio>
                  </Flex>
                ))}
            </Stack>
          </RadioGroup>
        ) : (
          <RadioGroup
            onChange={handleChangeAnswer}
            value={userAnswers[currQuestionIndex].value}
            w="full"
            mt="5"
          >
            <Stack>
              {question.answers
                .sort((a, b) => a.index - b.index)
                .map((answer, index) => (
                  <Flex
                    border="2px"
                    borderColor="gray.200"
                    bgColor={
                      userAnswers[currQuestionIndex].value === answer.index
                        ? "green.500"
                        : "transparent"
                    }
                    color={
                      userAnswers[currQuestionIndex].value === answer.index
                        ? "white"
                        : "inherit"
                    }
                    boxSizing="border-box"
                    align="center"
                    rounded="lg"
                  >
                    <Radio
                      key={answer.id}
                      value={answer.index}
                      w="full"
                      alignItems="center"
                      justifyContent="center"
                      py="4"
                    >
                      {/* {String.fromCharCode("A".charCodeAt(0) + index)} */}
                      {answer.text}
                    </Radio>
                  </Flex>
                ))}
            </Stack>
          </RadioGroup>
        )}
      </VStack>
    </Flex>
  );
};

export default QuestionDetails;
