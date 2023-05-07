import React, { useEffect, useState, useCallback } from "react";
import { DefaultLayout } from "../../../components/layout";
import { useParams } from "react-router-dom";
import QuestionGrid from "../components/taking/QuestionGrid";
import { useTest } from "../stores/useTest";
import { Box, Flex, Spinner, Stack, Container } from "@chakra-ui/react";
import {
  NextBtn,
  PrevBtn,
  Progress,
  QuestionDetails,
} from "../components/taking";

export const TestTaking = () => {
  const { testCode } = useParams();
  const [test, setTest, currQuestionIndex, setCurrQuestionIndex] = useTest(
    (state) => [
      state.test,
      state.setTest,
      state.currQuestionIndex,
      state.setCurrQuestionIndex,
    ]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!test) return;
      switch (e.key) {
        case "ArrowLeft":
          if (currQuestionIndex >= 1)
            setCurrQuestionIndex(currQuestionIndex - 1);
          break;
        case "ArrowRight":
          if (currQuestionIndex < test.questions.length - 1)
            setCurrQuestionIndex(currQuestionIndex + 1);
          break;
        default:
          return;
      }
    },
    [currQuestionIndex, test]
  );

  useEffect(() => {
    setTest(testCode);
  }, [testCode, setTest]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <DefaultLayout>
      {test ? (
        <Stack direction="row">
          <Box w="25%">
            <Flex justifyContent={"center"} alignItems={"center"} mb={3}>
              <Progress duration={test.duration} />
            </Flex>
            <QuestionGrid />
          </Box>
          <Box w="75%">
            <QuestionDetails />
            <Container mt={5}>
              <Stack direction={"row"} justifyContent={"space-around"}>
                <PrevBtn />
                <NextBtn />
              </Stack>
            </Container>
          </Box>
        </Stack>
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
    </DefaultLayout>
  );
};
