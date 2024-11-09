import AsyncStorage from "@react-native-async-storage/async-storage";

// Salva um usuário no AsyncStorage
// export async function saveUser(user) {
// 	try {
// 		const users = await getUsers();
// 		const newUsers = [...users, user];
// 		await AsyncStorage.setItem("users", JSON.stringify(newUsers));
// 	} catch (error) {
// 		console.error("Erro ao salvar usuário:", error);
// 	}
// }

export const saveUser = async (user) => {
	try {
		const storedUsers = await AsyncStorage.getItem("users");
		const users = storedUsers ? JSON.parse(storedUsers) : [];

		// Verificar se o usuário já existe
		const userIndex = users.findIndex((u) => u.id === user.id);

		if (userIndex !== -1) {
			// Atualizar o usuário existente
			users[userIndex] = user;
		} else {
			// Adicionar novo usuário
			users.push(user);
		}

		await AsyncStorage.setItem("users", JSON.stringify(users));
	} catch (error) {
		console.error("Erro ao salvar usuário:", error);
		throw error;
	}
};

// Retorna todos os usuários armazenados
export async function getUsers() {
	try {
		const users = await AsyncStorage.getItem("users");
		return users ? JSON.parse(users) : [];
	} catch (error) {
		console.error("Erro ao recuperar usuários:", error);
		return [];
	}
}

// Recupera um usuário específico pelo ID
export async function getUserById(userId) {
	try {
		const users = await getUsers();
		return users.find((user) => user.id === userId);
	} catch (error) {
		console.error("Erro ao recuperar usuário pelo ID:", error);
		return null;
	}
}

// Função de login - exemplo básico de busca por usuário e senha
export async function loginUser(username, password) {
	try {
		const users = await getUsers();
		const user = users.find(
			(u) => u.username === username && u.password === password
		);
		if (user) {
			await AsyncStorage.setItem("loggedUserId", user.id);
			return user;
		}
		return null;
	} catch (error) {
		console.error("Erro ao logar usuário:", error);
		return null;
	}
}

// Função para obter o usuário logado do AsyncStorage
export const getUser = async () => {
	try {
		const user = await AsyncStorage.getItem("loggedUserId");
		return user ? user : null;
	} catch (error) {
		console.error("Erro ao obter usuário:", error);
		throw new Error("Erro ao obter usuário.");
	}
};

// Função de logout
export async function logoutUser() {
	try {
		await AsyncStorage.removeItem("loggedUserId");
	} catch (error) {
		console.error("Erro ao fazer logout:", error);
	}
}

// Função para excluir usuário pelo ID
export const deleteUserById = async (userId) => {
	try {
		const users = await getUsers();
		const filteredUsers = users.filter((user) => user.id !== userId);
		await AsyncStorage.setItem("users", JSON.stringify(filteredUsers));
	} catch (error) {
		console.error("Erro ao excluir usuário:", error);
		throw error;
	}
};
