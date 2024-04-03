import React from "react";
import { Box, Link, Flex, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box bg="#323232;" px={4} color="#ddd0c8;">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize="lg" fontWeight="bold">
          Event App
        </Text>
        <Flex alignItems={"center"}>
          <Link as={RouterLink} to="/" mr={4}>
            Events
          </Link>
          <Link as={RouterLink} to="/event/1">
            Event
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
