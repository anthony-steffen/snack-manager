/** @jsxImportSource @emotion/react */
import {
	Box,
	Button,
	Heading,
	Input,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const fadeInUp = keyframes`
  from {
    transform: translateY(30px);
  } 
  to {
    transform: translateY(0);
  }
`;

export default function Register() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const toast = useToast();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
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
				toast({
					title: "Erro ao registrar",
					description: "Verifique os dados e tente novamente.",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast({
				title: "Erro no servidor",
				description: error.message,
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
			marginTop="15%"
			h="100vh"
			css={css`
				animation: ${fadeInUp} 0.6s ease forwards;
			`}>
			<Box
			  border={'1px solid rgb(24, 24, 24)'}
				p={12}
				rounded="2xl"
				boxShadow="2xl"
				width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
				maxWidth="400px">
				<Heading textAlign="center" fontWeight="bold" fontSize="2xl" mb={4}>
					Criar conta
				</Heading>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={4}>
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
								borderColor="gray.400"
								autoComplete="new-pas
                sword"
							/>
							{errors.password && (
								<Text color="red.500" fontSize="sm" mt={2}>
									{errors.password.message}
								</Text>
							)}
						</Box>

						<Box>
							<Input
								type="password"
								placeholder="Confirme a senha"
								{...register("confirmPassword", {
									required: "Confirmação de senha é obrigatória",
									validate: (value) =>
										value === watch("password") || "As senhas não coincidem",
								})}
								borderColor="gray.400"
								autoComplete="new-pas
                sword"
							/>
							{errors.confirmPassword && (
								<Text color="red.500" fontSize="sm" mt={2}>
									{errors.confirmPassword.message}
								</Text>
							)}
						</Box>

						<Button type="submit">
							Registrar
						</Button>
					</Stack>
				</form>
			</Box>
		</Box>
	);
}
