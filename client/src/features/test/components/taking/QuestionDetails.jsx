import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { shallow } from "zustand/shallow";
import { useTest } from "../../stores/useTest";
import { choiceApi } from "../../api/choiceApi";
import { socket } from "../../../../lib";

const testSelector = (state) => [
  state.currQuestionIndex,
  state.userAnswers,
  state.setUserAnswers,
  state.attempt,
];

const QuestionDetails = ({ question }) => {
  const [currQuestionIndex, userAnswers, setUserAnswers, attempt] = useTest(
    testSelector,
    shallow
  );

  const handleChangeAnswer = async (answerIndex) => {
    console.log(answerIndex);
    if (Array.isArray(answerIndex))
      setUserAnswers(
        currQuestionIndex,
        answerIndex.map((value) => parseInt(value)).sort()
      );
    else setUserAnswers(currQuestionIndex, +answerIndex);
    // await choiceApi.create({
    //   questionIndex: currQuestionIndex,
    //   answerIndex: +answerIndex,
    //   attemptId: attempt.id,
    // });

    socket.emit("changeAnswer", {
      attemptId: attempt.id,
      questionIndex: currQuestionIndex,
      answerIndex: +answerIndex,
    });
  };

  // console.log(userAnswers);

  return (
    <Flex width="auto" direction="column" textAlign="center">
      <Text fontSize="3xl" fontWeight="bold">
        Câu thứ {question.index}
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
            value={userAnswers.get(currQuestionIndex).answerIndex}
            w="full"
            mt="5"
          >
            <Stack w="full">
              {question.answers
                .sort((a, b) => a.index - b.index)
                .map((answer, index) => (
                  <Flex
                    key={answer.index}
                    border="2px"
                    borderColor="gray.200"
                    bgColor={
                      userAnswers.get(currQuestionIndex).answerIndex ===
                      answer.index
                        ? "green.500"
                        : "transparent"
                    }
                    color={
                      userAnswers.get(currQuestionIndex).answerIndex ===
                      answer.index
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
                      {answer.text}
                    </Radio>
                  </Flex>
                ))}
            </Stack>
          </RadioGroup>
        ) : (
          <CheckboxGroup
            onChange={handleChangeAnswer}
            value={userAnswers.get(currQuestionIndex).answerIndex}
            w="full"
            mt="5"
          >
            <Stack w="full">
              {question.answers
                .sort((a, b) => a.index - b.index)
                .map((answer, index) => (
                  <Flex
                    key={answer.index}
                    border="2px"
                    borderColor="gray.200"
                    bgColor={
                      userAnswers.get(currQuestionIndex).answerIndex ===
                      answer.index
                        ? "green.500"
                        : "transparent"
                    }
                    color={
                      userAnswers.get(currQuestionIndex).answerIndex ===
                      answer.index
                        ? "white"
                        : "inherit"
                    }
                    boxSizing="border-box"
                    align="center"
                    rounded="lg"
                  >
                    <Checkbox
                      key={answer.id}
                      value={answer.index}
                      w="full"
                      alignItems="center"
                      justifyContent="center"
                      py="4"
                    >
                      {answer.text}
                    </Checkbox>
                  </Flex>
                ))}
            </Stack>
          </CheckboxGroup>
        )}
      </VStack>
    </Flex>
  );
};

export default QuestionDetails;
