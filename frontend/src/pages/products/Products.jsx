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
} from "@chakra-ui/react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

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

  const { categories } = useCategories();

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

      {/* Formulário */}
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
              name="categoryId"
              placeholder="Select category"
              value={formData.categoryId}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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

      {/* Tabela */}
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
                <Td>{product.category?.name}</Td>
                <Td>${product.price.toFixed(2)}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  <Button size="sm" onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    ml={2}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
