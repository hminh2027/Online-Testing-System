import {
  Box,
  Button,
  Flex,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { useField, useFormikContext, withFormik } from "formik";
import React from "react";
import { FaPlus, FaRegPaperPlane, FaTrash } from "react-icons/fa";
import { MdCheck, MdClose } from "react-icons/md";
import { InputControl, TextareaControl } from "./inputs";
const defaultAnswer = {
  isCorrect: false,
  text: "",
  index: 1,
};
const QuestionForm = withFormik({
  mapPropsToValues: (props) => ({
    image_url: props.image_url || "",
    text: props.text || "",
    isMultiple: props.isMultiple || false,
    score: props.score || 0,
    answers: props.answers || [defaultAnswer, { ...defaultAnswer, index: 2 }],
  }),
  handleSubmit: (values, { props }) => {
    if (props.type) console.log(props.type);
  },
})(({ handleSubmit }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField("answers");

  const handleAddAnswer = () => {
    if (field.value.length >= 7) {
      alert("Tối đa 7 câu hỏi");
      return;
    }
    setFieldValue("answers", [
      ...field.value,
      { ...defaultAnswer, index: field.value.length + 1 },
    ]);
  };

  const handleDeleteAnswer = (deleteIndex) => {
    if (field.value.length === 2) {
      alert("Tối thiểu 2 đáp án");
      return;
    }
    const updatedAnswers = field.value.reduce(
      (acc, answer, index) =>
        index !== deleteIndex
          ? [...acc, { ...answer, index: acc.length + 1 }]
          : acc,
      []
    );
    setFieldValue("answers", updatedAnswers);
  };

  const handleChangeCorrectness = (indexToChange) => {
    const newValue = field.value.map((answer, index) =>
      indexToChange === index
        ? { ...answer, isCorrect: !answer.isCorrect }
        : { ...answer }
    );
    setFieldValue("answers", newValue);
  };

  return (
    <Box>
      <InputControl type="number" label="Điểm" name="score" required={true} />
      <TextareaControl name="text" label="Câu hỏi" />
      <InputControl type="text" label="Link ảnh" name="image_url" />
      <FormLabel>Đáp án</FormLabel>
      {field.value.map((answer, index) => (
        <InputGroup key={index} my={3}>
          <InputLeftAddon p={0}>
            <Button
              onClick={() => handleChangeCorrectness(index)}
              colorScheme={answer.isCorrect ? "green" : "red"}
              leftIcon={answer.isCorrect ? <MdCheck /> : <MdClose />}
            >
              {String.fromCharCode("A".charCodeAt(0) + answer.index - 1)}
            </Button>
          </InputLeftAddon>
          <Input
            type="text"
            label={"Đáp án " + (index + 1)}
            name={`answers.${index}`}
            value={field.value[index].text}
            onChange={(e) =>
              setFieldValue(
                field.name,
                field.value.map((answer, answerIndex) => {
                  if (answerIndex === index)
                    return { ...answer, text: e.target.value };
                  return { ...answer };
                })
              )
            }
          />
          <InputRightElement w="auto">
            <IconButton
              onClick={() => handleDeleteAnswer(index)}
              colorScheme="red"
              icon={<FaTrash />}
            />
          </InputRightElement>
        </InputGroup>
      ))}
      <Flex justifyContent="space-between" w="full" mt={5}>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="teal"
          onClick={handleAddAnswer}
        >
          Thêm
        </Button>
        <Button
          leftIcon={<FaRegPaperPlane />}
          colorScheme="teal"
          onClick={handleSubmit}
        >
          Lưu
        </Button>
      </Flex>
    </Box>
  );
});
export default QuestionForm;
