import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Calendar } from 'react-native-calendars';

export default function calendar() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA07A', dark: '#FF6347' }}
      headerImage={<Ionicons size={310} name="calendar" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calendar</ThemedText>
      </ThemedView>
      <ThemedText>Manage your schedule and tasks efficiently.</ThemedText> 
      <Collapsible title="Event Management">
        <ThemedText>
          Easily add, edit, and delete events. Sync with external calendars for a comprehensive view.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Reminders">
        <ThemedText>
          Set reminders for your events so you never miss an important task or meeting.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Day, Week, and Month Views">
        <ThemedText>
          Switch between different calendar views to get a better overview of your schedule.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Sharing and Collaboration">
        <ThemedText>
          Share your calendar with others and collaborate on planning events and meetings.
        </ThemedText>
      </Collapsible>

      <Calendar
        // Initial date to be shown in the calendar
        current={'2023-04-01'}
        // Handler for when a date is pressed
        onDayPress={(day) => {
            console.log('selected day', day);
        }}
        // Month format in calendar title
        monthFormat={'yyyy MM'}
        // Handler for when the month changes in calendar
        onMonthChange={(month) => {
            console.log('month changed', month);
        }}
        // Hide month navigation arrows
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => (<Arrow />)}
        // Do not show users other months
        hideExtraDays={true}
        // Disable days before today
        disablePastDays={true}
        // Mark today with a custom color
        markedDates={{
            '2023-04-16': {selected: true, marked: true, selectedColor: 'blue'},
        }}
        // Show week numbers to the left
        showWeekNumbers={true}
        // Handler for when the visible month changes in calendar
        onVisibleMonthsChange={(months) => {
            console.log('now these months are visible', months);
        }}
        // Hide day names
        hideDayNames={true}
        // Show the calendar as a horizontal strip
        horizontal={true}
        // Enable paging on horizontal, default = false
        pagingEnabled={true}
        // Set custom calendarWidth.
        calendarWidth={320}
        />

    </ParallaxScrollView>
  );
}



const styles = StyleSheet.create({
    headerImage: {
      color: '#FF4500',
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
  });