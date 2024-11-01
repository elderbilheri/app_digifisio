import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavigateButton = ({ targetScreen, title = "Voltar" }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.navigate(targetScreen)}>
			<Text style={styles.link}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	link: {
		color: "blue",
		textAlign: "center",
		marginVertical: 10,
		fontSize: 18,
	},
});

export default NavigateButton;
