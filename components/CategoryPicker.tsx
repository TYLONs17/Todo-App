import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface CategoryPickerProps {
  selectedCategory: string;
  categories: string[];
  onSelectCategory: (category: string) => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({ selectedCategory, categories, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity key={category} onPress={() => onSelectCategory(category)} style={[styles.button, selectedCategory === category && styles.selected]}>
          <ThemedText>{category}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 4,
  },
  selected: {
    backgroundColor: '#007AFF',
  },
});
