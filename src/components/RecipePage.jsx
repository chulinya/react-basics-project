import React from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Tag,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const RecipePage = ({ recipe, onBack }) => {
  if (!recipe) {
    return <Text>No recipe selected</Text>;
  }

  const {
    label,
    image,
    ingredientLines,
    healthLabels,
    dietLabels,
    cautions,
    totalTime,
    yield: servings,
    totalNutrients,
  } = recipe;

  return (
    <Box bg="blue.50" minH="100vh" p={8}>
      {/* Back Button */}
      <Box mb={4}>
        <Text
          as="button"
          onClick={onBack}
          color="blue.500"
          fontWeight="bold"
          fontSize="lg"
          _hover={{ textDecoration: "underline" }}
        >
          &larr; Back
        </Text>
      </Box>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
        {/* Left Section: Recipe Image and Main Details */}
        <GridItem>
          <Image src={image} alt={label} borderRadius="lg" mb={4} />
          <Text fontWeight="bold" fontSize="2xl" mt={4}>
            {label}
          </Text>
          <Text fontSize="lg" color="gray.600" mt={2}>
            Total cooking time: {totalTime || "N/A"} minutes
          </Text>
          <Text fontSize="lg" color="gray.600">
            Servings: {servings}
          </Text>

          {/* Ingredients */}
          <Box mt={4}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Ingredients:
            </Text>
            <VStack align="start" spacing={2}>
              {ingredientLines.map((ingredient, index) => (
                <Text key={index} fontSize="sm" color="gray.800">
                  {ingredient}
                </Text>
              ))}
            </VStack>
          </Box>
        </GridItem>

        {/* Right Section: Labels and Nutrients */}
        <GridItem>
          {/* Health Labels */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Health Labels:
            </Text>
            <HStack spacing={2} wrap="wrap">
              {healthLabels.map((label, index) => (
                <Tag key={index} colorScheme="purple">
                  {label}
                </Tag>
              ))}
            </HStack>
          </Box>

          {/* Diet Labels */}
          {dietLabels.length > 0 && (
            <Box mt={4}>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Diet:
              </Text>
              <HStack spacing={2} wrap="wrap">
                {dietLabels.map((label, index) => (
                  <Tag key={index} colorScheme="green">
                    {label}
                  </Tag>
                ))}
              </HStack>
            </Box>
          )}

          {/* Cautions */}
          {cautions.length > 0 && (
            <Box mt={4}>
              <Text fontWeight="bold" fontSize="lg" mb={2} color="red.500">
                Cautions:
              </Text>
              <HStack spacing={2} wrap="wrap">
                {cautions.map((caution, index) => (
                  <Tag key={index} colorScheme="red">
                    {caution}
                  </Tag>
                ))}
              </HStack>
            </Box>
          )}

          {/* Total Nutrients */}
          <Box mt={4}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Total Nutrients:
            </Text>
            <VStack align="start" spacing={2}>
              {Object.entries(totalNutrients).map(([key, nutrient]) => (
                <Text key={key} fontSize="sm" color="gray.800">
                  {nutrient.label}: {Math.round(nutrient.quantity)}{" "}
                  {nutrient.unit}
                </Text>
              ))}
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RecipePage;
