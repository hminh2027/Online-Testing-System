import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalContent,
} from "@chakra-ui/react";
import React from "react";
import QuestionForm from "../forms/QuestionForm";
import { FaEdit, FaPlus } from "react-icons/fa";

const QuestionModal = ({ isOpen, onClose, question, type }) => {
  //   console.log(question);
  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign="center" fontWeight="bold" fontSize="4xl">
            Câu hỏi {question?.index ?? "mới"}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <QuestionForm {...question} type={type} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const AddQuestionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" leftIcon={<FaPlus />}>
        Thêm câu hỏi
      </Button>
      <QuestionModal isOpen={isOpen} onClose={onClose} type="add" />
    </>
  );
};

const EditQuestionModal = ({ question }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="teal"
        leftIcon={<FaEdit />}
        size="sm"
      >
        Sửa
      </Button>
      <QuestionModal
        isOpen={isOpen}
        onClose={onClose}
        question={question}
        type="edit"
      />
    </>
  );
};

export { AddQuestionModal, EditQuestionModal };
// export default QuestionModal;
