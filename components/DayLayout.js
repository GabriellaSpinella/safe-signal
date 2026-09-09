import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WeekSelector from './WeekSelector';
import ExerciseCard from './ExerciseCard';
import BottomTabBar from './BottomTabBar';
import { GREEN, DARK_TEXT, GRAY_TEXT } from '../theme/theme';
import { TODAY_DATE } from '../data/weekPlan';

export default function DayLayout({ date, fullDate, exercises }) {
  const navigation = useNavigation();
  const isToday = date === TODAY_DATE;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color={DARK_TEXT} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Plano Semanal</Text>
          <View style={{ width: 26 }} />
        </View>

        <WeekSelector selectedDate={date} />

        <Text style={styles.todayLabel}>
          {isToday ? 'Hoje . ' : ''}
          {fullDate}
        </Text>

        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} onPress={() => {}} />
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum exercício cadastrado pra esse dia ainda.</Text>
        )}

        <TouchableOpacity style={styles.allButton}>
          <Text style={styles.allButtonText}>Ver todos os exercícios</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomTabBar active="calendario" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: DARK_TEXT },
  todayLabel: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  emptyText: {
    paddingHorizontal: 16,
    color: GRAY_TEXT,
    fontStyle: 'italic',
  },
  allButton: {
    backgroundColor: GREEN,
    marginHorizontal: 16,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  allButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
