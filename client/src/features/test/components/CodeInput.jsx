import React, { useState } from "react";
import {
  Button,
  Heading,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { testApi } from "../api/testApi";
import { useNavigate } from "react-router-dom";

export const CodeInput = () => {
  const [code, setCode] = useState(null);
  const [error, setError] = useState(false);
  const nagivate = useNavigate();

  const onSubmit = (e) => {
    if (!code) return;
    e.preventDefault();
    (async () => {
      try {
        const { test } = await testApi.getOneByCode(code);
        nagivate(`/test/${test.code}`);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    })();
  };

  const onChange = (value) => setCode(value.toUpperCase());
  return (
    <Card alignItems={"center"}>
      <CardHeader>
        <Heading as="h2" size="xl">
          Điền code bài kiểm tra
        </Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          <PinInput onChange={onChange} value={code} type="alphanumeric">
            {Array.from({ length: 6 }, (_, i) => (
              <PinInputField key={i} borderColor={error ? "red" : "inherit"} />
            ))}
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
