// src/components/Layout/AuthenticatedLayout.jsx
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthenticatedLayout({ children }) {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<Box minH="100vh" p={4} mx="auto">
			<Flex as="header" align="center" mb={6} p={4}>
				<Flex align="center" justify="space-between" w="80%">
					<Button bg="blue.600" size="sm" onClick={handleLogout}>
						Logout
					</Button>
					<Text fontSize="sm">{user?.email}</Text>
				</Flex>
			</Flex>

			<Box as="main">{children}</Box>
		</Box>
	);
}
