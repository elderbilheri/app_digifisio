import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUser } from "../services/authService";
import { useNavigation } from "@react-navigation/native";

const schema = yup.object({
	recoveryKey: yup
		.string()
		.required("Digite sua palavra-chave de recuperação!"),
});

const RecoveryScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	const onSubmit = async (data) => {
		setLoading(true);
		const user = await getUser();
		setLoading(false);

		if (user && user.recoveryKey === data.recoveryKey) {
			Alert.alert(
				"Recuperação de Conta",
				`Usuário: ${user.username}, Senha: ${user.password}`
			);
		} else {
			Alert.alert("Erro", "Palavra-chave de recuperação incorreta!");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Palavra-chave de Recuperação</Text>
			<Controller
				control={control}
				name="recoveryKey"
				render={({ field: { onChange, value } }) => (
					<TextInput
						style={[
							styles.input,
							errors.recoveryKey && { borderColor: "#ff375b" },
						]}
						onChangeText={onChange}
						value={value}
						placeholder="Digite sua palavra-chave"
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
				<Text style={styles.buttonText}>
					{loading ? "Carregando..." : "RECUPERAR"}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<Text style={styles.link}>Voltar ao Login</Text>
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
	link: { color: "blue", textAlign: "center", marginTop: 20 },
	error: { color: "red" },
});

export default RecoveryScreen;
