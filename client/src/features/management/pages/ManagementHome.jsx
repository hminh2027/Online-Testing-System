import React from "react";
import TestDataTable from "../components/TestDataTable";
import { Button, Flex } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ManagementHome = () => {
  const navigate = useNavigate()
  return (
    <>
      <Flex justifyContent="right" my={5}>
        <Button onClick={() => navigate('create')} leftIcon={<FaPlus />} colorScheme="teal">
          Tạo test
        </Button>
      </Flex>
      <TestDataTable />
    </>
  );
};
