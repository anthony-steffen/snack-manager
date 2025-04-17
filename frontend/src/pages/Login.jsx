/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useAuth  } from '../contexts/AuthContext';



const fadeInUp = keyframes`
  from {
    transform: translateY(30px);
  } 
  to {
    transform: translateY(0);
  }
`

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth(); // função do contexto
  const { 
    register, 
    handleSubmit, 
    formState: { errors } }
   = useForm();

   const onSubmit = async (data) => {
    try {
      await login(data); // função do contexto
      toast({
        title: "Login realizado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/home");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error.message || "Verifique suas credenciais.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      marginTop="10%"
      h="100vh"
      css={css`
        animation: ${fadeInUp} 0.6s ease forwards;
      `}
    >
      <Box
        p={12}
        rounded="2xl"
        boxShadow="2xl"
        width={{ base: '90%', sm: '80%', md: '60%', lg: '40%' }}
        maxWidth="400px"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Heading
              textAlign="center"
              fontWeight="bold"
              fontSize="2xl"
              mb={4}
            >
              Lanchonete
            </Heading>

            <Input
              placeholder="Email"
              type="email"
              borderColor="gray.400"
              {...register('email', { required: 'Email obrigatório' })}
            />
            {errors.email && (
              <Text color="red.500" fontSize="sm">
                {errors.email.message}
              </Text>
            )}

            <Input
              placeholder="Senha"
              type="password"
              borderColor="gray.400"
              {...register('password', { required: 'Senha obrigatória' })}
            />
            {errors.password && (
              <Text color="red.500" fontSize="sm">
                {errors.password.message}
              </Text>
            )}

            <Button size="lg" type="submit">
              Login
            </Button>

            <Text fontSize="sm" textAlign="center">
              Esqueceu a senha?
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}