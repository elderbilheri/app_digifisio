// AttendanceRegisterScreen.js
import React from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Alert,
	TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";
import { saveAttendance } from "../services/attendanceService";

const schema = Yup.object().shape({
	type: Yup.string().required("Selecione o tipo de atendimento"),
	date: Yup.string().required("Data do atendimento é obrigatória"),
	description: Yup.string()
		.required("Descrição do atendimento é obrigatória")
		.min(10, "Descrição deve ter no mínimo 10 caracteres"),
});

const AttendanceRegisterScreen = ({ route, navigation }) => {
	const { patientId } = route.params; // Recebe o ID do paciente
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			// Salva o atendimento usando a função saveAttendance
			await saveAttendance(data, patientId);

			Alert.alert("Sucesso", "Atendimento cadastrado com sucesso!");
			navigation.goBack(); // Retorna à tela de Lista de Atendimentos
		} catch (error) {
			console.error("Erro ao salvar atendimento:", error);
			Alert.alert("Erro", "Não foi possível salvar o atendimento.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Cadastrar Atendimento</Text>

			<View>
				<Text style={styles.label}>Tipo de Atendimento</Text>
				<Controller
					control={control}
					name="type"
					render={({ field: { onChange, value } }) => (
						<View style={styles.select}>
							<Picker
								selectedValue={value}
								onValueChange={onChange}
								style={styles.input}
							>
								<Picker.Item
									label="Selecione o tipo"
									value=""
								/>
								<Picker.Item
									label="Atendimento"
									value="Atendimento"
								/>
								<Picker.Item
									label="Avaliação"
									value="Avaliação"
								/>
								<Picker.Item
									label="Evolução"
									value="Evolução"
								/>
							</Picker>
						</View>
					)}
				/>
				{errors.type && (
					<Text style={styles.error}>{errors.type.message}</Text>
				)}

				<Text style={styles.label}>Data do Atendimento</Text>
				<Controller
					control={control}
					name="date"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="DD/MM/AAAA"
						/>
					)}
				/>
				{errors.date && (
					<Text style={styles.error}>{errors.date.message}</Text>
				)}

				<Text style={styles.label}>Descrição do Atendimento</Text>
				<Controller
					control={control}
					name="description"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={[styles.input, styles.textArea]}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="Descreva o atendimento"
							multiline
							numberOfLines={4}
						/>
					)}
				/>
				{errors.description && (
					<Text style={styles.error}>
						{errors.description.message}
					</Text>
				)}
			</View>

			<View>
				<Button
					title="Salvar Atendimento"
					onPress={handleSubmit(onSubmit)}
				/>

				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={styles.link}>Cancelar</Text>
				</TouchableOpacity>
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
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 20,
		textAlign: "center",
		backgroundColor: "#281942",
		paddingVertical: 5,
		color: "#FFF",
	},
	label: {
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
	textArea: {
		height: 100,
		textAlignVertical: "top",
	},
	error: {
		color: "red",
		marginBottom: 8,
	},
	link: {
		color: "blue",
		textAlign: "center",
		marginVertical: 10,
		fontSize: 18,
	},
});

export default AttendanceRegisterScreen;
