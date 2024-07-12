import React, { useState } from 'react';
import { StyleSheet, TextInput, Modal, View, TouchableOpacity, FlatList, Button } from 'react-native';
import LottieView from 'lottie-react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useTasksContext, Task } from '@/contexts/TasksContext';
import TopNav from '@/components/TopNav';
import NoTasksPlaceholder from '@/components/NoTasksPlaceholder';
import AddButton from '@/components/AddButton';
import TaskInputModal from '@/components/TaskInputModal';
import TaskItem from '@/components/TaskItem';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from '@/components/SearchBar';
import EditTaskModal from '@/components/EditTaskModal';
import DeleteTaskModal from '@/components/DeleteTaskModal';

const taskTemplates = [
  'Drink water, keep healthy',
  'Go exercising',
  'Keep reading, keep learning',
  'Go to bed early',
  'Be grateful for what you have',
];

export default function TasksScreen() {
  const { theme } = useThemeContext();
  const CurrentTheme = theme === 'light' ? 'dark' : 'light';

  const { tasks, addTask, editTask, toggleTaskCompletion, removeTask, searchTasks } = useTasksContext();

  const [newTask, setNewTask] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState<string>('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isTaskInputModalVisible, setIsTaskInputModalVisible] = useState<boolean>(false);
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState<boolean>(false);

  const handleAddTask = (task: Task) => {
    addTask(task);
    setNewTask('');
  };

  const handleEditTask = () => {
    if (editTaskId) {
      editTask(editTaskId, editTaskTitle);
      setEditTaskId(null);
      setEditTaskTitle('');
    }
  };

  const handleSearchTasks = () => {
    return searchTasks(searchQuery);
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      removeTask(taskToDelete);
      setTaskToDelete(null);
      setIsDeleteModalVisible(false);
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      item={item}
      toggleTaskCompletion={toggleTaskCompletion}
      setEditTaskId={setEditTaskId}
      setEditTaskTitle={setEditTaskTitle}
      setTaskToDelete={setTaskToDelete}
      setIsDeleteModalVisible={setIsDeleteModalVisible}
      setIsEditTaskModalVisible={setIsEditTaskModalVisible}
    />
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#7CB9E8', dark: '#82bfff' }}
      headerImage={
        <LottieView source={require('@/assets/images/no_task_placeholder.json')} style={styles.headerImage} autoPlay loop />
      }
    >
      <TopNav />
      <ThemedView style={styles.container}>
        {tasks.length === 0 ? (
          <NoTasksPlaceholder addTask={handleAddTask} />
        ) : (
          <ThemedView>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchTasks={handleSearchTasks} />
            <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => item.id} />
          </ThemedView>
        )}
        <TouchableOpacity onPress={() => setIsTaskInputModalVisible(true)}>
          <AddButton addTask={handleAddTask} />
        </TouchableOpacity>
      </ThemedView>

      <TaskInputModal
        visible={isTaskInputModalVisible}
        onClose={() => setIsTaskInputModalVisible(false)}
        onSubmit={handleAddTask}
        templates={taskTemplates}
      />

      <EditTaskModal
        isVisible={isEditTaskModalVisible}
        onClose={() => setIsEditTaskModalVisible(false)}
        taskId={editTaskId}
      />

      <DeleteTaskModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={handleDeleteTask}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 8,
  },
  headerImage: {
    height: 400,
    width: 400,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    marginBottom: 20,
    width: '80%',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalContent: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
