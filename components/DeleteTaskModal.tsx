import React from 'react';
import { StyleSheet, Modal, View, Button } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DeleteTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteTaskModal ({ isVisible, onClose, onDelete }: DeleteTaskModalProps){
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.modal}>
        <ThemedView style={{ padding: 18, borderRadius: 12 }}>
          <ThemedText style={styles.modalContent}>
            <MaterialCommunityIcons name="alert-decagram" size={24} color="red" /> 
            Are you sure you want to delete this task?
            <MaterialCommunityIcons name="alert-decagram" size={24} color="red" /> 
          </ThemedText>
          <View style={styles.modalButtonContainer}>
            <Button title="Yes" onPress={onDelete} />
            <Button title="No" onPress={onClose} />
          </View>
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
  modalContent: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
