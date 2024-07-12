import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, Text, Button, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Task } from '@/contexts/TasksContext';
import { ThemedView } from './ThemedView';

interface TaskInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  templates: string[];
}

export default function TaskInputModal({ visible, onClose, onSubmit, templates }: TaskInputModalProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [subTasks, setSubTasks] = useState<string[]>(['']);
  const [template, setTemplate] = useState('');

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, '']);
  };

  const handleSubTaskChange = (text: string, index: number) => {
    const newSubTasks = [...subTasks];
    newSubTasks[index] = text;
    setSubTasks(newSubTasks);
  };

  const handleSubmit = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      completed: false,
      priority: 'medium',
      dueDate: date,
      category,
    };
    onSubmit(task);
    onClose();
  };

  const handleTemplateSelect = (itemValue: string) => {
    setTemplate(itemValue);
    setTaskTitle(itemValue);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <ThemedView style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Task</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons name="create" size={24} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <MaterialIcons name="category" size={24} color="black" style={styles.icon} />
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="No Category" value="No Category" />
              <Picker.Item label="Work" value="Work" />
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Wishlist" value="Wishlist" />
              <Picker.Item label="+ Create New" value="Create New" style={{ color: "blue" }} />
            </Picker>
          </View>

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputContainer}>
            <Ionicons name="calendar-number" size={24} color="black" style={styles.icon} />
            <Text style={styles.dateText}>{date.toLocaleDateString()}          @{date.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          
          <DateTimePicker
            isVisible={showDatePicker}
            mode="datetime"
            onConfirm={(selectedDate) => {
              setShowDatePicker(false);
              setDate(selectedDate || new Date());
            }}
            onCancel={() => setShowDatePicker(false)}
          />
          
          {subTasks.map((subTask, index) => (
            <View key={index} style={styles.inputContainer}>
              <MaterialCommunityIcons name="file-tree" size={24} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={`Sub Task ${index + 1}`}
                value={subTask}
                onChangeText={(text) => handleSubTaskChange(text, index)}
              />
            </View>
          ))}
          
          <Button title="Add Sub Task" onPress={handleAddSubTask} />
          
          <View style={styles.inputContainer}>
            <MaterialIcons name="view-list" size={24} color="black" style={styles.icon} />
            <Picker
              selectedValue={template}
              onValueChange={handleTemplateSelect}
              style={styles.picker}
            >
              <Picker.Item label="Pick a template" value="" />
              {templates.map((template, index) => (
                <Picker.Item key={index} label={template} value={template} />
              ))}
            </Picker>
          </View>
          
          <Button title="Submit" onPress={handleSubmit} />
          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="closecircle" size={24} color="red" />
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginTop: 60,
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 400,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  dateText: {
    fontSize: 16,
    flex: 1,
  },
  picker: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
