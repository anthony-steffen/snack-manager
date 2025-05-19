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
	HStack,
	Flex,
	VStack,
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
      <ModalContent bg={bgCard} borderRadius="lg" border="1px solid" borderColor={borderColor}>
        <ModalHeader fontWeight="bold" textAlign={'center'}>📋 Detalhes da Receita</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={6}>
          <Stack spacing={2} fontSize="sm">
						<HStack spacing={2} justifyContent="center">
            <Heading textAlign={'center'} fontSize={'2xl'}>
							Produto:
							</Heading>
							<Text fontSize="2xl" color="brand.500"> {recipe.product?.name} </Text>
							</HStack>
            <HStack spacing={2} justifyContent="center">
							<Heading textAlign={'center'} fontSize={'2xl'}>
								Categoria:
							</Heading>
							<Text fontSize="2xl" color="brand.500"> {recipe.product?.category?.name} </Text>
							</HStack>
							<VStack spacing={2} justifyContent="center">
									<Heading textAlign={'center'} fontSize={'2xl'}>
										Descrição:
									</Heading>
									<Text fontSize="sm" color="brand.500" textAlign='center'> {recipe.product?.description} </Text>
							</VStack>
							<HStack spacing={2} justifyContent="center">
									<Heading textAlign={'center'} fontSize={'2xl'}>
										Validade:
									</Heading>
									<Text fontSize="2xl" color="brand.500"> {recipe.product?.validity} </Text>
							</HStack>
							<HStack spacing={2} justifyContent="center">
									<Heading textAlign={'center'} fontSize={'2xl'}>
										Rendimento:
									</Heading>
									<Text fontSize="md" color="brand.500"> {recipe.product?.yield} </Text>
							</HStack>
          </Stack>

          <Box
            mt={6}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            overflowX="auto"
          >
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
                    <Td><Text></Text>{item.ingredient.name}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.unit}</Td>
                    <Td>{formatCurrency(item.ingredient.unitPrice)}</Td>
                    <Td>{formatCurrency(item.ingredient.unitPrice * item.quantity)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Stack spacing={2} mt={6} fontSize="sm" px={2}>
            <Heading fontSize={'md'}>Custo Total dos Ingredientes: {formatCurrency(totalIngredientCost)} </Heading>
            <Heading fontSize={'md'}>Desperdício (%): {recipe.wastePercentage || 0}% </Heading>
            <Heading fontSize={'md'}>Markup (%): {recipe.markupPercentage || 0}% </Heading>
            <Heading fontSize={'md'}>Custo com Desperdício: {formatCurrency(costWithWaste)} </Heading>
            <Heading fontWeight="bold" color="brand.400" textAlign={'center'}>
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
