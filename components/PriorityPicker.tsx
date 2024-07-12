import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface PriorityPickerProps {
  selectedPriority: 'low' | 'medium' | 'high';
  onSelectPriority: (priority: 'low' | 'medium' | 'high') => void;
}

export const PriorityPicker: React.FC<PriorityPickerProps> = ({ selectedPriority, onSelectPriority }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelectPriority('low')} style={[styles.button, selectedPriority === 'low' && styles.selected]}>
        <ThemedText>Low</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectPriority('medium')} style={[styles.button, selectedPriority === 'medium' && styles.selected]}>
        <ThemedText>Medium</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectPriority('high')} style={[styles.button, selectedPriority === 'high' && styles.selected]}>
        <ThemedText>High</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#007AFF',
  },
});
