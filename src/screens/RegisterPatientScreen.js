import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	ScrollView,
	Switch,
	Alert,
	TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	savePatient,
	updatePatient,
	getPatientById,
	deletePatient,
} from "../services/patientService";

// Esquema de validação com Yup
const schema = Yup.object().shape({
	name: Yup.string().required("Nome é obrigatório"),
	birthDate: Yup.string().required("Data de Nascimento é obrigatória"),
	gender: Yup.string().required("Sexo é obrigatório"),
	phone: Yup.string().required("Fone é obrigatório"),
	age: Yup.string().required("Idade é obrigatória"),
	atendimentoLocation: Yup.string().required(
		"Local de Atendimento é obrigatório"
	),
	address: Yup.string().required("Endereço é obrigatório"),
	diagnosis: Yup.string().required("Diagnóstico Principal é obrigatório"),
});

const RegisterPatient = ({ route, navigation }) => {
	const { patientId } = route.params || {}; // Obter o patientId passado via navegação
	const [userId, setUserId] = useState(null);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [daysOfWeek, setDaysOfWeek] = useState({
		Domingo: false,
		"Segunda-feira": false,
		"Terça-feira": false,
		"Quarta-feira": false,
		"Quinta-feira": false,
		"Sexta-feira": false,
		Sabado: false,
	});

	// obtém o userId e o patientId caso exista, para carregar os dados do paciente
	useEffect(() => {
		const fetchUserAndPatient = async () => {
			try {
				const storedUserId = await AsyncStorage.getItem("loggedUserId");
				setUserId(storedUserId);

				if (patientId && storedUserId) {
					const patient = await getPatientById(
						patientId,
						storedUserId
					);
					if (patient) {
						setDaysOfWeek(
							Object.fromEntries(
								[
									"Domingo",
									"Segunda-feira",
									"Terça-feira",
									"Quarta-feira",
									"Quinta-feira",
									"Sexta-feira",
									"Sabado",
								].map((day) => [
									day,
									patient.daysOfWeek.includes(day),
								])
							)
						);
						reset(patient); // Preenche o formulário com dados do paciente
					}
				}
			} catch (error) {
				console.error("Erro ao carregar dados:", error);
			}
		};

		fetchUserAndPatient();
	}, [patientId, reset]);

	// Função para envio dos dados ao cadastrar paciente
	const onSubmit = async (data) => {
		try {
			if (!userId) {
				Alert.alert(
					"Erro",
					"Usuário não encontrado. Faça login novamente."
				);
				navigation.navigate("Login");
				return;
			}

			const daysActive = Object.entries(daysOfWeek)
				.filter(([_, isActive]) => isActive)
				.map(([day]) => day);

			const patientData = { ...data, daysOfWeek: daysActive };

			if (patientId) {
				await updatePatient(patientId, patientData, userId);
				Alert.alert("Sucesso", "Paciente atualizado com sucesso!");
			} else {
				await savePatient(patientData, userId);
				Alert.alert("Sucesso", "Paciente cadastrado com sucesso!");
			}

			console.log(patientData);

			navigation.goBack(); // Retorna à tela anterior
		} catch (error) {
			console.error("Erro ao salvar paciente:", error);
			Alert.alert("Erro ao salvar paciente");
		}
	};

	const toggleDaySwitch = (day) => {
		setDaysOfWeek((prevDays) => ({
			...prevDays,
			[day]: !prevDays[day],
		}));
	};

	const handleDeletePatient = () => {
		Alert.alert(
			"Confirmar Exclusão",
			"Tem certeza de que deseja excluir este paciente?",
			[
				{ text: "Não", style: "cancel" },
				{
					text: "Sim",
					style: "destructive",
					onPress: async () => {
						if (userId && patientId) {
							const success = await deletePatient(
								patientId,
								userId
							);
							if (success) {
								Alert.alert(
									"Sucesso",
									"Paciente excluído com sucesso!"
								);
								// navigation.goBack();
								navigation.navigate("Home");
							} else {
								Alert.alert(
									"Erro",
									"Erro ao excluir o paciente."
								);
							}
						}
					},
				},
			]
		);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>
				{patientId ? "Editar Paciente" : "Cadastrar Paciente"}
			</Text>

			<Text style={styles.labels}>Nome do Paciente</Text>
			<Controller
				control={control}
				name="name"
				render={({ field: { onChange, value } }) => (
					<View>
						<TextInput
							style={styles.input}
							placeholder="Nome"
							value={value}
							onChangeText={onChange}
						/>
						{errors.name && (
							<Text style={styles.error}>
								{errors.name.message}
							</Text>
						)}
					</View>
				)}
			/>

			<Text style={styles.labels}>Data de Nascimento</Text>
			<Controller
				control={control}
				name="birthDate"
				render={({ field: { onChange, value } }) => (
					<View>
						<TextInput
							style={styles.input}
							placeholder="Data de Nascimento"
							value={value}
							onChangeText={onChange}
						/>
						{errors.birthDate && (
							<Text style={styles.error}>
								{errors.birthDate.message}
							</Text>
						)}
					</View>
				)}
			/>

			<Text style={styles.labels}>Sexo</Text>
			<Controller
				control={control}
				name="gender"
				render={({ field: { onChange, value } }) => (
					<View style={styles.select}>
						<Picker
							selectedValue={value}
							onValueChange={onChange}
							style={styles.input}
						>
							<Picker.Item label="Masculino" value="masculino" />
							<Picker.Item label="Feminino" value="feminino" />
						</Picker>
						{errors.gender && (
							<Text style={styles.error}>
								{errors.gender.message}
							</Text>
						)}
					</View>
				)}
			/>

			<Text style={styles.labels}>Telefone</Text>
			<Controller
				control={control}
				name="phone"
				render={({ field: { onChange, value } }) => (
					<View>
						<TextInput
							style={styles.input}
							placeholder="Fone"
							value={value}
							onChangeText={onChange}
						/>
						{errors.phone && (
							<Text style={styles.error}>
								{errors.phone.message}
							</Text>
						)}
					</View>
				)}
			/>

			<Text style={styles.labels}>Idade</Text>
			<Controller
				control={control}
				name="age"
				render={({ field: { onChange, value } }) => (
					<View>
						<TextInput
							style={styles.input}
							placeholder="Idade"
							keyboardType="numeric"
							value={value}
							onChangeText={onChange}
						/>
						{errors.age && (
							<Text style={styles.error}>
								{errors.age.message}
							</Text>
						)}
					</View>
				)}
			/>

			<Text style={styles.labels}>Local de Atendimento</Text>
			<Controller
				control={control}
				name="atendimentoLocation"
				render={({ field: { onChange, value } }) => (
					<View style={styles.select}>
						<Picker
							selectedValue={value}
							onValueChange={onChange}
							style={styles.input}
						>
							<Picker.Item label="Selecione o tipo" value="" />
							<Picker.Item
								label="Domiciliar"
								value="domiciliar"
							/>
							<Picker.Item label="Clínica" value="clinica" />
							<Picker.Item label="Hospital" value="hospital" />
						</Picker>
						{errors.atendimentoLocation && (
							<Text style={styles.error}>
								{errors.atendimentoLocation.message}
							</Text>
						)}
					</View>
				)}
			/>

			<Text style={styles.labels}>Endereço</Text>
			<Controller
				control={control}
				name="address"
				render={({ field: { onChange, value } }) => (
					<View>
						<TextInput
							style={styles.input}
							placeholder="Endereço"
							value={value}
							onChangeText={onChange}
						/>
						{errors.address && (
							<Text style={styles.error}>
								{errors.address.message}
							</Text>
						)}
					</View>
				)}
			/>

			<Text style={styles.labels}>Diagnóstico Principal</Text>
			<Controller
				control={control}
				name="diagnosis"
				render={({ field: { onChange, value } }) => (
					<View>
						<TextInput
							style={styles.input}
							placeholder="Diagnóstico Principal"
							value={value}
							onChangeText={onChange}
						/>
						{errors.diagnosis && (
							<Text style={styles.error}>
								{errors.diagnosis.message}
							</Text>
						)}
					</View>
				)}
			/>

			<View style={styles.switchContainer}>
				<Text style={styles.switchTitle}>Dias de Atendimento:</Text>
				{[
					"Domingo",
					"Segunda-feira",
					"Terça-feira",
					"Quarta-feira",
					"Quinta-feira",
					"Sexta-feira",
					"Sabado",
				].map((day, index) => (
					<View key={index} style={styles.switchRow}>
						<Text>
							{day.charAt(0).toUpperCase() + day.slice(1)}
						</Text>
						<Switch
							value={daysOfWeek[day]}
							onValueChange={() => toggleDaySwitch(day)}
						/>
					</View>
				))}
			</View>

			<Button
				title={patientId ? "Atualizar Paciente" : "Salvar Paciente"}
				onPress={handleSubmit(onSubmit)}
			/>

			{patientId ? (
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.cancelButton}
						onPress={() => navigation.goBack()}
					>
						<Text style={styles.buttonText}>CANCELAR</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.deleteButton}
						onPress={handleDeletePatient}
					>
						<Text style={styles.buttonText}>EXCLUIR</Text>
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={styles.link}>CANCELAR</Text>
				</TouchableOpacity>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		backgroundColor: "#fff",
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
	labels: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 2,
		color: "#281942",
	},
	input: {
		borderWidth: 1,
		borderColor: "#281942",
		padding: 10,
		marginBottom: 15,
		borderRadius: 5,
	},
	select: {
		borderWidth: 1,
		height: 55,
		borderRadius: 5,
		marginBottom: 10,
	},
	error: {
		color: "red",
		marginBottom: 10,
	},
	switchContainer: {
		marginVertical: 20,
	},
	switchRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	switchTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#281942",
		paddingBottom: 3,
		textAlign: "center",
		borderBottomWidth: 1,
	},
	link: {
		marginVertical: 10,
		color: "#FFF",
		textAlign: "center",
		marginTop: 4,
		marginBottom: 2,
		paddingVertical: 6,
		fontSize: 16,
		fontWeight: "400",
		backgroundColor: "#444",
	},
	buttonContainer: {
		flexDirection: "row",
		marginTop: 4,
		gap: 4,
	},
	cancelButton: {
		flex: 3,
		backgroundColor: "#444",
		padding: 8,
		marginRight: 4,
	},
	deleteButton: {
		flex: 1,
		backgroundColor: "#B22222",
		padding: 8,
	},
	buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default RegisterPatient;
