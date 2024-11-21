import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import AWS from 'aws-sdk'; // ou aws-amplify para integração com AWS Cognito

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email || !password) {
      showToast('Email e senha são obrigatórios');
      return false;
    }

    if (!emailRegex.test(email)) {
      showToast('Email inválido');
      return false;
    }

    return true;
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setIsLoading(true);

    try {
      // Adapte esta parte para usar o AWS Amplify ou Cognito SDK
      const result = await authenticateUser(email, password); // Função de autenticação personalizada

      setIsLoading(false);

      if (result) {
        navigation.navigate('DrawerMenu'); // Exemplo de navegação
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro no login', error.message || 'Erro desconhecido');
    }
  };

  const handleForgotPassword = () => {
    // Redirecionar para a tela de recuperação de senha
    navigation.navigate('ForgotPassword');
  };

  const handleCreateAccount = () => {
    // Redirecionar para a tela de criação de conta
    navigation.navigate('NewAccount');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 15,
          padding: 10,
        }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Digite seu email"
      />

      <Text>Senha:</Text>
      <TextInput
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 15,
          padding: 10,
        }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Digite sua senha"
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <Button title="Esqueci a senha" onPress={handleForgotPassword} />
      <Button title="Criar nova conta" onPress={handleCreateAccount} />
    </View>
  );
};

// Função de autenticação - para Cognito, você pode usar AWS Amplify
const authenticateUser = async (email, password) => {
  // Integre a autenticação com o AWS Cognito aqui
  // Exemplo com AWS Amplify:
  // try {
  //   const user = await Auth.signIn(email, password);
  //   return user;
  // } catch (error) {
  //   throw new Error(error.message);
  // }
};

export default LoginScreen;
