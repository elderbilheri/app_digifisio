import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		// Timer de 1.7 segundos para ir para a tela de Login
		const timer = setTimeout(() => {
			navigation.replace("Login");
		}, 1200);

		// Limpa o timer se o componente for desmontado
		return () => clearTimeout(timer);
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo.png")} style={styles.logo} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#281942", // Cor de fundo
	},
	logo: {
		width: 360,
		height: 260,
	},
});

export default SplashScreen;
