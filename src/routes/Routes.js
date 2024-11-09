import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterUserScreen from "../screens/RegisterUserScreen";
import RecoveryScreen from "../screens/RecoveryScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterPatientScreen from "../screens/RegisterPatientScreen";
import PatientListScreen from "../screens/PatientListScreen";
import AttendanceListScreen from "../screens/AttendanceListScreen";
import AttendanceRegisterScreen from "../screens/AttendanceRegisterScreen";
import EditUserScreen from "../screens/EditUserScreen";

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
					component={RegisterUserScreen}
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
					component={RegisterPatientScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="PatientList"
					component={PatientListScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="AttendanceList"
					component={AttendanceListScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="AttendanceRegister"
					component={AttendanceRegisterScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="EditUser"
					component={EditUserScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
