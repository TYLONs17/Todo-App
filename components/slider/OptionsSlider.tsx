
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';

interface OptionsSliderProps {
  visible: boolean;
  onClose: () => void;
}

const OptionsSlider: React.FC<OptionsSliderProps> = ({ visible, onClose }) => {
  const { theme, toggleTheme } = useThemeContext();

  // Ensure theme is either 'light' or 'dark'
  const currentTheme = theme === 'light' || theme === 'dark' ? theme : 'light';

  return (
    visible ? (
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: Colors[currentTheme].background }]}>
          <ScrollView contentContainerStyle={styles.content}>
            <ThemedText style={styles.title}>Options</ThemedText>
            <TouchableOpacity style={styles.option} onPress={toggleTheme}>
              <Ionicons name="color-palette-outline" size={24} color={Colors[currentTheme].text} />
              <ThemedText style={styles.optionText}>Change Theme</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="question-answer" size={24} color={Colors[currentTheme].text} />
              <ThemedText style={styles.optionText}>FAQ</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="feedback" size={24} color={Colors[currentTheme].text} />
              <ThemedText style={styles.optionText}>Feedback</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Ionicons name="settings-outline" size={24} color={Colors[currentTheme].text} />
              <ThemedText style={styles.optionText}>Settings</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close-circle-outline" size={28} color={Colors[currentTheme].tint} />
              <ThemedText style={styles.closeText}>Close</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    ) : null
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.taskBorder, // Using Colors.light as fallback for border color
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  closeText: {
    fontSize: 18,
    marginLeft: 10,
    color: Colors.light.tint, // Using Colors.light as fallback for close text color
  },
});

export default OptionsSlider;
