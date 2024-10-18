import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateUserScreen from "../screens/CreateUserScreen";
// Adicione outras telas aqui conforme necessário

const Stack = createNativeStackNavigator();

const Routes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Splash">
				<Stack.Screen
					name="Splash"
					component={SplashScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Usuario"
					component={CreateUserScreen}
					options={{ title: "Meu Perfil" }}
				/>
				{/* Adicione outras telas aqui */}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
