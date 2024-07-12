import React, { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

export default function OptionsButton () {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      <Pressable onPress={handleOpenModal}>
        <SimpleLineIcons name="options-vertical" size={30} color="#3698ff" />
      </Pressable>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.overlay} onPress={handleCloseModal}>
          <ThemedView style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => { /* action here */ }}>
              <ThemedText>Manage Categories</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { /* action here */ }}>
              <ThemedText>Search</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { /* action here */ }}>
              <ThemedText>Sort by</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    // backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    minWidth: 200,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});