/** @jsxImportSource @emotion/react */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Flex,
} from "@chakra-ui/react";
import { useRef, useState, ReactElement } from "react";
import { useIngredients } from "../hooks/useIngredients";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { formatCurrencyBRL } from "../utils/formatCurrency";

// 1. Definimos as interfaces de dados
interface Ingredient {
  id: number;
  name: string;
  unitPrice: number;
}

interface IngredientForm {
  name: string;
  unitPrice: number;
}

// 2. Se quisermos, podemos tipar o retorno do hook (opcional)
interface UseIngredientsReturn {
  ingredients: Ingredient[];
  formData: IngredientForm;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddIngredient: () => void;
  handleEdit: (ing: Ingredient) => void;
  handleUpdateIngredient: () => void;
  handleDelete: (id: number) => void;
}

const Ingredients: React.FC = (): ReactElement => {
  // 3. Desconstruímos o hook com tipagem opcional via “as”
  const {
    ingredients,
    formData,
    isEditing,
    handleInputChange,
    handleAddIngredient,
    handleEdit,
    handleUpdateIngredient,
    handleDelete,
  } = useIngredients() as UseIngredientsReturn;

  // 4. Estado do ID que vamos deletar, agora tipado
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 5. Controle do modal de confirmação
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 6. Referência tipada para o botão “Cancel” do AlertDialog
  const cancelRef = useRef<HTMLButtonElement>(null);

  // 7. Função para abrir modal — já com tipo de parâmetro
  const confirmDelete = (id: number): void => {
    setDeletingId(id);
    onOpen();
  };

  // 8. Função que chama o delete de fato
  const onConfirmDelete = (): void => {
    if (deletingId !== null) {
      handleDelete(deletingId);
    }
    onClose();
  };

  return (
    <Box
      border="1px solid rgb(24, 24, 24)"
      mx="auto"
      my={3}
      p={6}
      w={{ base: "95%", md: "40%", lg: "20%" }}
      borderRadius="lg"
      boxShadow="md"
      h="100%"
    >
      <Heading mb={6} textAlign="center" fontSize={24}>
        Manage Ingredients
      </Heading>

      {/* Formulário controlado */}
      <Box
        mb={8}
        p={6}
        borderRadius="lg"
        boxShadow="md"
        border="1px solid rgb(24, 24, 24)"
      >
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ingredient name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Unit Price</FormLabel>
            <Input
              name="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={handleInputChange}
              placeholder="e.g. 1.99"
            />
          </FormControl>
          <Button
            size="sm"
            mx="auto"
            w={120}
            mt={2}
            onClick={
              isEditing ? handleUpdateIngredient : handleAddIngredient
            }
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </Stack>
      </Box>

      {/* Tabela de ingredientes */}
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Unit Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ingredients.map((ingredient: Ingredient) => (
            <Tr key={ingredient.id}>
              <Td>{ingredient.id}</Td>
              <Td>{ingredient.name}</Td>
              <Td>{formatCurrencyBRL(ingredient.unitPrice)}</Td>
              <Td>
                <Flex justifyContent="space-evenly">
                  <FaPencil
                    color="#2B6CB0"
                    fontSize={18}
                    onClick={() => handleEdit(ingredient)}
                  />
                  <MdDelete
                    color="#CF070A"
                    fontSize={18}
                    onClick={() => confirmDelete(ingredient.id)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal de confirmação */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Deletion
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this ingredient?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
                Yes, delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Ingredients;
