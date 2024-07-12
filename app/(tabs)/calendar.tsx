import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import LottieView from 'lottie-react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

// Mock data for task statistics and tasks
const taskStatistics = [5, 4, 6, 3, 5, 2, 4]; // Number of tasks completed each day for the last 7 days
const upcomingTasks = [
  { id: '1', title: 'Task 1', dueDate: '2023-07-10', category: 'Work' },
  { id: '2', title: 'Task 2', dueDate: '2023-07-11', category: 'Personal' },
  
];
const pendingTasks = [
  { id: '1', title: 'Pending Task 1', category: 'Work' },
  { id: '2', title: 'Pending Task 2', category: 'Personal' },
  
];

export default function CalendarScreen() {
  const { theme } = useThemeContext();
  const [selectedDate, setSelectedDate] = useState('2023-07-01');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA07A', dark: '#FF6347' }}
      headerImage={<LottieView source={require('@/assets/images/time_shell.json')} style={styles.headerImage} autoPlay loop />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calendar</ThemedText>
      </ThemedView>
      <ThemedText style={styles.subtitle}>Manage your schedule and tasks efficiently.</ThemedText>
      
      <Calendar
        current={selectedDate}
        onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        monthFormat={'yyyy MM'}
        onMonthChange={(month: any) => console.log('month changed', month)}
        hideArrows={true}
        hideExtraDays={true}
        disablePastDays={true}
        markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: '#FFA07A' } }}
        showWeekNumbers={true}
        onVisibleMonthsChange={(months: any) => console.log('now these months are visible', months)}
        hideDayNames={true}
        horizontal={true}
        pagingEnabled={true}
        calendarWidth={320}
        theme={{
          calendarBackground: Colors[theme ?? 'light'].background,
          textSectionTitleColor: Colors[theme ?? 'light'].text,
          selectedDayBackgroundColor: Colors[theme ?? 'light'].tint,
          selectedDayTextColor: Colors[theme ?? 'light'].background,
          dayTextColor: Colors[theme ?? 'light'].text,
          todayTextColor: Colors[theme ?? 'light'].tint,
          arrowColor: Colors[theme ?? 'light'].icon,
          monthTextColor: Colors[theme ?? 'light'].text,
          indicatorColor: Colors[theme ?? 'light'].tint,
        }}
      />

      <ThemedView style={styles.taskOverviewContainer}>
        {/* First Row: Completed and Pending Tasks */}
        <ThemedView style={styles.rowContainer}>
          <ThemedView style={styles.statContainer}>
            <ThemedText style={styles.statTitle}>Completed Tasks</ThemedText>
            <ThemedText style={styles.statValue}>{taskStatistics.reduce((a, b) => a + b, 0)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statContainer}>
            <ThemedText style={styles.statTitle}>Pending Tasks</ThemedText>
            <ThemedText style={styles.statValue}>{pendingTasks.length}</ThemedText>
          </ThemedView>
        </ThemedView>

        <LottieView source={require('@/assets/images/time_management.json')} style={styles.footerImage} autoPlay loop />

        {/* Second Row: Task Completion Chart */}
        <ThemedView style={styles.chartContainer}>
          <ThemedText style={styles.chartTitle}>Daily Task Completion (Last 7 Days)</ThemedText>
          <VictoryChart>
            <VictoryAxis />
            <VictoryLine data={taskStatistics} />
          </VictoryChart>
        </ThemedView>

        
      </ThemedView>

      {/* Third Row: Upcoming Tasks */}
      <ThemedText style={styles.sectionTitle}>Upcoming Tasks (Next 7 Days)</ThemedText>
        <FlatList
          data={upcomingTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.taskItem}>
              <ThemedText style={styles.taskTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.taskDate}>{item.dueDate}</ThemedText>
              <ThemedText style={styles.taskCategory}>{item.category}</ThemedText>
            </ThemedView>
          )}
        />

        {/* Fourth Row: Pending Tasks by Category */}
        <ThemedText style={styles.sectionTitle}>Pending Tasks by Category</ThemedText>
        <FlatList
          data={pendingTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.taskItem}>
              <ThemedText style={styles.taskTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.taskCategory}>{item.category}</ThemedText>
            </ThemedView>
          )}
        />

      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 400,
    height: 400,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  subtitle: {
    padding: 16,
  },
  taskOverviewContainer: {
    padding: 16,
    marginTop: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#FFA07A',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FFA07A',
    borderRadius: 8,
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  taskItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFA07A',
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 16,
  },
  taskDate: {
    fontSize: 14,
    color: '#555',
  },
  taskCategory: {
    fontSize: 14,
    color: '#888',
  },
  footerImage: {
    width: 300,
    height: 300,
  },
});
