import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { authApi } from "../api";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không đúng định dạng")
    .required("Vui lòng điền email"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có độ dài tối thiểu 6 kí tự")
    .required("Vui lòng điền mật khẩu"),
});

export const Login = () => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const rs = await authApi.login(values);
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
            <Heading fontSize={"4xl"}>Đăng nhập</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
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
              <FormControl id="password">
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
              <Stack>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"end"}
                  justify={"end"}
                  pb={3}
                >
                  <Link color={"blue.400"}>Quên mật khẩu?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type={"submit"}
                >
                  Đăng nhập
                </Button>
                <Text fontSize="sm" textAlign={"center"}>
                  Hoặc
                </Text>
                <Button
                  bg={"blackAlpha.100"}
                  color={"black"}
                  _hover={{
                    bg: "blackAlpha.200",
                  }}
                >
                  <Flex></Flex>
                  <Icon mr={"3"} color={"blue.600"} as={BsFacebook} />
                  Đăng nhập bằng Facebook
                </Button>
                <Button
                  bg={"blackAlpha.100"}
                  color={"black"}
                  _hover={{
                    bg: "blackAlpha.200",
                  }}
                >
                  <Flex justify={"space-between"}>
                    <Icon mr={"3"} color={"red.600"} as={BsGoogle} />
                    Đăng nhập bằng Google
                  </Flex>
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Bạn chưa có tài khoản?{" "}
                  <Link href="/auth/signup" color={"blue.400"}>
                    Đăng ký ngay
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
