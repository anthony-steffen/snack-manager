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
	useColorModeValue,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useRecipes } from "../hooks/useRecipes";
import { FaPencil } from "react-icons/fa6";

const unitOptions = ["UN", "ML", "L", "G", "KG"];

const RegisterRecipesPage = (): React.ReactElement => {
	const bg = useColorModeValue("gray.50", "gray.900");
	const {
		formData,
		handleInputChange,
		handleSubmit,
		items,
		handleAddItem,
		handleRemoveItem,
		products,
		categories,
		ingredients,
	} = useRecipes();

	return (
		<Box p={5} h="100vh" mx="auto" borderRadius="lg" textAlign="center">
			<Stack spacing={4} textAlign="center" mb={10}>
				<Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="extrabold">
					Cadastro de Receitas
				</Heading>
			</Stack>

			{/* Formulário Principal */}
			<Box
				bg={bg}
				borderWidth={1}
				borderColor={bg === "gray.50" ? "gray.200" : "gray.800"}
				borderRadius="3xl"
				boxShadow={bg === "gray.50" ? "lg" : "dark-lg"}
				p={5}
				// spacing={3}
				mx="auto"
				w={{ base: "100%", md: "80%", lg: "40%" }}>
				<Stack spacing={3}>
					<FormControl isRequired>
						<FormLabel mb={0}>Produto</FormLabel>
						<Select
							name="productId"
							placeholder="Selecione um produto"
							value={formData.productId}
							onChange={handleInputChange}>
							{products.map((p) => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</Select>
					</FormControl>

					<FormControl isRequired>
						<FormLabel mb={0}>Categoria</FormLabel>
						<Select
							name="categoryId"
							placeholder="Selecione uma categoria"
							value={formData.categoryId}
							onChange={handleInputChange}>
							{categories.map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</Select>
					</FormControl>

					<FormControl>
						<FormLabel mb={0}>Descrição / Modo de Preparo</FormLabel>
						<Textarea
							name="description"
							placeholder="Descreva o modo de preparo..."
							value={formData.description}
							onChange={handleInputChange}
						/>
					</FormControl>

					<Flex gap={2} flexWrap="wrap">
						<FormControl isRequired flex="1 1 120px">
							<FormLabel fontSize={12} textAlign={"center"} mb={0}>
								Rendimento (Un)
							</FormLabel>
							<Input
								name="yield"
								type="number"
								value={formData.yield}
								onChange={handleInputChange}
							/>
						</FormControl>

						<FormControl isRequired flex="1 1 120px">
							<FormLabel fontSize={12} textAlign={"center"} mb={0}>
								Validade
							</FormLabel>
							<Input
								name="validity"
								placeholder="Ex: 7 dias"
								value={formData.validity}
								onChange={handleInputChange}
							/>
						</FormControl>

						<FormControl isRequired flex="1 1 120px">
							<FormLabel fontSize={12} textAlign={"center"} mb={0}>
								Desperdício (%)
							</FormLabel>
							<Input
								name="wastePercentage"
								type="number"
								value={formData.wastePercentage}
								onChange={handleInputChange}
							/>
						</FormControl>

						<FormControl isRequired flex="1 1 120px">
							<FormLabel fontSize={12} textAlign={"center"} mb={0}>
								Markup (%)
							</FormLabel>
							<Input
								name="markupPercentage"
								type="number"
								value={formData.markupPercentage}
								onChange={handleInputChange}
							/>
						</FormControl>
					</Flex>
				</Stack>

				{/* Ingredientes da Receita */}
				<Heading fontSize="lg" mt={8}>
					Ingredientes da Receita
				</Heading>

				<Button size="sm" onClick={handleAddItem} mb={4}>
					+ Add Ingrediente
				</Button>

				{items.length > 0 && (
					<Box overflowX="auto">
						<Table
							variant="striped"
							size="sm"
							minW={{ base: "100%", md: "600px" }}>
							<Thead bg="black">
								<Tr color="white">
									<Th whiteSpace="nowrap" color={"white"} textAlign={"center"}>
										{" "}
										Ingrediente{" "}
									</Th>
									<Th
										whiteSpace="nowrap"
										w={20}
										color={"white"}
										textAlign={"center"}>
										{" "}
										Quantidade{" "}
									</Th>
									<Th
										whiteSpace="nowrap"
										w={20}
										color={"white"}
										textAlign={"center"}>
										{" "}
										Unidade{" "}
									</Th>
									<Th whiteSpace="nowrap" color={"white"} textAlign={"center"}>
										{" "}
										Ação{" "}
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{items.map((item, index) => (
									<Tr key={index}>
										<Td minW="150px">
											<Select value={item.ingredientId}>
												<option value=""></option>
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
											/>
										</Td>
										<Td minW="100px">
											<Select value={item.unit}>
												<option value=""></option>
												{unitOptions.map((u) => (
													<option key={u} value={u}>
														{u}
													</option>
												))}
											</Select>
										</Td>
										<Flex justifyContent="space-evenly">
											<Td minW="80px">
												<MdDelete
													fontSize={20}
													color="#CF070A"
													cursor="pointer"
													onClick={() => handleRemoveItem(index)}
												/>
											</Td>
										</Flex>
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
					onClick={handleSubmit}>
					Salvar Receita
				</Button>
			</Box>
		</Box>
	);
};

export default RegisterRecipesPage;
