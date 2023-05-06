import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../components/layout";
import { useParams } from "react-router-dom";
import QuestionGrid from "../components/taking/QuestionGrid";
import { useTest } from "../stores/useTest";
import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import QuestionDetails from "../components/taking/QuestionDetails";
import Progress from "../components/taking/Progress";

export const TestTaking = () => {
  const { testCode } = useParams();
  const [test, setTest, setCurrQuestionIndex] = useTest((state) => [
    state.test,
    state.setTest,
    state.setCurrQuestionIndex,
  ]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    (async () => {
      console.log(testCode);
      if (!test || test.code !== testCode) {
        await setTest(testCode);
        setIsFetching(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (test) setCurrQuestionIndex(0);
  }, [test]);
  return (
    <DefaultLayout>
      {!isFetching ? (
        <Stack direction="row">
          <Box w="25%">
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Progress duration={test.duration} />
            </Flex>
            <QuestionGrid />
          </Box>
          <Box w="75%">
            <QuestionDetails />
          </Box>
        </Stack>
      ) : (
        <Spinner />
      )}
    </DefaultLayout>
  );
};
