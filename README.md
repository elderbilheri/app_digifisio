# Digifisio

Digifisio é um aplicativo simples e eficiente desenvolvido para auxiliar no gerenciamento de pacientes e atendimentos realizados por profissionais da área de fisioterapia. Este projeto foi criado como parte de um programa de extensão acadêmica e tem como objetivo oferecer uma solução prática para organizar fichas de pacientes, registros de atendimentos e agendamentos do dia.

---

### Funcionalidades
- Login e Cadastro de Usuário: Validação de usuários com palavra-chave de recuperação.
- Cadastro de Pacientes: Armazena informações básicas, como nome, idade, diagnóstico e local de atendimento.
- Histórico de Atendimentos: Registra e exibe os atendimentos realizados para cada paciente.
- Listagem de Pacientes: Exibe todos os pacientes cadastrados com opção de filtrar atendimentos do dia.
- Tela Splash Personalizada: Experiência de inicialização aprimorada.

---
  
### Pré-requisitos
Para executar o projeto, você precisará de:

- Node.js (versão 14 ou superior)
- Expo CLI (instalado globalmente)
- Um dispositivo físico ou emulador configurado para Android ou iOS

---

### Tecnologias Utilizadas
- React Native: Framework para desenvolvimento de aplicativos móveis.
- Expo: Ferramenta que facilita a construção e execução do app.
- React Hook Form: Gerenciamento de formulários e validações.
- Yup: Biblioteca de validação de esquemas de dados.
- AsyncStorage: Persistência de dados no dispositivo.
- React Navigation: Navegação entre telas.
- React Native Vector Icons: Ícones para estilização.
  
---

### Dependências
```json
{
  "@hookform/resolvers": "^3.9.0",
  "@react-native-async-storage/async-storage": "1.23.1",
  "@react-native-picker/picker": "^2.9.0",
  "@react-navigation/native-stack": "^6.11.0",
  "expo": "~51.0.28",
  "expo-status-bar": "~1.12.1",
  "react": "18.2.0",
  "react-hook-form": "^7.53.0",
  "react-native": "0.74.5",
  "react-native-safe-area-context": "4.10.5",
  "react-native-screens": "3.31.1",
  "react-native-vector-icons": "^10.2.0",
  "yup": "^1.4.0"
}
```

---

### Demais Instalações Requeridas
 
1. Picker (Seleção de Dados)
    ```bash
    npm install @react-native-picker/picker
    ```

2. EAS CLI (Build e Publicação do App)
    ```bash
    npm install -g eas-cli
    ```
---

### Instalação
1. Clone este repositório:
    ```bash
    git clone https://github.com/elderbilheri/digifisio.git
    cd digifisio
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Inicie o projeto no Expo:
    ```bash
    npx expo start
    ```

---

### Gerando APK
Para gerar um APK de produção, siga os passos:
1. Configure o ambiente com o Expo CLI:
    ```bash
    eas build:configure
    ```
2. Construa o APK:
    ```bash
    eas build --platform android
    ```
3. Após a conclusão, acesse o link gerado para baixar o arquivo APK.

---

### Licença
Este projeto é licenciado sob a MIT License.

