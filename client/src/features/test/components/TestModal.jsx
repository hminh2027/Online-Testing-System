import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Avatar,
  Stack,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import TestBG from "../../../assets/test.jpg";

export const TestModal = ({ isOpen, onClose, test }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={0}>
          <div
            className="h-52 w-full"
            style={{
              background: `url(${
                test.image_url || TestBG
              }) no-repeat 50% 50%/cover`,
            }}
          ></div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={"3xl"} fontWeight={600} noOfLines={1}>
            {test.title}
          </Text>
          <Stack my={4} direction={"row"} spacing={4} align={"center"}>
            <Avatar src={test.User.avatar_url} alt={"Author"} size="sm" />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text>{test.User.name}</Text>
            </Stack>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack mt={6} direction={"column"}>
            <Text>
              <b>Thời lượng:</b> {test.duration} phút
            </Text>
            <Text>
              <b>Số câu hỏi:</b> {test.number_of_questions}
            </Text>
            <Text>
              <b>Đánh giá:</b> 4.5/5
            </Text>
            <Text>
              <b>Mã bài:</b> {test.code}
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup
            justifyContent={"space-between"}
            w="full"
            variant="outline"
            spacing="6"
          >
            <Button
              as={"a"}
              href={`test/${test.code}`}
              size="lg"
              colorScheme="linkedin"
            >
              Xem chi tiết
            </Button>
            <Button
              as={"a"}
              size="lg"
              colorScheme="linkedin"
              variant="solid"
              href={`test/${test.code}/taking`}
              rightIcon={<BsFillPlayFill />}
            >
              Làm bài
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
