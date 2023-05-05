import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
  TableContainer,
  Table,
  Avatar,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsShareFill, BsFillPlayFill, BsFillStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../../../components/layout";
import { testApi } from "../api/testApi";
import moment from "moment";

export function TestDetail() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await testApi.getOneById(testId);
        setTest(res.data.data.test);
        console.log(res.data.data.test);
      } catch (err) {}
    };
    fetch();
  }, [testId]);

  return (
    <DefaultLayout>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <Stack>
          <Flex justify={"space-between"} align={"center"}>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={
                "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080"
              }
              fit={"cover"}
              align={"center"}
              w={"30%"}
            />
            <ButtonGroup
              justifyContent={"space-between"}
              w="65%"
              variant="outline"
              spacing="6"
            >
              <Button
                size="lg"
                colorScheme="linkedin"
                variant="solid"
                rightIcon={<BsFillPlayFill />}
              >
                Làm bài
              </Button>
              <Button
                size="lg"
                colorScheme="linkedin"
                variant="outline"
                rightIcon={<BsFillStarFill />}
              >
                Đánh giá
              </Button>
              <Button
                size="lg"
                colorScheme="linkedin"
                variant="outline"
                rightIcon={<BsShareFill />}
              >
                Chia sẻ
              </Button>
            </ButtonGroup>
          </Flex>
          <Stack spacing={5}>
            <Box as={"header"}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "4xl" }}
                noOfLines={1}
              >
                {test && test.title}
              </Heading>
            </Box>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"lg"}>{test && test.description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Thông tin bài kiểm tra
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Thời lượng:
                    </Text>{" "}
                    {test && test.duration} phút
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Số câu hỏi:
                    </Text>{" "}
                    {test && test.number_of_questions}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Thể loại:
                    </Text>{" "}
                    {test && test.Category.name}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Thời điểm bắt đầu:
                    </Text>{" "}
                    {test &&
                      moment(test.start_time).format("DD/MM/YYYY - HH:mm")}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Thời điểm kết thúc:
                    </Text>{" "}
                    {test && moment(test.end_time).format("DD/MM/YYYY - HH:mm")}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Tổng điểm:
                    </Text>{" "}
                    10???
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Hiển thị kết quả:
                    </Text>{" "}
                    {test && test.is_show_answer ? "Có" : "Không"}
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <TableContainer>
          <Heading mb="5" as="h4" size="md" textAlign={"center"}>
            Lịch sử làm bài
          </Heading>
          <Table
            variant="striped"
            colorScheme="linkedin"
            overflowX="visible"
            size="sm"
          >
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Tên</Th>
                <Th>Điểm</Th>
                <Th>Trạng thái</Th>
                <Th>Làm tại</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Avatar
                    src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
                    alt={"Author"}
                    size="sm"
                  />
                </Td>
                <Td>Vu hoang minh</Td>
                <Td>9</Td>
                <Td>Hoàn tất</Td>
                <Td>08:20am 19/09/2023</Td>
              </Tr>
              <Tr>
                <Td>
                  <Avatar
                    src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
                    alt={"Author"}
                    size="sm"
                  />
                </Td>
                <Td>Vu hoang minh</Td>
                <Td>9</Td>
                <Td>Hoàn tất</Td>
                <Td>08:20am 19/09/2023</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </SimpleGrid>
    </DefaultLayout>
  );
}
