import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateId } from "../services/utils";

// Função para salvar paciente com associação ao ID do usuário logado
export const savePatient = async (patientData, userId) => {
	try {
		const newPatientData = {
			...patientData,
			id: generateId(),
			userId, // Vincula o paciente ao usuário logado
		};

		const storedPatients = await AsyncStorage.getItem(`patients_${userId}`);
		const patients = storedPatients ? JSON.parse(storedPatients) : [];

		patients.push(newPatientData);
		await AsyncStorage.setItem(
			`patients_${userId}`,
			JSON.stringify(patients)
		);

		return newPatientData; // Retorna o paciente cadastrado com sucesso
	} catch (error) {
		console.error("Erro ao salvar paciente:", error);
		throw new Error("Erro ao salvar paciente.");
	}
};

// Função para buscar todos os pacientes vinculados ao usuário logado
export const getPatients = async (userId) => {
	try {
		const storedPatients = await AsyncStorage.getItem(`patients_${userId}`);
		return storedPatients ? JSON.parse(storedPatients) : [];
	} catch (error) {
		console.error("Erro ao buscar pacientes:", error);
		throw new Error("Erro ao buscar pacientes.");
	}
};
