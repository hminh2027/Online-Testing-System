import React, { useEffect, useCallback } from "react";
import { DefaultLayout } from "../../../components/layout";
import { useParams } from "react-router-dom";
import QuestionGrid from "../components/taking/QuestionGrid";
import { useTest } from "../stores/useTest";
import {
  Flex,
  Spinner,
  Stack,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { Progress, QuestionDetails } from "../components/taking";
import screenfull from "screenfull";
import { shallow } from "zustand/shallow";

export const TestTaking = () => {
  const { testCode } = useParams();
  const [
    test,
    setTest,
    currQuestionIndex,
    setCurrQuestionIndex,
    setDoLater,
    userAnswers,
  ] = useTest((state) => [
    state.test,
    state.setTest,
    state.currQuestionIndex,
    state.setCurrQuestionIndex,
    state.setDoLater,
    state.userAnswers,
  ]);

  // const handleClick = () => {
  //   if (screenfull.isEnabled) {
  //     console.log(screenfull.isFullscreen);
  //     screenfull.request();
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("fullscreenchange", (e) => {
  //     console.log("hello ");
  //     console.log(screenfull.isFullscreen);
  //   });

  //   return () => {
  //     document.removeEventListener("fullscreenchange");
  //   };
  // }, []);

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
        case "ArrowDown":
          console.log("vkl");
          break;
        default:
          return;
      }
    },
    [currQuestionIndex, test, setCurrQuestionIndex]
  );

  const handleButton = (index) => {
    if (index > test.questions.length - 1 || index < 0) return;
    setCurrQuestionIndex(index);
  };

  const handleDoLater = () => {
    setDoLater(currQuestionIndex);
  };

  const handleSubmit = () => {
    const ans = confirm("Bạn có chắc là muốn nộp bài?");
    alert(ans);
  };

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
          <Card align="center" justify="center">
            <CardHeader>
              <Flex justifyContent={"center"} alignItems={"center"} mb={3}>
                <Progress duration={test.duration} />
              </Flex>
            </CardHeader>
            <CardBody>
              <QuestionGrid />
            </CardBody>
            <CardFooter>
              <Button w="full" colorScheme="red" onClick={handleSubmit}>
                Nộp bài
              </Button>
            </CardFooter>
          </Card>
          <Card w={"75%"}>
            <CardBody>
              <QuestionDetails />
            </CardBody>
            <CardFooter justify={"center"}>
              <ButtonGroup spacing="4">
                <Button colorScheme="orange" onClick={() => handleDoLater()}>
                  {userAnswers[currQuestionIndex].doLater
                    ? "Bỏ đánh dấu"
                    : "Đánh dấu"}
                </Button>
                <Button
                  colorScheme="linkedin"
                  variant="outline"
                  onClick={() => handleButton(currQuestionIndex - 1)}
                >
                  Câu trước
                </Button>
                <Button
                  colorScheme="linkedin"
                  onClick={() => handleButton(currQuestionIndex + 1)}
                >
                  Câu tiếp
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Stack>
      ) : (
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Flex>
      )}
    </DefaultLayout>
  );
};
