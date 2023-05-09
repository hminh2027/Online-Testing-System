import {
  FormControl,
  FormLabel,
  Select,
  Skeleton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";

const SelectControl = function SelectControl({ options, label, name }) {
  const { setFieldValue } = useFormikContext();
  const [field, { error }] = useField(name);
  return (
    <FormControl my={3}>
      <FormLabel>{label}</FormLabel>
      {options ? (
        <Select
          name={name}
          onChange={(e) => setFieldValue(field.name, parseInt(e.target.value))}
          value={field.value}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Skeleton as={Select}></Skeleton>
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
export default SelectControl;
