import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Input,
  Text,
  Image,
  Tag,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { fetchData } from "../utils/data";

const RecipeListPage = ({ onRecipeSelect }) => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const jsonData = await fetchData();
      setData(jsonData);
    };
    loadData();
  }, []);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  // Filter recipes based on the search term
  const filteredRecipes = data.hits.filter((item) => {
    const recipe = item.recipe;
    return (
      recipe.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.healthLabels.some((label) =>
        label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <Box bg="blue.50" minH="100vh" p={8}>
      {/* Search Bar */}
      <Box as="header" bg="blue.500" color="white" py={6} textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Winc Recipe Checker
        </Text>
        <Input
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mt={4}
          width="50%"
          mx="auto"
          bg="white"
          color="black"
          _placeholder={{ color: "gray.500" }}
          border="1px solid"
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
        />
      </Box>

      {/* Recipe Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} mt={8}>
        {filteredRecipes.map((item, index) => {
          const recipe = item.recipe;
          return (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              shadow="lg"
              p={4}
              onClick={() => onRecipeSelect(recipe)}
              cursor="pointer"
              _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
              transition="transform 0.2s ease"
            >
              {/* Recipe Image */}
              <Image
                src={recipe.image}
                alt={recipe.label}
                boxSize="200px"
                objectFit="cover"
              />

              {/* Recipe Name */}
              <Text fontWeight="bold" fontSize="lg" mt={2}>
                {recipe.label}
              </Text>

              {/* Diet Labels */}
              <HStack mt={2} spacing={2} wrap="wrap">
                {recipe.dietLabels.map((label, idx) => (
                  <Tag key={idx} colorScheme="green">
                    {label}
                  </Tag>
                ))}
              </HStack>

              {/* Health Labels */}
              <HStack mt={2} spacing={2} wrap="wrap">
                {recipe.healthLabels.slice(0, 3).map(
                  (
                    label,
                    idx // Limit to 3 labels
                  ) => (
                    <Tag key={idx} colorScheme="purple">
                      {label}
                    </Tag>
                  )
                )}
              </HStack>

              {/* Meal and Dish Types */}
              <Text fontSize="sm" color="gray.500" mt={2}>
                Meal Type: {recipe.mealType?.join(", ") || "N/A"}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Dish Type: {recipe.dishType?.join(", ") || "N/A"}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default RecipeListPage;
