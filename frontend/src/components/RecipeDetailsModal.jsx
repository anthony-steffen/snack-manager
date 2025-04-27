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
} from "@chakra-ui/react";

export function RecipeDetailsModal({ recipe, isOpen, onClose }) {
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
      <ModalContent>
        <ModalHeader>Detalhes da Receita</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={6}>
          <Stack spacing={4}>
            <Text><strong>Produto:</strong> {recipe.product?.name}</Text>
            <Text><strong>Categoria:</strong> {recipe.category?.name}</Text>
            <Text><strong>Descrição:</strong> {recipe.description || "Não informada"}</Text>
            <Text><strong>Validade:</strong> {recipe.validity}</Text>
            <Text><strong>Rendimento:</strong> {recipe.yield}</Text>

            <Box overflowX="auto" borderRadius="md" border="1px solid rgb(24,24,24)" mt={4}>
              <Table variant="striped" size="sm">
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
                      <Td>{item.ingredient.name}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{item.unit}</Td>
                      <Td>{formatCurrency(item.ingredient.unitPrice)}</Td>
                      <Td>{formatCurrency(item.ingredient.unitPrice * item.quantity)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Stack spacing={2} mt={6}>
              <Text><strong>Custo Total dos Ingredientes:</strong> {formatCurrency(totalIngredientCost)}</Text>
              <Text><strong>Desperdício (%):</strong> {recipe.wastePercentage || 0}%</Text>
              <Text><strong>Markup (%):</strong> {recipe.markupPercentage || 0}%</Text>
              <Text><strong>Custo com Desperdício:</strong> {formatCurrency(costWithWaste)}</Text>
              <Text><strong>Preço Sugerido de Venda:</strong> {formatCurrency(suggestedPrice)}</Text>
            </Stack>
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
