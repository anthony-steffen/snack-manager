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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useProducts } from "../../hooks/useProducts";

export default function ProductsPage() {
  const {
    products,
    formData,
    isEditing,
    handleInputChange,
    handleAddProduct,
    handleEdit,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useProducts();

  const [isOpen, setIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const cancelRef = useRef();
  

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setIsOpen(true);
  };
  
  const onDeleteConfirmed = () => {
    handleDeleteProduct(productToDelete.id);
    setIsOpen(false);
  };
  
  return (
    <Box
      border={"1px solid rgb(24, 24, 24)"}
      mx="auto"
      p={6}
      w={{ base: "100%", md: "40%", lg: "20%" }}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb={4} textAlign={"center"}>
        Product Registration
      </Heading>

      <Box
        mb={8}
        p={6}
        borderRadius="lg"
        boxShadow="md"
        border={"1px solid rgb(24, 24, 24)"}
      >
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Code (4 digits)</FormLabel>
            <Input
              name="code"
              type="number"
              value={formData.code}
              onChange={handleInputChange}
              maxLength={4}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              placeholder="Select category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Bebida">Bebida</option>
              <option value="Salgados">Salgados</option>
              <option value="Bolos">Bolos</option>
              <option value="Doces">Doces</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Stock</FormLabel>
            <Input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button
            onClick={isEditing ? handleUpdateProduct : handleAddProduct}
            size="lg"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
        </Stack>
      </Box>

      <Box overflowX="auto" mt={4} borderRadius="sm">
        <Table variant="striped" colorScheme="gray" size="sm" minW="600px">
          <Thead>
            <Tr bg={"#f7f7f7"}>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.code}</Td>
                <Td>{product.name}</Td>
                <Td>{product.category}</Td>
                <Td>${product.price.toFixed(2)}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  <Button
                    size="sm"
                    mr={2}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => confirmDelete(product)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* AlertDialog para confirmação */}
      <AlertDialog
  isOpen={isOpen}
  leastDestructiveRef={cancelRef}
  onClose={() => setIsOpen(false)}
>
  <AlertDialogOverlay>
    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        Confirm Deletion
      </AlertDialogHeader>

      <AlertDialogBody>
        Are you sure you want to delete the product "{productToDelete?.name}"?
      </AlertDialogBody>

      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={onDeleteConfirmed} ml={3}>
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogOverlay>
</AlertDialog>
    </Box>
  );
}
