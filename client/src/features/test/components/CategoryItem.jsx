import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { TestCard } from "./TestCard";
import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";

const settings = {
  dots: true,
  speed: 500,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  className: "bg-transparent",
};

export const CategoryItem = ({ data }) => {
  return (
    <div className="py-2">
      <Flex justify={"space-between"} align={"center"}>
        <Text p={4} fontSize="3xl">
          {data.name}
        </Text>
        <Button colorScheme={"linkedin"} variant="link">
          Xem thêm
        </Button>
      </Flex>

      {data.tests.length > 0 ? (
        <Slider {...settings}>
          {data.tests.map((test) => (
            <div className="px-4" key={test.code}>
              <Box>
                <TestCard test={test} />
              </Box>
              <Spacer />
            </div>
          ))}
        </Slider>
      ) : (
        <Text fontSize="xl" textAlign={"center"}>
          Chưa có bài kiểm tra nào ở mục này!
        </Text>
      )}
    </div>
  );
};
