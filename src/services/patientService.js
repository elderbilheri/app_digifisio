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

// Função para buscar paciente específico pelo ID do paciente
export const getPatientById = async (patientId, userId) => {
	try {
		const storedPatients = await AsyncStorage.getItem(`patients_${userId}`);
		const patients = storedPatients ? JSON.parse(storedPatients) : [];
		return patients.find((patient) => patient.id === patientId) || null;
	} catch (error) {
		console.error("Erro ao buscar paciente por ID:", error);
		throw new Error("Erro ao buscar paciente.");
	}
};

// Função para atualizar um paciente específico pelo ID e ID do usuário
export const updatePatient = async (patientId, updatedPatientData, userId) => {
	try {
		const storedPatients = await AsyncStorage.getItem(`patients_${userId}`);
		const patients = storedPatients ? JSON.parse(storedPatients) : [];

		// Encontra o índice do paciente a ser atualizado
		const patientIndex = patients.findIndex(
			(patient) => patient.id === patientId
		);

		if (patientIndex === -1) {
			throw new Error("Paciente não encontrado.");
		}

		// Atualiza o paciente com os novos dados
		patients[patientIndex] = {
			...patients[patientIndex],
			...updatedPatientData,
		};

		// Salva a lista de pacientes atualizada
		await AsyncStorage.setItem(
			`patients_${userId}`,
			JSON.stringify(patients)
		);

		return patients[patientIndex]; // Retorna o paciente atualizado
	} catch (error) {
		console.error("Erro ao atualizar paciente:", error);
		throw new Error("Erro ao atualizar paciente.");
	}
};

// Função para deletar um paciente específico de um usuário
export const deletePatient = async (patientId, userId) => {
	try {
		const patients = await AsyncStorage.getItem(`patients_${userId}`);
		const parsedPatients = patients ? JSON.parse(patients) : [];

		// Filtra para manter apenas os pacientes que não correspondem ao ID a ser excluído
		const updatedPatients = parsedPatients.filter(
			(patient) => patient.id !== patientId
		);

		await AsyncStorage.setItem(
			`patients_${userId}`,
			JSON.stringify(updatedPatients)
		);
		return true;
	} catch (error) {
		console.error("Erro ao excluir paciente:", error);
		return false;
	}
};

// Função para listar pacientes com atendimento no dia atual
export const getPatientsByDay = async (userId) => {
	try {
		const patientsData = await AsyncStorage.getItem(`patients_${userId}`);
		const patients = patientsData ? JSON.parse(patientsData) : [];

		// Obter o dia atual da semana
		const currentDayIndex = new Date().getDay();
		const daysOfWeekMap = [
			"Domingo",
			"Segunda-feira",
			"Terça-feira",
			"Quarta-feira",
			"Quinta-feira",
			"Sexta-feira",
			"Sabado",
		];
		const currentDay = daysOfWeekMap[currentDayIndex];

		// Filtrar pacientes com atendimento no dia atual
		const patientsWithToday = patients.filter((patient) =>
			patient.daysOfWeek.includes(currentDay)
		);

		return patientsWithToday;
	} catch (error) {
		console.error("Erro ao recuperar pacientes:", error);
		return [];
	}
};
