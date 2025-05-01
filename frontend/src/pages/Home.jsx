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
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={3}
      px={3}
    >
      <Box 
      p={5}
      // my={5}
      h={"100vh"}
      mx={"auto"}
      borderRadius="lg" 
      w={{ base: "100%"}} 
      textAlign="center" 
      // bg={"blackAlpha.300"}
      >
        <Stack spacing={4} textAlign="center" mb={10}>
          <Heading fontSize={{ base: "2xl", md: "4xl" }}>Snack Manager</Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Gerencie seus produtos, ingredientes e receitas de forma rápida e prática.
          </Text>
        </Stack>

        <SimpleGrid 
        columns={{ base: 2, md: 4 }} 
        p={5} 
        spacing={3} 
        mx="auto"
        w={{ base: "100%", md: "80%", lg: "40%" }}
        border={"1px solid rgb(54, 54, 54)"}
        borderRadius="lg" 
        // bg="whiteAlpha.800"
        >
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
            label="Receitas"
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
      bg="orange.500"
      borderRadius="lg"
      boxShadow="lg"
      mx={'auto'}
      p={8}
      textAlign="center"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
      w="100px"
      h="100px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Icon as={icon} boxSize={8} color="teal.500" mb={2} />
      <Text fontWeight="bold" fontSize={15}>{label}</Text>
    </Box>
  );
}
