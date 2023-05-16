import { Box, CircularProgress, Flex, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { managementApi } from "../api/managementApi";
import QuestionDetail from "../components/QuestionDetail";
import { useTest } from "../stores/useTest";
import { AddQuestionModal } from "../components/modal/QuestionModal";
export const Questions = () => {
  const [questions, setQuestions] = useTest((state) => [
    state.questions,
    state.setQuestions,
  ]);
  const { testCode } = useParams();
  useEffect(() => {
    (async () => {
      const { test } = await managementApi.getOneByCode(testCode);
      setQuestions(test.questions);
    })();
  }, [testCode, setQuestions]);

  const handleDragEnd = useCallback(
    (result) => {
      const sourceIndex = result.source?.index;
      const targetIndex = result.destination?.index;
      if (
        sourceIndex === undefined ||
        targetIndex === undefined ||
        targetIndex === sourceIndex
      )
        return;
      const newQuestions = structuredClone(questions);
      const [temp] = newQuestions.splice(sourceIndex, 1);
      newQuestions.splice(targetIndex, 0, temp);
      setQuestions(
        newQuestions.map((question, index) => ({
          ...question,
          index: index + 1,
        }))
      );
    },
    [questions, setQuestions]
  );

  const handleDeleteQuestion = (deleteIndex) => {
    //Call api here
    const cloneQuestions = structuredClone(questions);
    cloneQuestions.splice(deleteIndex, 1);
    console.log(cloneQuestions);
    setQuestions(
      cloneQuestions.map((question, index) => ({
        ...question,
        index: index + 1,
      }))
    );
  };

  const handleEditQuestion = (editIndex) => {
    const questionToEdit = questions[editIndex];
    //Do something you might need to do
  };

  return questions ? (
    <>
      <AddQuestionModal />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions" type="QUESTION">
          {(dropProvided) => (
            <Box
              borderRadius="3xl"
              w="70%"
              mx="auto"
              p="10"
              bg="white"
              ref={dropProvided.innerRef}
              {...dropProvided.dragHandleProps}
              {...dropProvided.draggableProps}
            >
              {questions.length === 0 && (
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                  Không có dữ liệu
                </Text>
              )}
              {questions.map((q, index) => (
                <QuestionDetail
                  key={q.index}
                  question={q}
                  index={index}
                  onDelete={handleDeleteQuestion}
                  onEdit={handleEditQuestion}
                />
              ))}
              {dropProvided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </>
  ) : (
    <Flex>
      <CircularProgress />
    </Flex>
  );
};
