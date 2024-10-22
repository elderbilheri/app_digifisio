import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { validateUser } from "../services/authService";

const schema = yup.object({
	username: yup.string().required("Digite seu usuário!"),
	password: yup
		.string()
		.min(6, "A senha deve ter pelo menos 6 dígitos!")
		.required("Digite a sua senha!"),
});

const LoginScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	// Função que chama a validação do Usuário existen no Asyncstorage
	const onLogin = async (data) => {
		setLoading(true);
		const isValid = await validateUser(data.username, data.password);
		setLoading(false);

		if (isValid) {
			navigation.navigate("HomeScreen");
		} else {
			Alert.alert("Erro", "Usuário ou senha incorretos!");
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View style={styles.container}>
				<Text style={styles.label}>Usuário</Text>
				<Controller
					control={control}
					name="username"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={[
								styles.input,
								errors.username && { borderColor: "#ff375b" },
							]}
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
							placeholder="Digite seu usuário"
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
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={[
								styles.input,
								errors.password && { borderColor: "#ff375b" },
							]}
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
							placeholder="Digite sua senha"
							secureTextEntry={true}
						/>
					)}
				/>
				{errors.password && (
					<Text style={styles.error}>{errors.password.message}</Text>
				)}

				<TouchableOpacity
					onPress={handleSubmit(onLogin)}
					style={styles.button}
				>
					<Text style={styles.buttonText}>
						{loading ? "Carregando..." : "ENTRAR"}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate("RegisterUser")}
				>
					<Text style={styles.link}>Cadastrar novo usuário</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate("Recovery")}
				>
					<Text style={styles.link}>Esqueceu a senha?</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, justifyContent: "center" },
	label: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
	input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
	button: {
		backgroundColor: "#000",
		padding: 15,
		borderRadius: 5,
		marginTop: 10,
	},
	buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
	link: { color: "blue", textAlign: "center", marginTop: 20 },
	error: { color: "red" },
});

export default LoginScreen;
