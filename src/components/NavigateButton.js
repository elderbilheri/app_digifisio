import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavigateButton = ({ targetScreen, title = "VOLTAR" }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.navigate(targetScreen)}>
			<Text style={styles.link}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	link: {
		color: "#FFF",
		textAlign: "center",
		marginTop: 16,
		marginBottom: 2,
		paddingVertical: 6,
		fontSize: 16,
		fontWeight: "400",
		backgroundColor: "#444",
		width: "25%",
		alignSelf: "center",
	},
});

export default NavigateButton;
