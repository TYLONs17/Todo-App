import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LottieView from 'lottie-react-native';
import { Task } from '@/contexts/TasksContext';

interface NoTasksPlaceholderProps {
  addTask: (task: Task) => void;
}

export default function NoTasksPlaceholder({ addTask }: NoTasksPlaceholderProps) {
  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      completed: false,
      priority: 'medium',
      dueDate: null,
      category: '',
    };
    addTask(newTask);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.placeholderContainer}>
        <LottieView
          source={require('@/assets/images/not_found.json')}
          style={{ width: 500, height: 500 }}
          autoPlay
          loop
        />
      </ThemedView>
      <ThemedText>No tasks available. Create your first task!</ThemedText>
      {/* <TouchableOpacity onPress={handleAddTask}>
        <Text>Add Task</Text>
      </TouchableOpacity> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    padding: 20,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    paddingRight: 50,
    marginBottom: 15,
  },
  waveIconContainer: {
    marginTop: 80,
  },
});
