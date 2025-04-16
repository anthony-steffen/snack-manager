import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

export default function Products() {
	const navigate = useNavigate();

	return (
		<AuthenticatedLayout>
			<Heading>Lista de Produtos</Heading>
			<Text mt={4}>
				Essa é uma rota protegida. Apenas usuários autenticados podem ver isso.
			</Text>
			<Button
				mt={6}
				onClick={() => navigate("/login")}
				bg="blue.600"
				_hover={{ bg: "#a5d6a7" }}>
				Voltar
			</Button>
		</AuthenticatedLayout>
	);
}
