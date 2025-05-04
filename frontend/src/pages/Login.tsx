/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css, keyframes } from '@emotion/react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ✅ 1. Interface do formulário
interface LoginFormData {
  email: string;
  password: string;
}

// ✅ 2. Animação (sem mudanças)
const fadeInUp = keyframes`
  from {
    transform: translateY(30px);
  } 
  to {
    transform: translateY(0);
  }
`;

// ✅ 3. Componente com tipo explícito de retorno
const Login = (): ReactElement => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ 4. useForm tipado com LoginFormData
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // ✅ 5. onSubmit tipado com SubmitHandler
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await login(data);
      toast({
        title: "Login realizado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/home");
    } catch (error: any) {
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
      marginTop="15%"
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
        border="1px solid rgb(24, 24, 24)"
        maxWidth="400px"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Heading textAlign="center" fontWeight="bold" fontSize="2xl" mb={4}>
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
};

export default Login;
