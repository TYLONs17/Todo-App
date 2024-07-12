import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
  const { theme } = useThemeContext();
  const currentTheme = theme === 'light' || theme === 'dark' ? theme : 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          router.push('(tabs)/create');
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const loginData = { email, password };

    axios.post('http://localhost:3000/LoginScreen', loginData).then((response) => {
      const token = response.headers['auth-token'];
      AsyncStorage.setItem('authToken', token);
      router.push('(tabs)/create');
    }).catch(error => {
      console.error(error);
      
      // Set timer for automatic login after a delay 
      const timerId = setTimeout(() => {
        router.push('(tabs)/create'); 
      }, 5000); 

      //  Clear the timer if login is successful to prevent redirection
      axios.post('http://localhost:3000/LoginScreen', loginData)
        .then(() => {
          clearTimeout(timerId); // Clear timer if login succeeds
        });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('CreateAccountScreen')}>
        <Text style={styles.link}>Create an Account</Text>
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
