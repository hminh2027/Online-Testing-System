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
            className="w-full h-52"
            style={{
              background: `url("https://hatrabbits.com/wp-content/uploads/2018/10/risky-assumptions.jpg") no-repeat 50% 50%/cover`,
            }}
          ></div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={"3xl"} fontWeight={600} noOfLines={1}>
            {test.title}
          </Text>
          <Stack my={4} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
              alt={"Author"}
              size="sm"
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text>Achim Rolle</Text>
            </Stack>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack mt={6} direction={"column"}>
            <Text>
              <b>Thời lượng:</b> 10 phút
            </Text>
            <Text>
              <b>Số câu hỏi:</b> 5
            </Text>
            <Text>
              <b>Đánh giá:</b> 4.5/5
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
            <Button size="lg" colorScheme="linkedin">
              Xem chi tiết
            </Button>
            <Button
              size="lg"
              colorScheme="linkedin"
              variant="solid"
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
