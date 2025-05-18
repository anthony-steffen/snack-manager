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
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaUtensils,
  FaClipboardList,
  FaListAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";

// Tipagem explícita para as props do Card
interface CardProps {
  icon: IconType;
  label: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ icon, label, onClick }) => {
  const bg = useColorModeValue("gray.900","gray.50");
  return (
    <Box
      as="button"
      onClick={onClick}
      bg="orange.200"
      border="2px"
      borderColor={bg}
      borderRadius="full"
      boxShadow="lg"
      mx={"auto"}
      // p={8}
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
      <Icon as={icon} boxSize={8} color="gray.800" mb={2} />
      <Text fontWeight="bold" fontSize={12} color={"gray.800"}>
        {label}
      </Text>
    </Box>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.50", "gray.900");
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
        h="100vh"
        mx="auto"
        borderRadius="lg"
        w={{ base: "100%" }}
        textAlign="center"
      >
        <Stack spacing={4} textAlign="center" mb={10}>
          <Heading fontSize={{ base: "2xl", md: "4xl" }}fontWeight="extrabold"> Cadastro </Heading>
          <Text fontSize={{ base: "md", md: "md" }}>
            Gerencie seus produtos, ingredientes e receitas de forma rápida e prática.
          </Text>
        </Stack>

        <SimpleGrid
          bg={bg}
          columns={{ base: 2, md: 4 }}
          p={5}
          spacing={3}
          mx="auto"
          w={{ base: "100%", md: "80%", lg: "40%" }}
          borderWidth={1}
          borderColor={bg === "gray.50" ? "gray.200" : "gray.800"}
          borderRadius="3xl"
          boxShadow={bg === "gray.50" ? "lg" : "dark-lg"}
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
};

export default Home;
