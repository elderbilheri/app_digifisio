import AsyncStorage from "@react-native-async-storage/async-storage";

// função que salva o cadastro do usuário
export const saveUser = async (userData) => {
	try {
		await AsyncStorage.setItem("user", JSON.stringify(userData));
	} catch (error) {
		console.error("Erro ao salvar o usuário: ", error);
	}
};

// função que busca o cadastro do usuário
export const getUser = async () => {
	try {
		const user = await AsyncStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	} catch (error) {
		console.error("Erro ao buscar usuário: ", error);
	}
};

// função que valida se o usuário esta cadastrado
export const validateUser = async (username, password) => {
	const user = await getUser();
	if (user && user.username === username && user.password === password) {
		return true;
	} else {
		return false;
	}
};
