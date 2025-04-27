/** @jsxImportSource @emotion/react */
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  // useDisclosure,
} from "@chakra-ui/react";
import { useRecipeList } from "../hooks/useRecipeList";
import { RecipeDetailsModal } from "../components/RecipeDetailsModal"; // o modal que vamos criar já já!
import { IoEyeSharp } from "react-icons/io5";

export default function RecipesPage() {
  const {
    recipes,
    selectedRecipe,
    openRecipeDetails,
    closeRecipeDetails,
  } = useRecipeList();

  return (
    <Box
      border={"1px solid rgb(24, 24, 24)"}
      mx="auto"
      my={4}
      p={4}
      w={{ base: "95%", md: "80%", lg: "30%" }}
      borderRadius="lg"
      boxShadow="md"
      minH="100vh"
    >
      <Heading mb={6} textAlign="center" fontSize={24}>
        Receitas Cadastradas
      </Heading>

      <Box overflowX="auto" borderRadius="md" >
        <Table variant="striped" size="x-sm" fontSize={14}>
          <Thead>
            <Tr>
              <Th>Prod</Th>
              <Th>Val</Th>
              <Th>Rend</Th>
              <Th>PS</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recipes.map((recipe) => {
              const suggestedPrice = calculateSuggestedPrice(recipe);
              return (
                <Tr key={recipe.id}>
                  <Td>{recipe.product?.name || "-"}</Td>
                  <Td>{recipe.validity}</Td>
                  <Td>{recipe.yield}</Td>
                  <Td>
                    {suggestedPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Td>
                  <Td>
                    <IoEyeSharp fontSize={{base:"50px"}} cursor="pointer"
                      onClick={() => openRecipeDetails(recipe)}>
                      Show
                    </IoEyeSharp>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          isOpen={true}
          onClose={closeRecipeDetails}
        />
      )}
    </Box>
  );
}

// Função para calcular o preço sugerido
function calculateSuggestedPrice(recipe) {
  const totalIngredientCost = recipe.items.reduce((acc, item) => {
    return acc + item.ingredient.unitPrice * item.quantity;
  }, 0);

  const wasteFactor = 1 + (recipe.wastePercentage || 0) / 100;
  const markupFactor = 1 + (recipe.markupPercentage || 0) / 100;

  const costWithWaste = totalIngredientCost * wasteFactor;
  const suggestedPrice = costWithWaste * markupFactor;

  return suggestedPrice || 0;
}
