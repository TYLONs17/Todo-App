import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TabBarIcon, TabBarIconMC } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useThemeContext } from '@/contexts/ThemeContext';
import OptionsSlider from '@/components/slider/OptionsSlider';
import { ThemedView } from '@/components/ThemedView';

export default function TabLayout() {
  const { theme } = useThemeContext();
  const [optionsVisible, setOptionsVisible] = useState(false);

  const currentTheme = theme === 'light' || theme === 'dark' ? theme : 'light';

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[currentTheme].tint,
          tabBarStyle: {
            backgroundColor: Colors[currentTheme].background,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="options"
          options={{
            title: 'Options',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'options' : 'options-outline'} color={color} />
            ),
            tabBarButton: (props: BottomTabBarButtonProps) => (
              <TouchableOpacity
                {...props}
                onPress={() => setOptionsVisible(true)}
              >
                <ThemedView style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <TabBarIcon
                    name={props.accessibilityState?.selected ? 'options' : 'options-outline'}
                    color={props.accessibilityState?.selected ? Colors[currentTheme].tint : Colors[currentTheme].tabIconDefault}
                  />
                </ThemedView>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'compass' : 'compass-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create Task',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIconMC name={focused ? 'notebook-plus' : 'notebook-plus-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
      <OptionsSlider visible={optionsVisible} onClose={() => setOptionsVisible(false)} />
    </>
  );
}
