import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Button,
} from "react-native";
import { getAttendances } from "../services/attendanceService";
import NavigateButton from "../components/NavigateButton";
import { useFocusEffect } from "@react-navigation/native";

const AttendanceListScreen = ({ route, navigation }) => {
	const { patientId, patientName } = route.params; // Recebe o ID e nome do paciente
	const [attendances, setAttendances] = useState([]);
	const [loading, setLoading] = useState(true);

	useFocusEffect(
		React.useCallback(() => {
			const fetchAttendances = async () => {
				try {
					const attendancesList = await getAttendances(patientId);
					setAttendances(attendancesList);
					console.log(attendancesList); // Log do array atualizado
				} catch (error) {
					console.error("Erro ao buscar atendimentos:", error);
				} finally {
					setLoading(false);
				}
			};

			fetchAttendances();
		}, [patientId])
	);

	const renderAttendanceItem = ({ item }) => (
		<View style={styles.attendanceItem}>
			<View>
				<Text style={styles.attendanceDescription}>{item.type}</Text>
				<Text style={styles.attendanceDate}>{item.date}</Text>
			</View>
			{/* Botão de edição ao lado */}
			<TouchableOpacity
				style={styles.editButton}
				onPress={() =>
					navigation.navigate("AttendanceRegister", {
						attendanceId: item.id, // Passa o ID do atendimento para edição
						patientId, // Passa o ID do paciente para contexto
					})
				}
			>
				<Text style={styles.editButtonText}>Editar</Text>
			</TouchableOpacity>
		</View>
	);

	if (loading) {
		return <Text>Carregando...</Text>;
	}

	return (
		<View style={styles.container}>
			<View>
				{/* Título com nome do paciente */}
				<Text style={styles.title}>{patientName}</Text>

				{/* Botão para edição do cadastro do paciente */}
				<Button
					title="Cadastro do Paciente"
					onPress={() =>
						// navigation.navigate("RegisterPatient", {
						// 	patientId: patientId,
						// })
						navigation.navigate("RegisterPatient", {
							patientId,
						})
					}
				/>

				{/* Linha divisória */}
				<View style={styles.divider} />

				{/* Título e botão de adicionar atendimento */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Atendimentos</Text>
					<TouchableOpacity
						style={styles.addButton}
						onPress={() =>
							navigation.navigate("AttendanceRegister", {
								patientId,
							})
						}
					>
						<Text style={styles.addButtonText}>+</Text>
					</TouchableOpacity>
				</View>

				{/* Lista de atendimentos */}
				{attendances.length > 0 ? (
					<FlatList
						data={attendances}
						keyExtractor={(item) => item.id}
						renderItem={renderAttendanceItem}
					/>
				) : (
					<Text>Nenhum atendimento encontrado.</Text>
				)}
			</View>

			<NavigateButton targetScreen="PatientList" title="Voltar" />
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
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 5,
		textAlign: "center",
		backgroundColor: "#281942",
		paddingVertical: 5,
		color: "#FFF",
	},
	divider: {
		height: 1,
		backgroundColor: "#DDD",
		marginBottom: 30,
		marginTop: 12,
		elevation: 6,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#281942",
	},
	addButton: {
		width: 45,
		height: 45,
		backgroundColor: "#28a745",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		elevation: 4,
	},
	addButtonText: {
		color: "#FFF",
		fontSize: 30,
		fontWeight: "400",
	},
	attendanceItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#DDD",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	attendanceDescription: {
		fontSize: 16,
		fontWeight: "500",
	},
	attendanceDate: {
		fontSize: 14,
		color: "#555",
	},
	editButton: {
		borderWidth: 1,
		backgroundColor: "#281942",
		borderRadius: 4,
	},
	editButtonText: {
		color: "#FFF",
		fontSize: 14,
		fontWeight: "500",
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	buttonReturn: {
		marginTop: 8,
	},
	link: {
		color: "blue",
		textAlign: "center",
		fontSize: 18,
	},
});

export default AttendanceListScreen;
