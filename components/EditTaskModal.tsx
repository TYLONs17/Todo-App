import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Modal, View, Button } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTasksContext } from '@/contexts/TasksContext';

interface EditTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  taskId: string | null;
}

export default function EditTaskModal ({ isVisible, onClose, taskId }: EditTaskModalProps) {
  const { tasks, editTask } = useTasksContext();
  const [taskTitle, setTaskTitle] = useState<string>('');

  useEffect(() => {
    if (taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setTaskTitle(task.title);
      }
    }
  }, [taskId, tasks]);

  const handleEditTask = () => {
    if (taskId) {
      editTask(taskId, taskTitle);
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.modal}>
        <ThemedView style={{ padding: 18, borderRadius: 8 }}>
          <ThemedText style={styles.modalTitle}>Edit Task</ThemedText>
          <TextInput
            style={styles.modalInput}
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <ThemedView style={styles.flexRow}>
            <Button title="Save" onPress={handleEditTask} />
            <Button title="Cancel" onPress={onClose} />
          </ThemedView>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});
