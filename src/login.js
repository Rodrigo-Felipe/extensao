import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Image, 
  ToastAndroid 
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';

const NewAccountScreen = () => {
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  
  const navigation = useNavigation();

  useEffect(() => {
    validateEmail();
    validatePassword();
  }, [email, emailConfirmation, password, passwordConfirmation]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex) || !emailConfirmation.match(emailRegex) || email !== emailConfirmation) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = () => {
    if (password !== passwordConfirmation || password.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      setProfilePhoto(image.path);
    } catch (error) {
      ToastAndroid.show('Error picking image.', ToastAndroid.LONG);
    }
  };

  const handleSubmit = () => {
    if (!emailError && !passwordError) {
      ToastAndroid.show('Account created successfully!', ToastAndroid.LONG);
      navigation.navigate('Home'); // Replace with your desired screen
    } else {
      ToastAndroid.show('Please fix errors before proceeding.', ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>
      <TextInput
        style={[styles.input, emailError && styles.error]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, emailError && styles.error]}
        placeholder="Confirm Email"
        value={emailConfirmation}
        onChangeText={setEmailConfirmation}
      />
      <TextInput
        style={[styles.input, passwordError && styles.error]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.input, passwordError && styles.error]}
        placeholder="Confirm Password"
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />
      <Button title="Pick Profile Photo" onPress={handleImagePicker} />
      {profilePhoto && <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />}
      <Button title="Create Account" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  error: {
    borderColor: 'red',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
    alignSelf: 'center',
  },
});

export default NewAccountScreen;
