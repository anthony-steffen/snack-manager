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
	IconButton,
} from "@chakra-ui/react";
import { FilterBtn } from "../components/FilterBtn";
import { useRecipeList } from "../hooks/useRecipeList";
import { useRecipes } from "../hooks/useRecipes";
import { RecipeDetailsModal } from "../components/RecipeDetailsModal";
import { FiEye, FiDelete, FiEdit } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
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

	const { handleEditRecipe } = useRecipes();

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
				w={{ base: "95%", md: "80%", lg: "30%" }}
				mx="auto"
				flexDir='row'
				alignItems="center"
				justifyContent="space-around"
				bg={bg}
				rounded={"sm"}
				borderWidth={1}
				borderColor={bg === "gray.50" ? "gray.200" : "gray.800"}
				boxShadow={bg === "gray.50" ? "lg" : "dark-lg"}
				>
				<Input
					placeholder="Buscar produto..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					size="sm"
					maxW="150px"
					my={2}
				/>

				<FilterBtn
					categoryFilter={categoryFilter}
					setCategoryFilter={setCategoryFilter}
					validityFilter={validityFilter}
					setValidityFilter={setValidityFilter}
					sortDirection={sortDirection}
					setSortDirection={setSortDirection}
					categories={[
						...new Set(allRecipes.map((r) => r.category?.name)),
					].filter(Boolean)}
				/>
			</Flex>

			{/* Tabela */}
			<Box
				overflowX="auto"
				borderRadius="md"
				w={{ base: "95%", md: "80%", lg: "30%" }}
				m="auto">
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
							<Th color="white">Prod</Th>
							<Th color="white">Val</Th>
							<Th color="white">Rend</Th>
							<Th color="white">PS</Th>
							<Th color="white">Ações</Th>
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
									<IconButton
										size="sm"
										onClick={() => openRecipeDetails(recipe)}
										variant="solid"
										px={2}
										aria-label={"Ver detalhes da receita"}>
										<FiEye fontSize="18px" />
									</IconButton>
									<IconButton
										size="sm"
										icon={<MdDelete />}
										bg="red.500"
										color="white"
										variant="solid"
										ml={2}
										onClick={() => console.log("Delete recipe", recipe.id)}
										aria-label={"Excluir receita"}
									/>
									<IconButton
										size="sm"
										icon={<MdEdit />}
										bg="green.700"
										color="white"
										variant="solid"
										ml={2}
										onClick={() => handleEditRecipe(recipe)}
										aria-label={"Editar receita"}
									/>
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
