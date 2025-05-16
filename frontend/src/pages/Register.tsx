/** @jsxImportSource @emotion/react */
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
import { css, keyframes } from "@emotion/react";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const fadeInUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  } 
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

type RegisterFormInputs = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = (): ReactElement => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterFormInputs>();

	const toast = useToast();
	const navigate = useNavigate();
	const bg = useColorModeValue("gray.200", "gray.800");

	const onSubmit = async (data: RegisterFormInputs) => {
		try {
			const response = await fetch("http://localhost:4000/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				toast({
					title: "Registro realizado com sucesso!",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				navigate("/login");
			} else {
				const resData = await response.json();
				toast({
					title: "Erro ao registrar",
					description:
						resData?.message || "Verifique os dados e tente novamente.",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error: string | any) {
			const message =
				error instanceof Error ? error.message : "Erro desconhecido";
			toast({
				title: "Erro no servidor",
				description: message,
				status: "error",
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
			marginTop={{ base: "15%", md: "5%" }}
			h="100vh"
			css={css`
				animation: ${fadeInUp} 0.6s ease forwards;
			`}>
			<Box
				bg={bg}
				p={8}
				rounded="2xl"
				boxShadow="2xl"
				width={{ base: "95%", md: "50%" }}
				border="2px solid rgb(0, 0, 0)"
				maxWidth="400px"
				>
				<Heading
					bgGradient="linear(to-r,rgb(202, 40, 40),rgb(202, 186, 40))"
					bgClip="text"
					fontSize="3xl"
					textAlign="center"
					fontWeight="extrabold"
					letterSpacing="tight"
					style={{ WebkitTextStroke: "1px black" }}
					mb={4}>
					Criar conta
				</Heading>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={4}>
						{/* Nome */}
						<Box>
							<Input
								placeholder="Nome"
								{...register("name", { required: "Nome é obrigatório" })}
								autoComplete="name"
								borderColor="gray.400"
							/>
							{errors.name && (
								<Text color="red.500" fontSize="sm" mt={2}>
									{errors.name.message}
								</Text>
							)}
						</Box>

						{/* Email */}
						<Box>
							<Input
								type="email"
								placeholder="Email"
								{...register("email", {
									required: "Email é obrigatório",
									pattern: {
										value: /^\S+@\S+$/i,
										message: "Email inválido",
									},
								})}
								autoComplete="email"
								borderColor="gray.400"
							/>
							{errors.email && (
								<Text color="red.500" fontSize="sm" mt={2}>
									{errors.email.message}
								</Text>
							)}
						</Box>

						{/* Senha */}
						<Box>
							<Input
								type="password"
								placeholder="Senha"
								{...register("password", {
									required: "Senha é obrigatória",
									minLength: {
										value: 6,
										message: "A senha deve ter no mínimo 6 caracteres",
									},
								})}
								autoComplete="new-password"
								borderColor="gray.400"
							/>
							{errors.password && (
								<Text color="red.500" fontSize="sm" mt={2}>
									{errors.password.message}
								</Text>
							)}
						</Box>

						{/* Confirmação */}
						<Box>
							<Input
								type="password"
								placeholder="Confirme a senha"
								{...register("confirmPassword", {
									required: "Confirmação de senha é obrigatória",
									validate: (value) =>
										value === watch("password") || "As senhas não coincidem",
								})}
								autoComplete="new-password"
								borderColor="gray.400"
							/>
							{errors.confirmPassword && (
								<Text color="red.500" fontSize="sm" mt={2}>
									{errors.confirmPassword.message}
								</Text>
							)}
						</Box>

						<Button type="submit" colorScheme="blue" variant={"glow"} mt={4}>
							Registrar
						</Button>
					</Stack>
				</form>
			</Box>
		</Box>
	);
};

export default Register;
