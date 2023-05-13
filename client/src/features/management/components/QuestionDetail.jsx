import {
  Box,
  Button,
  Circle,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdCheck, MdClose } from "react-icons/md";
import { EditQuestionModal } from "./modal/QuestionModal";
import { FaTrash } from "react-icons/fa";

const QuestionDetail = ({ question, onDelete, onEdit }) => {
  return (
    <>
      <Draggable
        draggableId={`${question.index - 1}`}
        index={question.index - 1}
      >
        {(provided) => (
          <Box
            pos="relative"
            my={5}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            bg="white"
            p={3}
            borderRadius="xl"
            border="1px"
          >
            <HStack mb={3} justifyContent="space-between">
              <Text fontSize="xl">
                <Box as="span" fontWeight="bold">
                  Câu {question.index}:
                </Box>
                &nbsp;
                {question.text}
              </Text>
              <HStack>
                <EditQuestionModal question={question} onEdit={onEdit} />
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDelete(question.index - 1)}
                  leftIcon={<FaTrash />}
                >
                  Xóa
                </Button>
              </HStack>
            </HStack>
            <VStack>
              {question.answers.map((answer) => {
                return (
                  <InputGroup key={answer.index}>
                    <InputLeftAddon p={0}>
                      <Button
                        sx={{
                          "&:disabled": {
                            opacity: "1 ",
                          },
                        }}
                        isDisabled={true}
                        colorScheme={answer.isCorrect ? "green" : "red"}
                        leftIcon={answer.isCorrect ? <MdCheck /> : <MdClose />}
                      >
                        {String.fromCharCode(
                          "A".charCodeAt(0) + answer.index - 1
                        )}
                      </Button>
                    </InputLeftAddon>
                    <Input
                      sx={{
                        "&:disabled": {
                          opacity: "1 ",
                        },
                      }}
                      value={answer.text}
                      isDisabled={true}
                    />
                  </InputGroup>
                );
              })}
            </VStack>
            <Circle
              pos="absolute"
              right={0}
              top={"50%"}
              zIndex={1}
              bg="orange"
              size="50px"
              color="white"
              translateY="-50%"
              translateX="50%"
              transform="auto"
              fontSize="xl"
              fontWeight="bold"
            >
              {question.score}
            </Circle>
          </Box>
        )}
      </Draggable>
    </>
  );
};

export default QuestionDetail;
