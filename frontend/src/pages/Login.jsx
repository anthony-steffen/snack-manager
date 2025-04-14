/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'


const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  } 
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export default function Login() {
  const bgGradient = 'linear(to-r, orange.400, orange.600)'


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      marginTop="10%"
      h="100vh"
      bgGradient={bgGradient}
      css={css`
        animation: ${fadeInUp} 0.6s ease forwards;
      `}
    >
      <Box
        bg="blackAlpha.300"
        p={12}
        rounded="lg"
        boxShadow="2xl"
        width={{ base: '90%', sm: '80%', md: '60%', lg: '40%' }}
        maxWidth="400px"

      >
        <Stack spacing={6}>
          <Heading
            textAlign="center"
            fontWeight="bold"
            fontSize="2xl"
            className="gray.300"
            mb={4}

          >
            Lanchonete
          </Heading>
          <Input placeholder="Email" type="email" borderColor="gray.400" />
          <Input placeholder="Senha" type="password" borderColor="gray.400" />
          <Button size="lg">
            Entrar
          </Button>
          <Text fontSize="sm" color="gray.300" textAlign="center">
            Esqueceu a senha?
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}
