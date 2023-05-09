import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";

const TextareaControl = ({ name, label }) => {
  const { handleChange } = useFormikContext();
  const [field, { error }] = useField(name);
  return (
    <FormControl isInvalid={error} my={3}>
      <FormLabel>{label}</FormLabel>
      <Textarea name={name} value={field.value} onChange={handleChange} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextareaControl;
