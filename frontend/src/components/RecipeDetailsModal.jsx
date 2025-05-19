/** @jsxImportSource @emotion/react */
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Text,
	Box,
	Stack,
	useColorModeValue,
	Heading,
} from "@chakra-ui/react";

export function RecipeDetailsModal({ recipe, isOpen, onClose }) {
	const bgCard = useColorModeValue("gray.50", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const tableBg = useColorModeValue("gray.100", "gray.900");
	if (!recipe) return null;

	const totalIngredientCost = recipe.items.reduce((acc, item) => {
		return acc + item.ingredient.unitPrice * item.quantity;
	}, 0);

	const wasteFactor = 1 + (recipe.wastePercentage || 0) / 100;
	const markupFactor = 1 + (recipe.markupPercentage || 0) / 100;
	const costWithWaste = totalIngredientCost * wasteFactor;
	const suggestedPrice = costWithWaste * markupFactor;

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
			<ModalOverlay />
			<ModalContent
				bg={bgCard}
				borderRadius="lg"
				border="1px solid"
				borderColor={borderColor}>
				<ModalHeader fontWeight="bold">📋 Detalhes da Receita</ModalHeader>
				<ModalCloseButton _focus={{ outline: 'none'}}/>
				<ModalBody p={6}>
					<Stack spacing={2} fontSize="sm">
						<Heading textAlign={"center"}>
							<strong>Produto:</strong> {recipe.product?.name}
						</Heading>
						<Heading textAlign={"center"}>
							<strong>Categoria:</strong> {recipe.product?.category?.name}
						</Heading>
						<Heading textAlign={"center"}>
							<strong>Descrição:</strong>
							<Text fontSize="md"> {recipe.product?.description}</Text>
						</Heading>
						<Heading textAlign={"center"}>
							<strong>Validade:</strong> {recipe.validity}
						</Heading>
						<Heading textAlign={"center"}>
							<strong>Rendimento:</strong> {recipe.yield}
						</Heading>
					</Stack>

					<Box
						mt={6}
						border="1px solid"
						borderColor={borderColor}
						borderRadius="md"
						overflowX="auto">
						<Table variant="striped" size="sm" bg={tableBg}>
							<Thead>
								<Tr>
									<Th>Ingrediente</Th>
									<Th>Quantidade</Th>
									<Th>Unidade</Th>
									<Th>Valor Unitário</Th>
									<Th>Custo Total</Th>
								</Tr>
							</Thead>
							<Tbody>
								{recipe.items.map((item, idx) => (
									<Tr key={idx}>
										<Td>
											<Text></Text>
											{item.ingredient.name}
										</Td>
										<Td>{item.quantity}</Td>
										<Td>{item.unit}</Td>
										<Td>{formatCurrency(item.ingredient.unitPrice)}</Td>
										<Td>
											{formatCurrency(
												item.ingredient.unitPrice * item.quantity
											)}
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>

					<Stack spacing={2} mt={6} fontSize="sm" px={2}>
						<Heading fontSize={"md"}>
							<strong>Custo Total dos Ingredientes:</strong>{" "}
							{formatCurrency(totalIngredientCost)}{" "}
						</Heading>
						<Heading fontSize={"md"}>
							<strong>Desperdício (%):</strong> {recipe.wastePercentage || 0}%{" "}
						</Heading>
						<Heading fontSize={"md"}>
							<strong>Markup (%):</strong> {recipe.markupPercentage || 0}%{" "}
						</Heading>
						<Heading fontSize={"md"}>
							<strong>Custo com Desperdício:</strong>{" "}
							{formatCurrency(costWithWaste)}{" "}
						</Heading>
						<Heading fontWeight="bold" color="brand.400" textAlign={"center"}>
							Preço Sugerido de Venda: {formatCurrency(suggestedPrice)}
						</Heading>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

// Função para formatar como moeda BRL
function formatCurrency(value) {
	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
		minimumFractionDigits: 2,
	});
}
