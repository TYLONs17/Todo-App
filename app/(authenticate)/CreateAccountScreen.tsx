import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export default function CreateAccountScreen() {
  const { theme, toggleTheme } = useThemeContext();
  const currentTheme = theme === 'light' || theme === 'dark' ? theme : 'light';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleCreateAccount = () => {
    const accountData = { name, email, password, confirmPassword };

    axios.post('http://localhost:3000/CreateAccountScreen', accountData).then((response) => {
      console.log(response.data);

      Alert.alert('Account created successfully');

      // empty the input fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // navigate to the Login screen
      router.push('LoginScreen');
    }).catch((error) => {
      console.log(error);
      Alert.alert('Account creation failed');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={[styles.input, {color: Colors[currentTheme].text}]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, {color: Colors[currentTheme].text}]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, {color: Colors[currentTheme].text}]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.input, {color: Colors[currentTheme].text}]}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('LoginScreen')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'skyblue',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    color: 'skyblue',
    marginTop: 10,
  },
});
