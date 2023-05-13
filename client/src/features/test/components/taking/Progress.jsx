import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React, { memo, useEffect, useMemo, useState } from "react";
import Countdown from "react-countdown";

const Timer = memo(function Timer({ duration = 3 }) {
  return (
    <Box fontSize="xl" fontWeight="bold">
      <Countdown date={Date.now() + duration * 1000} daysInHours={true} />
    </Box>
  );
});

let id;
const Progress = ({ duration }) => {
  const [value, setValue] = useState(0);
  const jump = useMemo(() => (1000 * 100) / (duration * 1000), [duration]);

  useEffect(() => {
    id = setInterval(() => {
      setValue((prev) => prev + jump);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (value > 100) return () => clearInterval(id);
  }, [value]);

  return (
    <CircularProgress
      size="120px"
      value={value}
      color={value > 100 ? "red" : "blue"}
    >
      <CircularProgressLabel>
        <Timer duration={duration} />
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Progress;
