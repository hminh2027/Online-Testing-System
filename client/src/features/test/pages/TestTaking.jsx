import { useEffect, useCallback, useState } from "react";
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
import io from "socket.io-client";
import { Progress, QuestionDetails } from "../components/taking";
import { useAuth } from "../../auth/stores/useAuth";
import moment from "moment";
import { attemptApi } from "../api/attemptApi";

const HEARTBEAT_INTERVAL = 5000;
export const TestTaking = () => {
  const { testCode } = useParams();
  const [
    test,
    setTest,
    currQuestionIndex,
    setCurrQuestionIndex,
    setDoLater,
    userAnswers,
    attempt,
    setAttempt,
    resumeTest,
  ] = useTest((state) => [
    state.test,
    state.setTest,
    state.currQuestionIndex,
    state.setCurrQuestionIndex,
    state.setDoLater,
    state.userAnswers,
    state.attempt,
    state.setAttempt,
    state.resumeTest,
  ]);

  const user = useAuth((state) => state.user);
  const [time, setTime] = useState(null);
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
    if (index > test.questions.length || index < 1) return;
    setCurrQuestionIndex(index);
  };

  const handleDoLater = () => {
    setDoLater(currQuestionIndex);
  };

  const handleSubmit = () => {
    const ans = confirm("Bạn có chắc là muốn nộp bài?");
    if (ans) {
      submit();
    }
  };

  const handleBeforeUnload = (event) => {
    if (!confirm("Bạn có chắc là muốn nộp bài?")) {
      event.preventDefault();
      event.returnValue = "";
    }
    return "Bạn có chắc là muốn rời đi?";
  };

  const handleBlur = () => {
    console.log("well where did you go? +1");
  };

  const submit = async () => {
    // viet tu dong nop bai + onblur
    // tu dong redirect vao phan lam bai khi vo web
    await attemptApi.updateOneOngoing(attempt.id);
  };

  useEffect(() => {
    if (!attempt || !test) return;
    let now = moment(Date.now());
    let then = moment(attempt.start_time);
    const diff = now.diff(then, "seconds");

    if (diff > test.duration * 60) {
      alert("Out of time!");
      submit();
    } else setTime(test.duration * 60 - diff);
  }, [attempt]);

  useEffect(() => {
    !test && setTest(testCode);
  }, [testCode, setTest]);

  useEffect(() => {
    test && !attempt && setAttempt(testCode);
  }, [test, testCode]);

  useEffect(() => {
    test && attempt && resumeTest(test, attempt);
  }, [test, testCode, attempt]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);
    let timer = null;
    socket.on("connect", () => {
      if (!user) return;
      socket.emit("reconnect", user.id);
      timer = setInterval(() => {
        socket.emit("heartbeat", user.id);
      }, HEARTBEAT_INTERVAL);
    });
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), HEARTBEAT_INTERVAL);
    });
    socket.on("disconnect", () => clearInterval(timer));
    return () => socket.disconnect();
  }, [user]);

  return (
    <div>
      {test && attempt && userAnswers ? (
        <Stack direction="row">
          <Card align="center" justify="center">
            <CardHeader>
              <Flex justifyContent={"center"} alignItems={"center"} mb={3}>
                {time && <Progress duration={time} />}
              </Flex>
            </CardHeader>
            <CardBody>
              <QuestionGrid questions={test.questions} />
            </CardBody>
            <CardFooter>
              <Button w="full" colorScheme="red" onClick={handleSubmit}>
                Nộp bài
              </Button>
            </CardFooter>
          </Card>
          <Card w={"75%"}>
            <CardBody>
              <QuestionDetails
                question={test.questions.find(
                  (question) => question.index === currQuestionIndex
                )}
              />
            </CardBody>
            <CardFooter justify={"center"}>
              <ButtonGroup spacing="4">
                <Button colorScheme="orange" onClick={() => handleDoLater()}>
                  {userAnswers.get(currQuestionIndex).doLater
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
    </div>
  );
};
