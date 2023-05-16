import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  List,
  ListItem,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { attemptApi } from "../api/attemptApi";
import { Link, useParams } from "react-router-dom";
import { testApi } from "../api/testApi";
import moment from "moment";
import React from "react";

const TestResult = () => {
  const { testCode } = useParams();
  // redundant: lấy attempt trong test luôn cho nhanh?
  const [attempts, setAttempts] = useState([]);
  const [displayAttemptIndex, setDisplayAttemptIndex] = useState(0);
  const [test, setTest] = useState(null);
  const [data, setData] = useState(null);

  const optionChangeHandler = (e) => setDisplayAttemptIndex(e.target.value);

  useEffect(() => {
    (async () => {
      const { attempts } = await attemptApi.getAllByCode(testCode);
      const { test } = await testApi.getOneByCode(testCode);
      setAttempts(attempts);
      setTest(test);
    })();
  }, [testCode]);

  const formatDateDiff = (startTime, endTime) => {
    const start = moment(startTime);
    const end = moment(endTime);
    const diff = moment.duration(end.diff(start));
    let formattedDiff = null;

    if (diff.asSeconds() < 60) {
      const seconds = Math.floor(diff.asSeconds());
      formattedDiff = `${seconds} giây`;
    } else if (diff.asMinutes() < 60) {
      const minutes = Math.floor(diff.asMinutes());
      const seconds = Math.floor(diff.asSeconds()) % 60;
      formattedDiff = `${minutes} phút ${seconds} giây`;
    } else {
      const hours = Math.floor(diff.asHours());
      const minutes = Math.floor(diff.asMinutes()) % 60;
      const seconds = Math.floor(diff.asSeconds()) % 60;
      formattedDiff = `${hours} tiếng ${minutes} phút ${seconds} giây`;
    }

    return formattedDiff;
  };

  useEffect(() => {
    if (!test || !attempts) return;
    const data = {
      details: [],
      score: 0,
      totalScore: 0,
      time: formatDateDiff(
        attempts[displayAttemptIndex].start_time,
        attempts[displayAttemptIndex].end_time
      ),
      submitAt: attempts[displayAttemptIndex].end_time,
      correctAnswers: 0,
      wrongAnswers: 0,
      emptyAnswers: 0,
      tabout: attempts[displayAttemptIndex].number_of_tabout,
    };

    data.details = test.questions.map((qns) => {
      const correctAnswer = qns.answers.find((ans) => ans.is_correct).index;

      const choseAnswer = attempts[displayAttemptIndex].choices.find(
        (choice) => choice.Question.index === qns.index
      )?.Answer.index;

      data.totalScore += qns.score;

      return {
        index: qns.index,
        text: qns.text,
        score: qns.score,
        choseAnswer,
        correctAnswer,
      };
    });

    attempts[displayAttemptIndex].choices.forEach((choice) => {
      if (choice.Answer.is_correct) {
        data.score += choice.Question.score;
        data.correctAnswers++;
      } else data.wrongAnswers++;
    });

    data.emptyAnswers =
      test.questions.length - (data.correctAnswers + data.wrongAnswers);

    setData(data);
    console.log(test);
  }, [test, attempts, displayAttemptIndex]);

  return data ? (
    <HStack w="full">
      <Card w="50%">
        <CardHeader>
          <Center>
            <Heading textDecor="underline">Kết quả bài kiểm tra</Heading>
          </Center>
        </CardHeader>
        <CardBody>
          <Flex justify="space-between">
            <Text as={"span"}>Số điểm</Text>
            <Text fontWeight={"bold"}>
              {data.score}/{data.totalScore}
            </Text>
          </Flex>
          <Flex justify="space-between">
            <Text as={"span"}>Nộp lúc</Text>
            <Text fontWeight={"bold"}>
              {moment(data.submitAt).format("HH:mm - DD/MM/YYYY")}
            </Text>
          </Flex>
          <Flex justify="space-between">
            <Text as={"span"}>Thời gian làm bài</Text>
            <Text fontWeight={"bold"}>{data.time}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text as={"span"}>Số lần thoát ra ngoài</Text>
            <Text fontWeight={"bold"}>{data.tabout}</Text>
          </Flex>
          <Divider my="5" />
          <List spacing={1} w="full">
            <ListItem>
              <Flex justify="space-between">
                <Text as={"span"}>Số câu đúng</Text>
                <Text fontWeight={"bold"}>{data.correctAnswers}</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex justify="space-between">
                <Text as={"span"}>Số câu sai</Text>
                <Text fontWeight={"bold"}>{data.wrongAnswers}</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex justify="space-between">
                <Text as={"span"}>Chưa làm</Text>
                <Text fontWeight={"bold"}>{data.emptyAnswers}</Text>
              </Flex>
            </ListItem>
          </List>
        </CardBody>
        <CardFooter>
          <Link className="w-full" to={`/test/${test.code}/taking`}>
            <Button w="full" colorScheme="linkedin">
              Làm lại
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card w="full">
        <CardHeader>
          <Center>
            <Heading my="5">Lịch sử bài kiểm tra</Heading>
          </Center>
          <Select onChange={optionChangeHandler}>
            {attempts.map((attempt, index) => (
              <option key={attempt.id} value={index}>
                Lần làm bài thứ {index + 1}
              </option>
            ))}
          </Select>
        </CardHeader>
        <CardBody>
          {!test.is_show_answer && (
            <Text textAlign="center" color="red">
              *Bài kiểm tra này không hiển thị đáp án
            </Text>
          )}
          {data && (
            <TableContainer w="full" my="3">
              <Table
                variant="striped"
                colorScheme="linkedin"
                overflowX="visible"
                size="sm"
              >
                <Thead>
                  <Tr>
                    <Th textAlign={"center"}>Câu thứ</Th>
                    <Th textAlign={"center"}>Câu hỏi</Th>
                    <Th textAlign={"center"}>Chọn</Th>
                    <Th textAlign={"center"}>Đáp án đúng</Th>
                    <Th textAlign={"center"}>Điểm</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.details.map((qns) => (
                    <Tr key={qns.index}>
                      <Td textAlign={"center"}>{qns.index}</Td>
                      <Td textAlign={"center"}>{qns.text}</Td>
                      <Td textAlign={"center"}>
                        {qns.choseAnswer ? qns.choseAnswer : "-"}
                      </Td>
                      <Td textAlign={"center"}>
                        {test.is_show_answer ? qns.correctAnswer : "-"}
                      </Td>
                      <Td textAlign={"center"}>{qns.score}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </CardBody>
      </Card>
    </HStack>
  ) : (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  );
};

export default TestResult;
