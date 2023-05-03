import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { authApi } from "../api/authApi";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Tên người dùng tối thiểu 3 kí tự")
    .max(50, "Tên người dùng tối đa 50 kí tự")
    .required("Vui lòng điền tên người dùng"),
  email: Yup.string()
    .email("Email không đúng định dạng")
    .required("Vui lòng điền email"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có độ dài tối thiểu 6 kí tự")
    .required("Vui lòng điền mật khẩu"),
  cfPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp")
    .required("Vui lòng điền lại mật khẩu"),
});

export const Signup = () => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cfPassword: "",
    },
    onSubmit: async (values) => {
      try {
        const rs = await authApi.signup(values);
        toast({
          id: rs.data.message,
          description: rs.data.message,
          status: "success",
        });
      } catch (err) {
        !toast.isActive(err.response.data.message) &&
          toast({
            id: err.response.data.message,
            description: err.response.data.message,
            status: "error",
          });
      }
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} w={"md"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Đăng ký
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Tên người dùng</FormLabel>
                <Input
                  type="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Địa chỉ email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Mật khẩu</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </FormControl>
              <FormControl id="cfpassword" isRequired>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <Input
                  type="password"
                  name="cfPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cfPassword}
                />
                {formik.touched.cfPassword && formik.errors.cfPassword ? (
                  <div className="text-red-500">{formik.errors.cfPassword}</div>
                ) : null}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Đăng ký
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Bạn đã có tài khoản?{" "}
                  <Link href="/auth/login" color={"blue.400"}>
                    Đăng nhập ngay
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
};

export default Signup;
