// Função padrão para gerar um ID único.
export const generateId = () => {
	return Math.random().toString(36).substring(2, 9);
};

// Função para tornar a primeira letra em maiúscula
export const capitalizeFirstLetter = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};
