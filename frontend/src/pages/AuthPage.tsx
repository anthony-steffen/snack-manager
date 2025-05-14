/** @jsxImportSource @emotion/react */
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const bg = useColorModeValue('gray.100', 'gray.800')

  return (
    <Flex
      justify="center"
      h="100vh"
      bg={bg}
      fontFamily="body"
      transition="background 0.3s ease"
    >
      <Box
        position="relative"
        w={{base: '95%', md: '70%', lg: '50%', xl: '20%'}}
        h="400px"
        bg="white"
        boxShadow="2xl"
        borderRadius="xl"
        overflow="hidden"
        display="flex"
        bgColor={useColorModeValue('white', 'gray.900')}
        mt={{base: '15%', md: '5%'}}
      >
        {/* Sign In Form */}
        <Box
          position="absolute"
          top="0"
          left={isSignUp ? '100%' : '30%'}
          w="70%"
          h="100%"
          p={1}
          transition="all 0.6s ease"
          zIndex={ isSignUp ? 1 : 3 }
          bg={useColorModeValue('white', 'gray.800')}
        >
          <SignInForm />
        </Box>

        {/* Sign Up Form */}
        <Box
          position="absolute"
          top="0"
          left={isSignUp ? '0' : '100%'}
          w="70%"
          h="100%"
          p={2}
          transition="all 0.6s ease"
          zIndex={isSignUp ? 3 : 1}
          bg={useColorModeValue('white', 'gray.800')}
        >
          <SignUpForm />
        </Box>

        {/* Overlay */}
        <Box
          position="absolute"
          top="0"
          left={isSignUp ? '70%' : '0'}
          w="30%"
          h="100%"
          bgGradient="linear(to-r, gray.600, gray.600)"
          color="white"
          transition="all 0.6s ease"
          display="flex"
          flexDir="column"
          // justifyContent="center"
          // gap={4}
          alignItems="center"
          zIndex={4}
        >
          <Heading fontSize="lg" textAlign="center" my={4}>
            {isSignUp ? 'Hello, Friend!' : 'Welcome Back!'}
          </Heading>
          <Text fontSize="sm" mb={6} maxW="80%" textAlign="center">
            {isSignUp
              ? 'Enter your personal details and start journey with us'
              : 'To keep connected with us please login with your personal info'}
          </Text>
          <Button
            variant="outline"
            borderColor="white"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}

function SignInForm() {
  return (
    <Stack spacing={4}>
      <Heading textAlign={'center'}>Sign In</Heading>
      <Input placeholder="Email" type="email" size={'sm'} rounded={'md'}/>
      <Input placeholder="Password" type="password" size={'sm'} rounded={'md'}/>
      <Button colorScheme="red" rounded="md" w={{base: '50%', md: '50%'}} m={'auto'} mt={'30%'}>
        Sign In
      </Button>
      <Text fontSize="small" textAlign="center">
        Forgot your password?
      </Text>
    </Stack>
  )
}

function SignUpForm() {
  return (
    <Stack spacing={4}>
      <Heading textAlign={'center'}>Create Account</Heading>
      <Input placeholder="Name" />
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button colorScheme="red" rounded="full">
        Sign Up
      </Button>
    </Stack>
  )
}
