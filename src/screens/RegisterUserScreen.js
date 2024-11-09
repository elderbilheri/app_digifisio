import React from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveUser } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import { generateId } from "../services/utils";

const schema = yup.object({
	username: yup.string().required("Usuário é obrigatório!"),
	password: yup
		.string()
		.min(6, "Senha deve ter ao menos 6 dígitos")
		.required("Senha é obrigatória!"),
	recoveryKey: yup
		.string()
		.required("Palavra-chave de recuperação é obrigatória!"),
});

const RegisterUserScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const navigation = useNavigation();

	const onSubmit = async (data) => {
		const userData = { ...data, id: generateId() };

		try {
			await saveUser(userData);
			Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
			navigation.navigate("Login");
		} catch (error) {
			console.error("Erro ao salvar usuário:", error);
			Alert.alert("Erro ao salvar usuário");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Usuário</Text>
			<Controller
				control={control}
				name="username"
				render={({ field: { onChange, value } }) => (
					<TextInput
						style={styles.input}
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>
			{errors.username && (
				<Text style={styles.error}>{errors.username.message}</Text>
			)}

			<Text style={styles.label}>Senha</Text>
			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, value } }) => (
					<TextInput
						style={styles.input}
						secureTextEntry
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>
			{errors.password && (
				<Text style={styles.error}>{errors.password.message}</Text>
			)}

			<Text style={styles.label}>Palavra-chave de recuperação</Text>
			<Controller
				control={control}
				name="recoveryKey"
				render={({ field: { onChange, value } }) => (
					<TextInput
						style={styles.input}
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>
			{errors.recoveryKey && (
				<Text style={styles.error}>{errors.recoveryKey.message}</Text>
			)}

			<TouchableOpacity
				onPress={handleSubmit(onSubmit)}
				style={styles.button}
			>
				<Text style={styles.buttonText}>CADASTRAR</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Text style={styles.link}>CANCELAR</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, justifyContent: "center" },
	label: { fontSize: 18, fontWeight: "bold" },
	input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
	button: { backgroundColor: "#000", padding: 15, borderRadius: 5 },
	buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
	error: { color: "red" },
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
});

export default RegisterUserScreen;
