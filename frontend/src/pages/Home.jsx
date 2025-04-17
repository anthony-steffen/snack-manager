import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box p={8} textAlign="center">
      <Heading mb={6}>Painel de Controle</Heading>
      <Stack spacing={4} align="center">
        <Button colorScheme="teal" size="lg" onClick={() => navigate('/products')}>
          Gerenciar Produtos
        </Button>
        {/* Outros botões de navegação podem ser adicionados aqui */}
      </Stack>
    </Box>
  );
}
