import React, { useState } from "react";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Card,
  CardHeader,
  CardBody,
  HStack,
} from "@chakra-ui/react";

export const SearchInput = () => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <Card alignItems={"center"}>
      <CardHeader>
        <Heading as="h2" size="xl">
          Bạn muốn tìm bài kiểm tra nào?
        </Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          <Input placeholder="Gõ tên bài kiểm tra..." onChange={onChange} />
          <Button
            colorScheme="linkedin"
            size="md"
            textTransform={"uppercase"}
            onClick={onSubmit}
            paddingX="7"
          >
            Tìm kiếm
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};
