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
	useColorModeValue,
} from "@chakra-ui/react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { formatCurrencyBRL } from "../../utils/formatCurrency";
import { Product, Category } from "../../types";
import { ReactElement } from "react";
import { color } from "framer-motion";

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

	const bg = useColorModeValue("gray.50", "gray.800");

	const { categories }: { categories: Category[] } = useCategories();

	return (
		<Box
			minH="100vh" // usa minH para ocupar toda a altura da tela responsivamente
			px={2} // padding lateral para respiro
			mx="auto"
			borderRadius="lg"
			textAlign="center"
			w="full">
			{/* Campo de busca */}
			<Stack spacing={4} textAlign="center" my={5}>
				<Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="extrabold">
					Produtos
				</Heading>
			</Stack>
			<Flex
				flexDirection="column"
				gap={4}
				p={6}
				// w="full"
				   w={{ base: "95%", md: "80%", lg: "20%" }}
				mx="auto"
				bg={bg}
				borderWidth={1}
				borderColor={bg === "gray.50" ? "gray.200" : "gray.800"}
				borderRadius="3xl"
				boxShadow={bg === "gray.50" ? "lg" : "dark-lg"}
				>
				<FormControl isRequired>
					<FormLabel mb={0} fontSize={14}>
						Code (4 digits)
					</FormLabel>
					<Input
						name="code"
						type="number"
						value={formData.code}
						onChange={handleInputChange}
						maxLength={4}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel mb={0} fontSize={14}>
						Name
					</FormLabel>
					<Input
						name="name"
						value={formData.name}
						onChange={handleInputChange}
					/>
				</FormControl>

				<FormControl isRequired boxSize={"border-box"}>
					<FormLabel mb={0} fontSize={14}>
						Category
					</FormLabel>
					<Select
						name="categoryId"
						placeholder="Select category"
						value={formData.categoryId}
						onChange={handleInputChange}>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</Select>
				</FormControl>

				<FormControl isRequired>
					<FormLabel mb={0} fontSize={14}>
						Description
					</FormLabel>
					<Input
						name="description"
						value={formData.description}
						onChange={handleInputChange}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel mb={0} fontSize={14}>
						Price
					</FormLabel>
					<Input
						name="price"
						type="number"
						value={formData.price}
						onChange={handleInputChange}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel mb={0} fontSize={14}>
						Stock
					</FormLabel>
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
					mt={2}>
					{isEditing ? "Update Product" : "Add Product"}
				</Button>
			</Flex>

			{/* Tabela */}
			<Box
				m="auto"
				overflowX="auto"
				mt={4}
				w={{ base: "95%", md: "80%", lg: "30%" }}
				boxShadow={"2xl"}>
				<Table
					variant="striped"
					size="sm"
					sx={{
						th: { px: 2, textAlign: "center" },
						td: { px: 2, textAlign: "center" },
					}}>
					{/* Cabeçalho da tabela */}
					<Thead>
						<Tr bg={"black"}>
							<Th color='white'>Price</Th>
							<Th color='white'>Name</Th>
							<Th color='white'>Category</Th>
							<Th color='white'>Price</Th>
							<Th color='white'>Stock</Th>
							<Th color='white'>Actions</Th>
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
										<FaPencil
											color="#2B6CB0"
											fontSize={18}
											onClick={() => handleEdit(product)}
										/>
										<MdDelete
											color="#CF070A"
											fontSize={18}
											onClick={() => handleDeleteProduct(product.id)}
										/>
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};

export default ProductsPage;
