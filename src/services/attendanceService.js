// attendanceService.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateId } from "./utils";

// Função para salvar atendimento vinculado ao paciente
export const saveAttendance = async (attendanceData, patientId) => {
	try {
		const newAttendanceData = {
			...attendanceData,
			id: generateId(),
			patientId, // Vincula o atendimento ao paciente específico
		};

		const storedAttendances = await AsyncStorage.getItem(
			`attendances_${patientId}`
		);
		const attendances = storedAttendances
			? JSON.parse(storedAttendances)
			: [];

		attendances.push(newAttendanceData);
		await AsyncStorage.setItem(
			`attendances_${patientId}`,
			JSON.stringify(attendances)
		);

		return newAttendanceData; // Retorna o atendimento cadastrado com sucesso
	} catch (error) {
		console.error("Erro ao salvar atendimento:", error);
		throw new Error("Erro ao salvar atendimento.");
	}
};

// Função para buscar todos os atendimentos vinculados a um paciente específico
export const getAttendances = async (patientId) => {
	try {
		const storedAttendances = await AsyncStorage.getItem(
			`attendances_${patientId}`
		);
		return storedAttendances ? JSON.parse(storedAttendances) : [];
	} catch (error) {
		console.error("Erro ao buscar atendimentos:", error);
		throw new Error("Erro ao buscar atendimentos.");
	}
};
