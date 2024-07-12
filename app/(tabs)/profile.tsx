import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Switch, Text, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeContext } from '@/contexts/ThemeContext';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('John Doe');
  const [userEmail, setUserEmail] = useState<string>('john.doe@example.com');
  const [userPassword, setUserPassword] = useState<string>('********');
  
  const { theme, toggleTheme } = useThemeContext();
  const currentTheme = theme === 'light' || theme === 'dark' ? theme : 'light';

  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && 'uri' in result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpdateAccount = () => {
    // Implement account update logic here
    alert('Update Account Information');
  };

  const handleLogout = async () => {
    try {
      // Remove the authentication token
      await AsyncStorage.removeItem('authToken');
      
      // Navigate to the login screen
      router.push('LoginScreen');
      
      Alert.alert('Logged out successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to logout');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4682B4', dark: '#0F67B1' }}
      headerImage={
        profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.headerImage} />
        ) : (
          <LottieView source={require('@/assets/images/profile2.json')} style={{width: 400, height: 400 }} autoPlay loop />
          // <ThemedView style={styles.headerImage}>
          //   {/* <LottieView source={require('@/assets/images/profile_default.json')} autoPlay loop /> */}
            
          // </ThemedView>
        )
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>

      <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <MaterialCommunityIcons name="image-plus" size={50} color="skyblue" style={{borderWidth: 1, borderRadius: 100, borderColor: "skyblue",}} />
        )}
      </TouchableOpacity>

      <ThemedView style={styles.userInfo}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="book-account" size={20} color="skyblue" style={styles.icon} />
          <TextInput
            ref={nameInputRef}
            style={[styles.input, {color: Colors[currentTheme].text}]}
            placeholder="Name"
            value={userName}
            onChangeText={setUserName}
          />
          <TouchableOpacity onPress={() => nameInputRef.current?.focus()}>
            <MaterialIcons name="edit-square" size={20} color="skyblue" style={styles.editIcon} />
          </TouchableOpacity> 
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="card-account-mail" size={20} color="skyblue" style={styles.icon} />
          <TextInput
            ref={emailInputRef}
            style={[styles.input, {color: Colors[currentTheme].text}]}
            placeholder="Email"
            value={userEmail}
            onChangeText={setUserEmail}
          />
          <TouchableOpacity onPress={() => emailInputRef.current?.focus()}>
            <MaterialIcons name="edit-square" size={20} color="skyblue" style={styles.editIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-person" size={20} color="skyblue" style={styles.icon} />
          <TextInput
            ref={passwordInputRef}
            style={[styles.input, {color: Colors[currentTheme].text}]}
            placeholder="Password"
            value={userPassword}
            onChangeText={setUserPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={() => passwordInputRef.current?.focus()}>
            <MaterialIcons name="edit-square" size={20} color="skyblue" style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </ThemedView>


        <ThemedText type="subtitle">Quick Settings</ThemedText>
      <ThemedView style={styles.quickSettingsContainer}>
        <View style={styles.settingItem}>
          <MaterialIcons name="brightness-4" size={24} color="skyblue" />
          <View style={styles.settingTextContainer}>
            <ThemedText>Switch Theme</ThemedText>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
          />
        </View>
        <View style={styles.settingItem}>
          <MaterialIcons name="account-circle" size={24} color="skyblue" />
          <TouchableOpacity onPress={handleUpdateAccount} style={styles.settingTextContainer}>
            <ThemedText>Update Account Information</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItem}>
          <MaterialIcons name="logout" size={24} color="skyblue" />
          <TouchableOpacity onPress={handleLogout} style={styles.settingTextContainer}>
            <ThemedText>Logout</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({  
  headerImage: {
    bottom: -150,
    left: -50,
    position: 'absolute',
    width: 500,
    height: 500,
    backgroundColor: 'transparent',
  },
  headerIcon: {
    color: '#6A5ACD',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'skyblue',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  icon: {
    marginRight: 20,
  },
  editIcon: {
    marginLeft: 'auto',
  },
  input: {
    flex: 1,
  },
  accountButton: {
    marginVertical: 8,
  },
  quickSettingsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
});
