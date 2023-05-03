import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export const TestModal = ({ isOpen, onClose, test }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={0}>
          <div
            className="w-full h-52"
            style={{
              background: `url("https://hatrabbits.com/wp-content/uploads/2018/10/risky-assumptions.jpg") no-repeat 50% 50%/cover`,
            }}
          ></div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{test.title}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
