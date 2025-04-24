/** @jsxImportSource @emotion/react */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useRecipes } from "../hooks/useRecipes";

const unitOptions = ["UN", "ML", "L", "G", "KG"];

export default function RecipesPage() {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    items,
    handleAddItem,
    handleItemChange,
    handleRemoveItem,
    products,
    categories,
    ingredients,
  } = useRecipes();

  return (
    <Box
      border="1px solid rgb(24, 24, 24)"
      mx="auto"
      my={4}
      p={6}
      w={{ base: "95%", md: "70%", lg: "50%" }}
      borderRadius="lg"
      boxShadow="md"
      minH="100vh"
    >
      <Heading mb={6} textAlign="center" fontSize={24}>
        Cadastro de Receita
      </Heading>

      {/* Formulário Principal */}
      <Box p={6} borderRadius="lg" boxShadow="md" border="1px solid rgb(24, 24, 24)">
        <Stack spacing={3}>
          <FormControl isRequired>
            <FormLabel>Produto</FormLabel>
            <Select
              name="productId"
              placeholder="Selecione um produto"
              value={formData.productId}
              onChange={handleInputChange}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Categoria</FormLabel>
            <Select
              name="categoryId"
              placeholder="Selecione uma categoria"
              value={formData.categoryId}
              onChange={handleInputChange}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Descrição / Modo de Preparo</FormLabel>
            <Textarea
              name="description"
              placeholder="Descreva o modo de preparo..."
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormControl>

          <Flex gap={4}>
            <FormControl isRequired>
              <FormLabel fontSize={12} textAlign="center">Rendimento (Un)</FormLabel>
              <Input
                name="yield"
                type="number"
                value={formData.yield}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize={12} textAlign="center">Validade</FormLabel>
              <Input
                name="validity"
                placeholder="Ex: 7 dias"
                value={formData.validity}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
        </Stack>

        {/* Ingredientes da Receita */}
        <Heading fontSize="lg" mt={8} mb={4}>
          Ingredientes da Receita
        </Heading>

        <Button size="sm" onClick={handleAddItem} mb={4}>
          + Adicionar Ingrediente
        </Button>

        {items.length > 0 && (
          <Box overflowX="auto">
            <Table variant="striped" size="sm" minW={600}>
              <Thead>
                <Tr>
                  <Th whiteSpace="nowrap">Ingrediente</Th>
                  <Th whiteSpace="nowrap">Quantidade</Th>
                  <Th whiteSpace="nowrap">Unidade</Th>
                  <Th whiteSpace="nowrap">Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items.map((item, index) => (
                  <Tr key={index}>
                    <Td minW="150px">
                      <Select
                        value={item.ingredientId}
                        onChange={(e) =>
                          handleItemChange(index, "ingredientId", e.target.value)
                        }
                      >
                        <option value="">Selecione</option>
                        {ingredients.map((ing) => (
                          <option key={ing.id} value={ing.id}>
                            {ing.name}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td minW="100px">
                      <Input
                        border={"1px solid #5F6774"}
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                      />
                    </Td>
                    <Td minW="100px">
                      <Select
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(index, "unit", e.target.value)
                        }
                      >
                        <option value="">Selecione</option>
                        {unitOptions.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td minW="80px">
                      <MdDelete
                        fontSize={20}
                        color="#CF070A"
                        cursor="pointer"
                        onClick={() => handleRemoveItem(index)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}

        <Button
          colorScheme="teal"
          size="md"
          mt={6}
          w="full"
          onClick={handleSubmit}
        >
          Salvar Receita
        </Button>
      </Box>
    </Box>
  );
}
