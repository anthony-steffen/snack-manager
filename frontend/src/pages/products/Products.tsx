/** @jsxImportSource @emotion/react */
import {
  Box,
  Button,
  Flex,
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
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import {formatCurrencyBRL} from '../../utils/formatCurrency'
import {Product, Category} from '../../types'
import { ReactElement } from "react";

const ProductsPage = (): ReactElement => {
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

  const { categories }: { categories: Category[] } = useCategories();

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
      <Heading mb={4} textAlign={"center"} fontSize={24}>
       Registro de Produtos
      </Heading>

      {/* Formulário */}
      <Box
        // mb={8}
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        border={"1px solid rgb(24, 24, 24)"}
        >
         <Flex flexDir={"column"} gap={1}>
          <FormControl isRequired>
            <FormLabel mb={0} fontSize={14}>Code (4 digits)</FormLabel>
            <Input
              name="code"
              type="number"
              value={formData.code}
              onChange={handleInputChange}
              maxLength={4}
            />
          </FormControl>

          <FormControl isRequired>
          <FormLabel mb={0} fontSize={14}>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired boxSize={"border-box"}>
            <FormLabel mb={0} fontSize={14}>Category</FormLabel>
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
            <FormLabel mb={0} fontSize={14}>Description</FormLabel>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel mb={0} fontSize={14}>Price</FormLabel>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* <FormControl isRequired>
            <FormLabel mb={0} fontSize={14}>Image URL</FormLabel>
            <Input
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleInputChange}
            />
          </FormControl> */}

          <FormControl isRequired>
            <FormLabel mb={0} fontSize={14}>Stock</FormLabel>
            <Input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button
            onClick={isEditing ? handleUpdateProduct : handleAddProduct}
            size="sm"
            mx={"auto"}
            w={120}
            mt={2}
          >
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
        </Flex>
      </Box>

      {/* Tabela */}
      <Box overflowX="auto" mt={4} borderRadius="sm">
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr bg={"#f7f7f7"}>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th >Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.code}</Td>
                <Td>{product.name}</Td>
                <Td>{product.category?.name}</Td>
                <Td>{formatCurrencyBRL(product.price)}</Td>
                <Td>{product.stock}</Td>
                <Td>
                   <Flex justifyContent="space-evenly">
                <FaPencil color='#2B6CB0' fontSize={18} onClick={() => handleEdit(product)}/>
                <MdDelete color= '#CF070A'fontSize={18} onClick={() => handleDeleteProduct(product.id)}/>
                </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default ProductsPage;