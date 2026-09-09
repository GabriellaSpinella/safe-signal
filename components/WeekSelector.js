import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { weekDays } from '../data/weekPlan';
import { GREEN, GRAY_TEXT, DARK_TEXT } from '../theme/theme';

export default function WeekSelector({ selectedDate }) {
  const navigation = useNavigation();

  return (
    <View style={styles.weekRow}>
      {weekDays.map((day) => {
        const isSelected = day.date === selectedDate;
        return (
          <TouchableOpacity
            key={day.date}
            style={styles.dayItem}
            onPress={() => navigation.navigate(day.screenName)}
          >
            <Text style={[styles.dayLabel, isSelected && { color: GREEN }]}>
              {day.label}
            </Text>
            <Text
              style={[
                styles.dayNumber,
                isSelected && { color: GREEN, fontWeight: 'bold' },
              ]}
            >
              {day.date}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  dayLabel: {
    fontSize: 13,
    color: GRAY_TEXT,
  },
  dayNumber: {
    fontSize: 16,
    color: DARK_TEXT,
    marginTop: 4,
  },
});
