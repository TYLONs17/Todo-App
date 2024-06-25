import React, { useState } from 'react';
import { Image, StyleSheet, Platform, TouchableOpacity, TextInput, FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const addTask = (
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  newTask: string,
  setNewTask: React.Dispatch<React.SetStateAction<string>>
) => {
  if (newTask.trim()) {
    setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
    setNewTask('');
  }
};

const toggleTaskCompletion = (
  taskId: string,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  setTasks(tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  ));
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#007AFF', dark: '#777AFF' }}
      headerImage={
        <Image 
          source={require('@/assets/images/stm_logo_2-removebg-preview.png')}
          style={styles.MainLogo}
        />
      }>
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
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Stay Focused</ThemedText>
        <ThemedText>
          Use our focus mode to minimize distractions and get more done.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.button} onPress={() => addTask(tasks, setTasks, newTask, setNewTask)}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <ThemedText style={styles.buttonText}>Add New Task</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id, tasks, setTasks)}>
              <Ionicons
                name={item.completed ? "checkmark-circle-outline" : "ellipse-outline"}
                size={24}
                color={item.completed ? "green" : "grey"}
              />
            </TouchableOpacity>
            <ThemedText style={item.completed ? styles.completedTask : null}>{item.text}</ThemedText>
          </ThemedView>
        )}
      />
      
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
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
});
