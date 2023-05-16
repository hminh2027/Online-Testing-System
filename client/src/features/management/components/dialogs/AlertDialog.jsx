import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import React from "react";
import { FaTrash } from "react-icons/fa";

const AppAlertDialog = ({ resource, handleDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <>
      <Button colorScheme="red" onClick={onOpen} leftIcon={<FaTrash />}>
        Xóa
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Xóa {resource}</AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc không? Bạn không thể hoàn tác hành động này sau đó
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  handleDelete();
                }}
                ml={3}
              >
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AppAlertDialog;
