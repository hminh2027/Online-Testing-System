import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { withFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { managementApi } from "../../api/managementApi";
import {
  DateTimeInputControl,
  InputControl,
  SelectControl,
  SwitchControl,
  TextareaControl,
} from "./inputs";

const TestMetadataFormSchema = Yup.object().shape({
  title: Yup.string().required("Tiêu đề không được bỏ trống"),
  description: Yup.string().optional(),
  duration: Yup.number()
    .min(5, "Thời lượng tối thiểu 5 phút")
    .required("Thời lượng không được bỏ trống")
    .default(5),
  numberOfQuestions: Yup.number()
    .min(1, "Số lượng câu hỏi tối thiểu là 1")
    .required("Số lượng câu hỏi không đươc bỏ trống")
    .default(1),
  startTime: Yup.date()
    .required("Thời điểm bắt đầu không được bỏ trống")
    .nullable(),
  endTime: Yup.date().optional().nullable(),
  attemptLimit: Yup.number().min(0).required("Giới hạn số lượt").default(0),
  isPublic: Yup.bool().default(false),
  isMix: Yup.bool().default(false),
  isShowAnswer: Yup.bool().default(false),
  categoryId: Yup.number().min(1).required(),
});

const TestMetadataForm = withFormik({
  handleSubmit: async (values) => {
    await managementApi.createTest(values);
  },
  mapPropsToValues: () => ({
    title: "",
    description: "",
    duration: 5,
    numberOfQuestions: 1,
    startTime: null,
    endTime: null,
    attemptLimit: 0,
    isPublic: false,
    isMix: false,
    isShowAnswer: false,
    categoryId: 0,
  }),
  validationSchema: TestMetadataFormSchema,
})(({ handleSubmit }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await managementApi.getALlWithCategory();
      setCategories(data.categories);
    })();
  }, []);
  return (
    <Container maxW="container.md" bg="white" p="5" borderRadius="xl">
      <form onSubmit={handleSubmit}>
        <Text textAlign="center" fontWeight="bold" fontSize="3xl" mb="3">
          Tạo bài trắc nghiệm
        </Text>
        <InputControl type="text" name="title" label="Tiêu đề" required />
        <TextareaControl name="description" label="Mô tả" />
        <Flex wrap={["wrap", "nowrap"]} gap="4">
          <InputControl
            type="number"
            name="duration"
            label="Thời lượng - phút"
            required
          />
          <InputControl
            type="number"
            name="numberOfQuestions"
            label="Số lượng câu hỏi"
            required
          />
          <InputControl
            type="number"
            name="attemptLimit"
            label="Giới hạn số lượt"
            required
          />
        </Flex>

        <SelectControl
          options={
            categories &&
            categories.map((cate) => ({
              value: cate.id,
              label: cate.name,
            }))
          }
          name="categoryId"
          label="Chủ đề"
        />

        <Flex wrap={["wrap", "nowrap"]} gap="4">
          <DateTimeInputControl
            name="startTime"
            label="Thời gian bắt đầu"
            required
          />
          <DateTimeInputControl name="endTime" label="Thời gian kết thúc" />
        </Flex>

        <Flex wrap={["wrap", "nowrap"]} gap="4" grow={false}>
          <SwitchControl name="isPublic" label="Công khai" />
          <SwitchControl name="isMix" label="Trộn đề" />
          <SwitchControl
            style={{ display: "flex" }}
            name="isShowAnswer"
            label="Cho phép xem đáp án"
          />
        </Flex>
        <Flex justifyContent="center" mt={5}>
          <Button colorScheme="teal" type="submit">
            Thêm
          </Button>
        </Flex>
      </form>
    </Container>
  );
});

export default TestMetadataForm;
