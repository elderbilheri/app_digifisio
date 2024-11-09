import React, { useState, useEffect } from "react";
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
import {
	getUserById,
	saveUser,
	logoutUser,
	deleteUserById,
} from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const EditUserScreen = () => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const navigation = useNavigation();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const loggedUserId = await AsyncStorage.getItem("loggedUserId");
				if (loggedUserId) {
					const user = await getUserById(loggedUserId);
					if (user) {
						setUserData(user);
						setValue("username", user.username);
						setValue("password", user.password);
						setValue("recoveryKey", user.recoveryKey);
					}
				}
			} catch (error) {
				console.error("Erro ao carregar dados do usuário:", error);
			}
		};
		loadUserData();
	}, [setValue]);

	const onSubmit = async (data) => {
		try {
			await saveUser({ ...userData, ...data }); // Atualiza os dados com o ID original
			await logoutUser(); // Desloga o usuário para que faça login novamente
			Alert.alert("Sucesso", "Dados atualizados com sucesso!");
			navigation.navigate("Login");
		} catch (error) {
			console.error("Erro ao atualizar usuário:", error);
			Alert.alert("Erro", "Erro ao atualizar os dados do usuário.");
		}
	};

	const handleDeleteUser = () => {
		Alert.alert(
			"Confirmação",
			"Tem certeza de que deseja excluir seu usuário?",
			[
				{ text: "Não", style: "cancel" },
				{
					text: "Sim",
					style: "destructive",
					onPress: async () => {
						try {
							await logoutUser();
							await deleteUserById(userData.id);
							Alert.alert(
								"Sucesso",
								"Usuário excluído com sucesso!"
							);
							navigation.navigate("Login");
						} catch (error) {
							console.error("Erro ao excluir usuário:", error);
							Alert.alert("Erro", "Erro ao excluir o usuário.");
						}
					},
				},
			]
		);
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
				<Text style={styles.buttonText}>ATUALIZAR CADASTRO</Text>
			</TouchableOpacity>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.cancelButton}
					onPress={() => navigation.goBack()}
				>
					<Text style={styles.buttonText}>CANCELAR</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.deleteButton}
					onPress={handleDeleteUser}
				>
					<Text style={styles.buttonText}>EXCLUIR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, justifyContent: "center" },
	label: { fontSize: 18, fontWeight: "bold" },
	input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
	button: { backgroundColor: "#007AFF", padding: 15 },
	buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
	error: { color: "red" },
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
});

export default EditUserScreen;
