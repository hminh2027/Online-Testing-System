import React, { useLayoutEffect } from "react";
import { EditTestMetadataForm } from "../components/forms/TestMetadataForm";
import { useParams } from "react-router-dom";
import { useTest } from "../stores/useTest";
import { Flex, Spinner } from "@chakra-ui/react";
import { QuestionList } from "../components/QuestionList";

const EditTest = () => {
  const { testCode } = useParams();
  const [test, fetchTest, setTest, setQuestions] = useTest((state) => [
    state.test,
    state.fetchTest,
    state.setTest,
    state.setQuestions,
  ]);
  useLayoutEffect(() => {
    (async () => {
      await fetchTest(testCode);
    })();
    return () => {
      setQuestions(null);
      setTest(null);
    };
  }, [fetchTest, testCode, setTest, setQuestions]);
  console.log(test);
  if (!test)
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  return <>
    <EditTestMetadataForm test={test} />
    <QuestionList/>
  </>;
};

export default EditTest;
