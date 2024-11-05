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

// Função para buscar um atendimento específico pelo ID
export const getAttendanceById = async (attendanceId, patientId) => {
	try {
		const storedAttendances = await AsyncStorage.getItem(
			`attendances_${patientId}`
		);
		const attendances = storedAttendances
			? JSON.parse(storedAttendances)
			: [];

		// Encontra o atendimento específico pelo ID
		const attendance = attendances.find((item) => item.id === attendanceId);
		return attendance || null; // Retorna o atendimento ou null se não encontrado
	} catch (error) {
		console.error("Erro ao buscar atendimento:", error);
		throw new Error("Erro ao buscar atendimento.");
	}
};

// Função para atualizar um atendimento existente
export const updateAttendance = async (
	attendanceId,
	updatedData,
	patientId
) => {
	try {
		const storedAttendances = await AsyncStorage.getItem(
			`attendances_${patientId}`
		);
		let attendances = storedAttendances
			? JSON.parse(storedAttendances)
			: [];

		// Mapeia os atendimentos e atualiza o que tem o ID correspondente
		attendances = attendances.map((attendance) =>
			attendance.id === attendanceId
				? { ...attendance, ...updatedData }
				: attendance
		);

		await AsyncStorage.setItem(
			`attendances_${patientId}`,
			JSON.stringify(attendances)
		);
	} catch (error) {
		console.error("Erro ao atualizar atendimento:", error);
		throw new Error("Erro ao atualizar atendimento.");
	}
};
