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
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'



const fadeInUp = keyframes`
  from {
    transform: translateY(30px);
  } 
  to {
    transform: translateY(0);
  }
`

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', result.accessToken);

        toast({
          title: 'Login realizado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/produtos');
      } else {
        toast({
          title: 'Erro ao entrar',
          description: result.message || 'Credenciais inválidas',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Erro no servidor',
        description: err.message,
        status: 'error',
        duration: 3000,
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
          <Stack spacing={6}>
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