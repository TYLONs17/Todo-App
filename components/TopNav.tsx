import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import OptionsButton from './OptionsButton';

export default function TopNav() {
  return (
    <ThemedView style={styles.container}>
      <Pressable style={styles.button}>
        <ThemedText>All</ThemedText>
      </Pressable>
      <Pressable style={styles.button}>
        <ThemedText>Work</ThemedText>
      </Pressable>
      <Pressable style={styles.button}>
        <ThemedText>Personal</ThemedText>
      </Pressable>
      <Pressable style={[styles.button, { marginRight: 'auto' }]}>
        <ThemedText>Wishlist</ThemedText>
      </Pressable>
      <OptionsButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7CB9E8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});