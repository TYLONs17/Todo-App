import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, Easing, withRepeat } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

import TaskInputModal from '@/components/TaskInputModal';
import { ThemedView } from './ThemedView';
import { Task } from '@/contexts/TasksContext';

interface AddButtonProps {
  addTask: (task: Task) => void;
}

export default function AddButton({ addTask }: AddButtonProps) {
  const wave = useSharedValue(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    wave.value = withRepeat(
      withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -0.3,   
      true
    );
  }, [wave]);

  const waveStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: wave.value }],
    };
  });

  const handlePress = () => {
    wave.value = withSequence(
      withTiming(1.2, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
    );
    setIsModalVisible(true);
  };

  const handleAddTask = (task: Task) => {
    addTask(task);
    setIsModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View style={[styles.waveIcon, waveStyle]}>
          <AntDesign name="pluscircle" size={44} color="#3698ff" />
        </Animated.View>
      </TouchableOpacity>

      <TaskInputModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddTask}
        templates={[]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  waveIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
