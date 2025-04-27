/** @jsxImportSource @emotion/react */
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaUtensils, FaClipboardList, FaListAlt } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      bgImage="url('https://images.unsplash.com/photo-1564758562218-5d0c38ecb79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Box bg="rgba(0,0,0,0.6)" w="100%" py={10} borderRadius="lg">
        <Stack spacing={4} textAlign="center" color="white" mb={10}>
          <Heading fontSize={{ base: "2xl", md: "4xl" }}>Bem-vindo ao Snack Manager</Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Gerencie seus produtos, ingredientes e receitas de forma rápida e prática.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mx="auto" w="90%" maxW="800px">
          <Card
            icon={FaBoxOpen}
            label="Produtos"
            onClick={() => navigate("/products")}
          />
          <Card
            icon={FaUtensils}
            label="Ingredientes"
            onClick={() => navigate("/ingredients")}
          />
          <Card
            icon={FaClipboardList}
            label="Cadastro de Receitas"
            onClick={() => navigate("/register-recipes")}
          />
          <Card
            icon={FaListAlt}
            label="Receitas Cadastradas"
            onClick={() => navigate("/recipes")}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}

function Card({ icon, label, onClick }) {
  return (
    <Box
      as="button"
      onClick={onClick}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      p={8}
      textAlign="center"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
      h="150px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Icon as={icon} boxSize={8} color="teal.500" mb={2} />
      <Text fontWeight="bold">{label}</Text>
    </Box>
  );
}
