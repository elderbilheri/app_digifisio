import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	// Verifica quando o teclado aparece e desaparece
	React.useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true); // Oculta o cabeçalho quando o teclado aparece
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false); // Exibe o cabeçalho quando o teclado desaparece
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	const handleLogin = (data) => {
		const dataLogin = data;
		console.log(dataLogin);
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<SafeAreaView style={styles.container}>
					{!isKeyboardVisible && ( // Exibe o cabeçalho somente quando o teclado não está visível
						<View style={styles.header}>
							<Text style={styles.subtitle}>Bem-vindo ao</Text>
							<Text style={styles.title}>DIGIFISIO</Text>
						</View>
					)}
					<View style={styles.body}>
						<Text style={styles.label}>Usuário</Text>
						<Controller
							control={control}
							name="username"
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<TextInput
									style={[
										styles.input,
										{
											borderWidth: errors.username && 1,
											borderColor:
												errors.username && "#ff375b",
										},
									]}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
									placeholder="Digite seu usuário"
								/>
							)}
						/>
						{errors.username && (
							<Text style={styles.messageError}>
								{errors.username?.message}
							</Text>
						)}

						<Text style={styles.label}>Senha</Text>
						<Controller
							control={control}
							name="password"
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<TextInput
									style={[
										styles.input,
										{
											borderWidth: errors.password && 1,
											borderColor:
												errors.password && "#ff375b",
										},
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
							<Text style={styles.messageError}>
								{errors.password?.message}
							</Text>
						)}

						<TouchableOpacity>
							<Text style={styles.forgotPassword}>
								Esqueceu a senha?
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.button}
							onPress={handleSubmit(handleLogin)}
						>
							<Text style={styles.buttonTitle}>ENTRAR</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		height: "20%",
		backgroundColor: "#281942",
		borderBottomLeftRadius: 150,
		borderBottomRightRadius: 150,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 30,
	},
	subtitle: {
		fontSize: 16,
		color: "#FFF",
		fontWeight: "bold",
		marginBottom: 5,
	},
	title: {
		fontSize: 42,
		color: "#FFF",
		fontWeight: "bold",
	},
	body: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "center",
	},
	label: {
		fontSize: 17,
		marginBottom: 5,
		color: "#281942",
		fontWeight: "bold",
	},
	input: {
		borderWidth: 1,
		borderColor: "#281942",
		padding: 10,
		borderRadius: 8,
		marginBottom: 15,
		backgroundColor: "#e3e3e3",
		// backgroundColor: "#F0F8FF",
		elevation: 1,
	},
	forgotPassword: {
		textAlign: "right",
		color: "#1e90ff",
		marginBottom: 30,
	},
	buttonContainer: {
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 30,
	},
	button: {
		backgroundColor: "#281942",
		paddingVertical: 15,
		paddingHorizontal: 100,
		borderRadius: 8,
		elevation: 3,
	},
	buttonTitle: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
	messageError: {
		alignSelf: "flex-start",
		color: "#ff375b",
		marginBottom: 8,
	},
});

export default LoginScreen;
