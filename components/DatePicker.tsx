import React from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';

interface DatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export const DueDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onSelectDate }) => {
  return (
    <View>
      <DatePicker
        date={selectedDate || ''}
        mode="date"
        placeholder="Select Due Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => onSelectDate(new Date(date))}
      />
    </View>
  );
};
