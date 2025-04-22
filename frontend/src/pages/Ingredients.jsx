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
import { useRef, useState } from "react";
import { useIngredients } from "../hooks/useIngredients";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

export default function IngredientsPage() {
  const {
    ingredients,
    formData,
    isEditing,
    handleInputChange,
    handleAddIngredient,
    handleEdit,
    handleUpdateIngredient,
    handleDelete,
  } = useIngredients();

  const [deletingId, setDeletingId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const confirmDelete = (id) => {
    setDeletingId(id);
    onOpen();
  };

  const onConfirmDelete = () => {
    handleDelete(deletingId);
    onClose();
  };

  return (
    <Box
    border={"1px solid rgb(24, 24, 24)"}
    mx="auto"
    my={3}
    p={6}
    w={{ base: "95%", md: "40%", lg: "20%" }}
    borderRadius="lg"
    boxShadow="md"
    h={'100vh'}
    >
      <Heading mb={6} textAlign="center" fontSize={24}>
        Manage Ingredients
      </Heading>

      <Box mb={8} p={6} borderRadius="lg" boxShadow="md" border={'1px solid rgb(24, 24, 24)'}>
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
          mx={"auto"}
          w={120}
          mt={2}
            onClick={isEditing ? handleUpdateIngredient : handleAddIngredient}
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </Stack>
      </Box>

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
          {ingredients.map((ingredient) => (
            <Tr key={ingredient.id}>
              <Td>{ingredient.id}</Td>
              <Td>{ingredient.name}</Td>
              <Td>${ingredient.unitPrice.toFixed(2)}</Td>
              <Td>
                <Flex justifyContent="space-evenly">
                <FaPencil color='#2B6CB0' fontSize={18} onClick={() => handleEdit(ingredient)}/>
                <MdDelete color= '#CF070A'fontSize={18} onClick={() => confirmDelete(ingredient.id)}/>
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
}
