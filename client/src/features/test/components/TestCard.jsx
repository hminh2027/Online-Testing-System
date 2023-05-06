import React from "react";
import {
  Text,
  Card,
  CardHeader,
  CardBody,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { TestModal } from "./TestModal";
import TestBG from "../../../assets/test.jpg";

export const TestCard = ({ test }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        cursor={"pointer"}
        onClick={onOpen}
        className="tes"
        h={"2xs"}
        overflow={"hidden"}
      >
        <CardHeader p={0} h={"50%"}>
          <div
            className="h-full w-full"
            style={{
              background: `url(${
                test.image_url || TestBG
              }) no-repeat 50% 50%/cover`,
            }}
          ></div>
        </CardHeader>
        <CardBody>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {test.title}
          </Text>
          <Divider my={2} />
          <Text fontSize={"sm"}>
            Mã bài kiểm tra: <i>{test.code}</i>
          </Text>
        </CardBody>
      </Card>
      <TestModal test={test} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
