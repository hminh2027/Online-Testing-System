import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";

const InputControl = ({ type = "text", name, label, required }) => {
  const { handleChange } = useFormikContext();
  const [field, { error }] = useField(name);
  return (
    <FormControl isInvalid={error} my={3}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        name={name}
        type={type}
        value={field.value}
        onChange={handleChange}
        isRequired={required}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputControl;
