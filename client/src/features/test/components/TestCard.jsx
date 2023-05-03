import React from "react";
import {
  Text,
  Card,
  CardHeader,
  CardBody,
  useDisclosure,
} from "@chakra-ui/react";
import { TestModal } from "./TestModal";

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
              background: `url("https://hatrabbits.com/wp-content/uploads/2018/10/risky-assumptions.jpg") no-repeat 50% 50%/cover`,
            }}
          ></div>
        </CardHeader>
        <CardBody>
          <Text size={"lg"}>{test.title}</Text>
        </CardBody>
      </Card>
      <TestModal test={test} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
