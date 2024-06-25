import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function profile() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#87CEEB', dark: '#4682B4' }}
      headerImage={<Ionicons size={310} name="person-circle" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <ThemedText>Your personal task manager.</ThemedText> 
      <Collapsible title="Task Management">
        <ThemedText>
          Keep track of your tasks with ease. Add, edit, and delete tasks as your schedule changes.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Daily Goals">
        <ThemedText>
          Set daily goals and track your progress. Stay motivated by achieving your daily targets.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Performance Analysis">
        <ThemedText>
          Analyze your performance over time. Use insights to improve your productivity.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Settings">
        <ThemedText>
          Customize your profile settings for a personalized task management experience.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}



const styles = StyleSheet.create({
    headerImage: {
      color: '#6A5ACD',
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
});