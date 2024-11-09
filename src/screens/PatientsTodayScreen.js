import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getPatientsByDay } from "../services/patientService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigateButton from "../components/NavigateButton";
import { capitalizeFirstLetter } from "../services/utils";

const PatientsTodayScreen = () => {
	const [patientsToday, setPatientsToday] = useState([]);

	useEffect(() => {
		const fetchPatients = async () => {
			const userId = await AsyncStorage.getItem("loggedUserId");
			const patients = await getPatientsByDay(userId);
			setPatientsToday(patients);
		};

		fetchPatients();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Pacientes com Atendimento Hoje</Text>
			</View>

			<View style={styles.listContainer}>
				<FlatList
					data={patientsToday}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.patientItem}>
							<Text style={styles.patientName}>{item.name}</Text>
							<Text style={styles.patientSubtitle}>
								{capitalizeFirstLetter(
									item.atendimentoLocation
								)}
							</Text>
						</View>
					)}
					ListEmptyComponent={
						<Text>Nenhum paciente com atendimento hoje.</Text>
					}
				/>
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
		marginTop: 10,
	},
	headerContainer: {
		paddingBottom: 8,
	},
	title: {
		fontSize: 20,
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
	footer: {
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: "#DDD",
	},
});

export default PatientsTodayScreen;
