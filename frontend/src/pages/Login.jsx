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
    transform: translateY(30px);
  } 
  to {
    transform: translateY(0);
  }
`

export default function Login() {

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
        <Stack spacing={6}>
          <Heading
            textAlign="center"
            fontWeight="bold"
            fontSize="2xl"
            mb={4}

          >
            Lanchonete
          </Heading>
          <Input placeholder="Email" type="email" borderColor="gray.400" />
          <Input placeholder="Senha" type="password" borderColor="gray.400" />
          <Button size="lg">
            Entrar
          </Button>
          <Text fontSize="sm"  textAlign="center">
            Esqueceu a senha?
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}
