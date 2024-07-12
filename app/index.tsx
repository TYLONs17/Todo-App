import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Pressable, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HelloWave from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useThemeContext } from '@/contexts/ThemeContext';
// import { useTasksContext } from '@/contexts/TasksContext';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';


export default function HeroScreen() {
  const {theme} = useThemeContext();
  const currentTheme = theme === 'light' || theme === 'dark' ? theme : 'light';

  // Animation setup
  const bounceValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const bounce = () => {
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
      ]).start(() => bounce());
    };
    bounce();
  }, [bounceValue]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#007AFF', dark: '#777AFF' }}
      headerImage={ <LottieView source={require('@/assets/images/task_management.json')} style={styles.headerImage} autoPlay loop /> }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to your SimpliTaskMaster!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Manage your tasks efficiently with the following features:
      </ThemedText>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Organize Your Tasks</ThemedText>
        <ThemedText>
          Easily add, edit, and delete tasks to keep track of what needs to be done.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Track Your Progress</ThemedText>
        <ThemedText>
          Mark tasks as complete and see your progress at a glance.
        </ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={[styles.input, {color: Colors[currentTheme].text}]}
            placeholder="Enter new task"
            // value={newTask}
            editable={false}
            // onChangeText={setNewTask}
          />
          <TouchableOpacity style={styles.button}onPress={() => router.push('LoginScreen')} >
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <ThemedText style={styles.buttonText}>Add New Task</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <View style={styles.placeholderContainer}>
          <Pressable onPress={() => router.push('LoginScreen')}>
            <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
              <ThemedText style={styles.callToAction}>Let's get started!</ThemedText>
            </Animated.View>
          </Pressable>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );  
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  MainLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  callToAction: {
    marginTop: 36,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  headerImage: {
    bottom: -150,
    left: -50,
    position: 'absolute',
    width: 500,
    height: 500,
  },
  
});
