// Função padrão para gerar um ID único.

export const generateId = () => {
	return Math.random().toString(36).substring(2, 9);
};
