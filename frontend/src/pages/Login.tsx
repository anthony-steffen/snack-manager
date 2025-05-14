/** @jsxImportSource @emotion/react */
import React, { ReactElement } from "react";
import { css, keyframes } from "@emotion/react";
import {
	Box,
	Button,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Theme } from "@chakra-ui/react";

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

	const bg = useColorModeValue("gray.300", "gray.800");

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
			marginTop={{ base: "15%", md: "5%" }}
			h="100vh"
			css={css`
				animation: ${fadeInUp} 0.6s ease forwards;
			`}>
			<Box
				p={12}
				rounded="2xl"
				boxShadow="2xl"
				width={{ base: "90%", md: "50%" }}
				border="2px solid rgb(24, 24, 24)"
				maxWidth="400px"
				bg={bg}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={3}>
						<Heading
							bgGradient="linear(to-r,rgb(202, 40, 40),rgb(202, 186, 40))"
							bgClip="text"
							fontSize="4xl"
              textAlign="center"
							fontWeight="extrabold"
              letterSpacing="tight"
              style={{ WebkitTextStroke: "1px black" }}
							mb={4}>
							Lanchonete
						</Heading>

						<Input
							placeholder="Email"
							type="email"
							colorScheme="red"
							{...register("email", { required: "Email obrigatório" })}
						/>
						{errors.email && (
							<Text color="red.500" fontSize="sm">
								{errors.email.message}
							</Text>
						)}

						<Input
							placeholder="Senha"
							type="password"
							{...register("password", { required: "Senha obrigatória" })}
						/>
						{errors.password && (
							<Text color="red.500" fontSize="sm">
								{errors.password.message}
							</Text>
						)}

						<Button
              variant="glow"
							type="submit"
							w={{ base: "50%", md: "50%" }}
							m="auto"
							// rounded={"lg"}
              >
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
