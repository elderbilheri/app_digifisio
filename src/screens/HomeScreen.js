import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getUserById, logoutUser } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	// Função para deslogar o usuário
	const handleLogout = async () => {
		await logoutUser();
		navigation.replace("Login");
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require("../assets/logo.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
				<View style={styles.headerGreeting}>
					<Text style={styles.greeting}>Bem-vindo(a) 👋</Text>
				</View>
			</View>

			<View style={styles.cardsContainer}>
				<TouchableOpacity
					style={[styles.card, { backgroundColor: "#D282BC" }]}
					onPress={() => navigation.navigate("AtendimentosHoje")}
				>
					<Icon name="calendar" size={40} color="#FFF" />
					<Text style={styles.cardText}>Atendimentos do Dia</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.card, { backgroundColor: "#00BFFF" }]}
					onPress={() => navigation.navigate("PatientList")}
				>
					<Icon name="folder-open" size={40} color="#FFF" />
					<Text style={styles.cardText}>Lista de Pacientes</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.card, { backgroundColor: "#388E3C" }]}
					onPress={() => navigation.navigate("RegisterPatient")}
				>
					<Icon name="person-add" size={40} color="#FFF" />
					<Text style={styles.cardText}>Cadastrar Pacientes</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.floatingButton}
					onPress={() => setShowDropdown(!showDropdown)}
				>
					<Icon name="person-circle-outline" size={48} color="#fff" />
				</TouchableOpacity>
				{showDropdown && (
					<View style={styles.dropdownMenu}>
						<TouchableOpacity
							style={styles.dropdownItem}
							onPress={() => {
								navigation.navigate("EditUser");
								setShowDropdown(!showDropdown);
							}}
						>
							<Text style={styles.dropdownText}>
								Editar Usuário
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.dropdownItem}
							onPress={handleLogout}
						>
							<Text style={styles.dropdownText}>Sair</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: "#fff",
	},
	header: {
		width: "100%",
		alignItems: "center",
		marginTop: 40,
		backgroundColor: "#281942",
	},
	logo: {
		width: "100%",
		height: 90,
		margin: 5,
	},
	headerGreeting: {
		width: "100%",
		backgroundColor: "#FFF",
	},
	greeting: {
		fontSize: 22,
		fontWeight: "bold",
		marginTop: 10,
		color: "#333",
		textAlign: "center",
	},
	cardsContainer: {
		flex: 1,
		justifyContent: "center",
		width: "100%",
		paddingHorizontal: 20,
		alignItems: "center",
	},
	card: {
		width: "60%",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20,
		marginBottom: 20,
		elevation: 6,
	},
	cardText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 10,
		textAlign: "center",
	},
	footer: {
		width: "100%",
		height: 30,
		backgroundColor: "#281942",
		position: "relative",
		alignItems: "center",
	},
	floatingButton: {
		position: "absolute",
		bottom: 4,
		right: 178,
		width: 50,
		height: 50,
		borderRadius: 30,
		backgroundColor: "#553A87",
		alignItems: "center",
		justifyContent: "center",
		elevation: 8,
	},
	dropdownMenu: {
		position: "absolute",
		bottom: 50,
		right: 130,
		backgroundColor: "#FFF",
		borderRadius: 8,
		padding: 10,
		elevation: 20,
	},
	dropdownItem: {
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	dropdownText: {
		color: "#281942",
		fontSize: 16,
	},
});

export default HomeScreen;
