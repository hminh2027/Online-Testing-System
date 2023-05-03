import React, { useState } from "react";
import {
  Button,
  Heading,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";

export const CodeInput = () => {
  const [code, setCode] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(code);
  };

  const onChange = (value) => setCode(value);
  return (
    <Card alignItems={"center"}>
      <CardHeader>
        <Heading as="h2" size="xl">
          Điền code trò chơi
        </Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          <PinInput onChange={onChange} value={code} type="alphanumeric">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
          <Button
            colorScheme="linkedin"
            size="md"
            textTransform={"uppercase"}
            onClick={onSubmit}
          >
            Tham gia
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};
