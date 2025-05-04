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
} from "@chakra-ui/react";
import { useRecipeList } from "../hooks/useRecipeList";
import { RecipeDetailsModal } from "../components/RecipeDetailsModal";
import { FiEye } from "react-icons/fi";
import { ReactElement } from "react";

const RecipesPage = (): ReactElement => {
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
		<Box
			border={"1px solid rgb(24, 24, 24)"}
			mx="auto"
			my={4}
			p={6}
			w={{ base: "95%", md: "90%", lg: "80%" }}
			borderRadius="lg"
			boxShadow="md"
			minH="100vh">
			<Heading mb={6} textAlign="center" fontSize={{ base: 20, md: 24 }}>
				Receitas Cadastradas
			</Heading>

			{/* Campo de busca */}
			<Flex mb={4} gap={2} flexWrap="wrap" justify="center">
				<Input
					placeholder="Buscar produto..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					size="sm"
					maxW="200px"
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
					maxW="130px">
					<option value="3">3 dias</option>
					<option value="7">7 dias</option>
					<option value="30">30 dias</option>
				</Select>

				<Select
					placeholder="Ordenar Preço"
					value={sortDirection}
					onChange={(e) => setSortDirection(e.target.value)}
					size="sm"
					maxW="130px">
					<option value="asc">Preço ↑</option>
					<option value="desc">Preço ↓</option>
				</Select>
			</Flex>

			{/* Tabela */}
			<Box overflowX="auto" borderRadius="md">
				<Table variant="striped" size="sm" minW="600px">
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
						{recipes.map((recipe) => (
							<Tr key={recipe.id}>
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
										px={2}>
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
}

export default RecipesPage;