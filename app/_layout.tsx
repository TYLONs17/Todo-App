import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TasksProvider } from '@/contexts/TasksContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <TasksProvider>
        <Stack
          // screenOptions={{ headerShown: false }}
          // initialRouteName="HeroScreen"
        >
          {/* <Stack.Screen name="HeroScreen" options={{ headerShown: false }} /> */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(authenticate)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </TasksProvider>
    </ThemeProvider>
  );
}
