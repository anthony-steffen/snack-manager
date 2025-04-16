import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();

    return (
      <Box p={10}>
        <Heading>Lista de Produtos</Heading>
        <Text mt={4}>Essa é uma rota protegida. Apenas usuários autenticados podem ver isso.</Text>
        <Button mt={6} colorScheme="blue" onClick={() => navigate('/')}>
          Voltar
        </Button>
      </Box>
    );
  }