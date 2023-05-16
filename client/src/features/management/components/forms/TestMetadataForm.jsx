import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { useFormikContext, withFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import { managementApi } from "../../api/managementApi";
import {
  DateTimeInputControl,
  InputControl,
  SelectControl,
  SwitchControl,
  TextareaControl,
} from "./inputs";
import AppAlertDialog from "../dialogs/AlertDialog";
import { useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { Action } from "../../../../constants";

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
  isCameraRequired: Yup.bool().default(false),
});

const TestMetadataForm = withFormik({
  handleSubmit: async (values) => {
    const test =
      values.type === "create"
        ? await managementApi.createTest(values)
        : await managementApi.updateTest(values.code, values);
    return test;
  },
  mapPropsToValues: (props) => ({
    code: props.code || "",
    title: props.title || "",
    description: props.description || "",
    duration: props.duration || 5,
    numberOfQuestions: props.number_of_questions || 1,
    startTime: props.start_time || null,
    endTime: props.end_time || null,
    attemptLimit: props.attempt_limit || 0,
    isPublic: props.is_public || false,
    isMix: props.is_mix || false,
    isShowAnswer: props.is_show_answer || false,
    categoryId: props.categoryId || -1,
    isCameraRequired: props.is_camera_required || false,
    type: props.type || Action.create, //"edit"
  }),
  validationSchema: TestMetadataFormSchema,
})(({ handleSubmit }) => {
  const { testCode } = useParams();
  const [categories, setCategories] = useState(null);
  const { setFieldValue, values } = useFormikContext();

  useLayoutEffect(() => {
    (async () => {
      const data = await managementApi.getALlWithCategory();
      setCategories(data.categories);
      if (values.categoryId === -1)
        setFieldValue("categoryId", data.categories[0].id);
    })();
  }, [setFieldValue, values.categoryId]);

  // const handleSubmit = async (values, navigate) => {
  //   console.log(values);
  //   const newTest = await props.handleSubmit(values);
  //   // navigate(`management/${newTest.code}/questions`);
  // };

  const handleDelete = async () => {
    await managementApi.deleteTest(testCode);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          categories.map((category) => ({
            value: category.id,
            label: category.name,
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
        <SwitchControl name="isCameraRequired" label="Yêu cầu mở webcam" />
      </Flex>
      <Flex justifyContent="center" mt={5}>
        <Button colorScheme="teal" type="submit" leftIcon={<FaPaperPlane />}>
          Lưu
        </Button>
        {testCode && (
          <Box ml={3}>
            <AppAlertDialog handleDelete={handleDelete} />
          </Box>
        )}
      </Flex>
    </form>
  );
});

const AddTestMetadataForm = () => {
  return (
    <>
      <Container maxW="container.md" bg="white" p="5" borderRadius="xl">
        <Text textAlign="center" fontWeight="bold" fontSize="3xl" mb="3">
          Tạo bài trắc nghiệm
        </Text>
        <TestMetadataForm />
      </Container>
    </>
  );
};

const EditTestMetadataForm = ({ test }) => {
  return (
    <>
      <Container maxW="container.md" bg="white" p="5" borderRadius="xl">
        <Text textAlign="center" fontWeight="bold" fontSize="3xl" mb="3">
          Sửa bài trắc nghiệm {test.code}
        </Text>
        <TestMetadataForm {...test} type={Action.edit} />
      </Container>
    </>
  );
};

export { AddTestMetadataForm, EditTestMetadataForm };
export default TestMetadataForm;
