import {
  FormControl,
  FormLabel,
  Flex,
  Switch,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";

const SwitchControl = ({ name, label }) => {
  const { handleChange } = useFormikContext();
  const [field, { error }] = useField(name);
  return (
    <FormControl isInvalid={error} my={3}>
      <Flex>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Switch
          id={name}
          onChange={handleChange}
          value={field.value}
          isChecked={field.checked}
        />
      </Flex>

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SwitchControl;
