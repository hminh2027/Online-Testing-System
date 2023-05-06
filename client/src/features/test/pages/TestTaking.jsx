import React, { useEffect, useState, useCallback } from "react";
import { DefaultLayout } from "../../../components/layout";
import { useParams } from "react-router-dom";
import QuestionGrid from "../components/taking/QuestionGrid";
import { useTest } from "../stores/useTest";
import { Box, Flex, Spinner, Stack, Container } from "@chakra-ui/react";
import QuestionDetails from "../components/taking/QuestionDetails";
import Progress from "../components/taking/Progress";
import PrevBtn from "../components/taking/PrevBtn";
import NextBtn from "../components/taking/NextBtn";

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
  const [isFetching, setIsFetching] = useState(true);

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
    (async () => {
      if (!test || test.code !== testCode) await setTest(testCode);
      setIsFetching(false);
    })();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (isFetching)
    return (
      <DefaultLayout>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      </DefaultLayout>
    );
  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
};
