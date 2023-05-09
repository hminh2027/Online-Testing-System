import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useFormikContext, useField } from "formik";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("vi", vi);

const DateTimeInputControl = ({ name, label, required = false }) => {
  const { setFieldValue } = useFormikContext();
  const [field, { error }] = useField(name);
  return (
    <FormControl isInvalid={error} my={3} isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        minDate={new Date()}
        customInput={<Input />}
        name={name}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(date) => setFieldValue(field.name, date.toISOString())}
        locale="vi"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="HH:mm - dd/MM/yyyy"
        required={required}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default DateTimeInputControl;
