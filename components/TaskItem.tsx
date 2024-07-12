
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Task } from '@/contexts/TasksContext';

interface TaskItemProps {
  item: Task;
  toggleTaskCompletion: (id: string) => void;
  setEditTaskId: (id: string) => void;
  setEditTaskTitle: (title: string) => void;
  setTaskToDelete: (id: string) => void;
  setIsDeleteModalVisible: (visible: boolean) => void;
  setIsEditTaskModalVisible: (visible: boolean) => void;
}

export default function TaskItem ({ item, toggleTaskCompletion, setEditTaskId, setEditTaskTitle, setTaskToDelete, setIsDeleteModalVisible,  setIsEditTaskModalVisible }: TaskItemProps) {
  const isOverdue = !item.completed && item.dueDate && new Date(item.dueDate) < new Date();
  const dueDateStyle = isOverdue ? styles.overdueTask : item.completed ? styles.completedTask : styles.taskItemDueDate;

  return (
    <ThemedView style={styles.taskItem}>
      <View style={styles.taskItemTop}>
        <View style={styles.taskItemLeft}>
          <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
            <Ionicons
              name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.completed ? 'green' : 'gray'}
            />
          </TouchableOpacity>
          <ThemedView style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <View>
              <ThemedText
                style={[
                  { textAlign: 'center', width: 200, overflow: 'hidden' },
                  item.completed ? styles.completedTask : undefined,
                ]}
                numberOfLines={1}
              >
                {item.title}
              </ThemedText>
            </View>
            <View>
              {item.subTasks && item.subTasks.length > 0 && (
                <MaterialCommunityIcons name="subdirectory-arrow-right" size={24} color="black" />
              )}
              {item.repeat && <MaterialIcons name="repeat" size={24} color="black" />}
              {item.dueDate && (
                <ThemedText style={dueDateStyle}>{new Date(item.dueDate).toLocaleString()}</ThemedText>
              )}
            </View>
          </ThemedView>
        </View>
        <View style={styles.taskItemRight}>
          <TouchableOpacity
            onPress={() => {
              setEditTaskId(item.id);
              setEditTaskTitle(item.title);
            }}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTaskToDelete(item.id);
              setIsDeleteModalVisible(true);
              setIsEditTaskModalVisible(true);
            }}
          >
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'column',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  taskItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  taskItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  overdueTask: {
    color: 'red',
  },
  taskItemDueDate: {
    color: 'black',
  },
  taskItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
