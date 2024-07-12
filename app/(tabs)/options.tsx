import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { View, Text } from 'react-native';

export default function OptionsScreen() {
  return (
    <ThemedView>
      <ThemedText>Escaped options Screen</ThemedText>
      <ThemedText>Your not supposed to see me, so pretend yu didn't!😅</ThemedText>
    </ThemedView>
  );
};