/** @jsxImportSource @emotion/react */
import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Text,
	Select,
	Stack,
	useColorModeValue,
	MenuButton,
	MenuList,
	MenuItem,
	Menu,
	IconButton,
} from "@chakra-ui/react";
import { useRecipeList } from "../hooks/useRecipeList";
import { RecipeDetailsModal } from "../components/RecipeDetailsModal";
import { FiEye } from "react-icons/fi";
import { ReactElement } from "react";

const RecipesPage = (): ReactElement => {
	const bg = useColorModeValue("gray.50", "gray.900");
	const {
		recipes,
		allRecipes,
		selectedRecipe,
		openRecipeDetails,
		closeRecipeDetails,
		searchTerm,
		setSearchTerm,
		currentPage,
		totalPages,
		goToPage,
		categoryFilter,
		setCategoryFilter,
		validityFilter,
		setValidityFilter,
		sortDirection,
		setSortDirection,
	} = useRecipeList();

	return (
		<Box h="100vh" mx="auto" borderRadius="lg" textAlign="center">
			<Stack spacing={4} textAlign="center" my={5}>
				<Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="extrabold">
					{" "}
					Receitas{" "}
				</Heading>
			</Stack>
			{/* Campo de busca */}
			<Flex
			flexWrap="wrap" // permite que quebre a linha em telas pequenas
			gap={6}
			justify="center"
			align="center"
			p={4}
			m="auto"
			mb={4}
			minH={{ base: "fit-content", md: "60px" }}
			bg={bg}
			// borderWidth={1}
			// borderColor={bg === "gray.50" ? "gray.200" : "gray.800"}
			// boxShadow={bg === "gray.50" ? "lg" : "dark-lg"}
				>
					<Input
						placeholder="Buscar produto..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						size="sm"
						maxW="150px"
					/>

					<Select
						placeholder="Categoria"
						value={categoryFilter}
						onChange={(e) => setCategoryFilter(e.target.value)}
						size="sm"
						maxW="150px">
						{/* Busca categorias únicas */}
						{[...new Set(allRecipes.map((r) => r.category?.name))]
							.filter(Boolean)
							.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
					</Select>

					<Select
						placeholder="Validade até"
						value={validityFilter}
						onChange={(e) => setValidityFilter(e.target.value)}
						size="sm"
						maxW="150px">
						<option value="3">3 dias</option>
						<option value="7">7 dias</option>
						<option value="30">30 dias</option>
					</Select>

					<Select
						placeholder="Ordenar Preço"
						value={sortDirection}
						onChange={(e) => setSortDirection(e.target.value)}
						size="sm"
						maxW="150px">
						<option value="asc">Preço ↑</option>
						<option value="desc">Preço ↓</option>
					</Select>
			</Flex>

			{/* Tabela */}
			<Box
				overflowX="auto"
				borderRadius="md"
				w={{ base: "90%", md: "80%", lg: "40%" }}
				m="auto"
				>
				<Table
					variant="striped"
					colorScheme="gray"
					size="sm"
					sx={{
						th: { px: 2, textAlign: "center" },
						td: { px: 2, textAlign: "center" },
					}}>
					<Thead bg="black">
						<Tr>
							<Th color='white'>Prod</Th>
							<Th color='white'>Val</Th>
							<Th color='white'>Rend</Th>
							<Th color='white'>PS</Th>
							<Th color='white'>ver</Th>
						</Tr>
					</Thead>
					<Tbody>
						{recipes.map((recipe) => (
							<Tr key={recipe.id} textAlign={"center"}>
								<Td>{recipe.product?.name || "-"}</Td>
								<Td>{recipe.category?.name || "-"}</Td>
								<Td>{recipe.validity}</Td>
								<Td>{recipe.yield}</Td>
								<Td>
									<Button
										size="sm"
										onClick={() => openRecipeDetails(recipe)}
										colorScheme="blue"
										variant="outline"
										px={2}
										// _focus={{ outline: 'none'}}
										>
										
										<FiEye fontSize="18px" />
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>

			{/* Paginação */}
			<Flex mt={6} justifyContent="center" align="center" gap={2}>
				{Array.from({ length: totalPages }).map((_, idx) => (
					<Button
						key={idx}
						size="xs"
						variant={currentPage === idx + 1 ? "solid" : "outline"}
						onClick={() => goToPage(idx + 1)}>
						{idx + 1}
					</Button>
				))}
			</Flex>

			{selectedRecipe && (
				<RecipeDetailsModal
					recipe={selectedRecipe}
					isOpen={true}
					onClose={closeRecipeDetails}
				/>
			)}
		</Box>
	);
};

export default RecipesPage;
