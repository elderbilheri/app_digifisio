import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../services/authService";
import { getPatients } from "../services/patientService";
import NavigateButton from "../components/NavigateButton";
import { capitalizeFirstLetter } from "../services/utils";

const PatientListScreen = () => {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchPatients = async () => {
			try {
				// Obtém o usuário logado para acessar o userId
				const user = await getUser();
				if (user) {
					const patientsList = await getPatients(user);
					// console.log(
					// 	"Pacientes recuperados: ",
					// 	patientsList
					// ); // Log para depuração
					setPatients(patientsList);
				} else {
					console.log("Usuário não encontrado.");
				}
			} catch (error) {
				console.error("Erro ao buscar pacientes:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPatients();
	}, []);

	// Renderiza cada item da lista de pacientes
	const renderPatientItem = ({ item }) => (
		<View style={styles.patientItem}>
			<View>
				<Text style={styles.patientName}>{item.name}</Text>
				<Text style={styles.patientSubtitle}>
					{capitalizeFirstLetter(item.atendimentoLocation)}
				</Text>
			</View>
			<TouchableOpacity
				style={styles.arrowButton}
				onPress={() =>
					navigation.navigate("AttendanceList", {
						patientId: item.id,
						patientName: item.name,
					})
				}
			>
				<Text>
					<Icon name="enter-sharp" size={35} color="#007BFF" />
				</Text>
			</TouchableOpacity>
		</View>
	);

	if (loading) {
		return <Text>Carregando...</Text>;
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Lista de Pacientes</Text>
			</View>

			<View style={styles.listContainer}>
				{patients.length > 0 ? (
					<FlatList
						data={patients}
						keyExtractor={(item) => item.id}
						renderItem={renderPatientItem}
						contentContainerStyle={{ paddingBottom: 20 }}
					/>
				) : (
					<Text style={styles.noPatientsText}>
						Nenhum paciente encontrado.
					</Text>
				)}
			</View>

			<View style={styles.footer}>
				<NavigateButton targetScreen="Home" title="VOLTAR" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#FFF",
		justifyContent: "space-between",
	},
	headerContainer: {
		paddingBottom: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 20,
		textAlign: "center",
		backgroundColor: "#281942",
		paddingVertical: 5,
		color: "#FFF",
	},
	listContainer: {
		flex: 1, // Área rolável para a lista
	},
	patientItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#DDD",
	},
	patientName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#281942",
	},
	patientSubtitle: {
		fontSize: 14,
		color: "#555",
	},
	arrowButton: {
		justifyContent: "center",
	},
	noPatientsText: {
		textAlign: "center",
		color: "#555",
		marginVertical: 20,
	},
	footer: {
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: "#DDD",
	},
});

export default PatientListScreen;
