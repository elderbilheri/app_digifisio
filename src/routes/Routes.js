import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RecoveryScreen from "../screens/RecoveryScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterPatient from "../screens/RegisterPatient";
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
					name="RegisterUser"
					component={RegisterScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Recovery"
					component={RecoveryScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="RegisterPatient"
					component={RegisterPatient}
					options={{ headerShown: false }}
				/>
				{/* Adicione outras telas aqui */}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
