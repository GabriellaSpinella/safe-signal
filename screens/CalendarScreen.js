import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import WeekStrip from '../components/WeekStrip';
import ExerciseCard from '../components/ExerciseCard';
import { WEEK_DAYS, getExercisesForDay } from '../data/exercises';
import { colors, radius, typography, spacing } from '../theme/theme';

const DAY_KEY_TO_ROUTE = {
  domingo: 'Domingo',
  segunda: 'Segunda',
  terca: 'Terca',
  quarta: 'Quarta',
  quinta: 'Quinta',
  sexta: 'Sexta',
  sabado: 'Sabado',
};

export default function CalendarScreen({ navigation }) {
  const today = WEEK_DAYS.find((d) => d.today) || WEEK_DAYS[0];
  const todayExercises = getExercisesForDay(today.key).slice(0, 3);

  const goToDay = (dayKey) => navigation.navigate(DAY_KEY_TO_ROUTE[dayKey]);
  const goToExercise = (exercise) => navigation.navigate('VideoPlayer', { exercise, day: today });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Meu Plano Semanal</Text>

        <WeekStrip days={WEEK_DAYS} onSelectDay={goToDay} />

        <Text style={styles.todayLabel}>
          Hoje  ·  <Text style={styles.todayBold}>{today.name}, {today.num} de maio</Text>
        </Text>

        <View style={styles.list}>
          {todayExercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} onPress={goToExercise} />
          ))}
        </View>

        <TouchableOpacity style={styles.seeAll} onPress={() => goToDay(today.key)}>
          <Text style={styles.seeAllText}>Ver todos os exercícios</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  scroll: { paddingBottom: 24 },
  title: { ...typography.title, color: colors.ink, textAlign: 'center', marginTop: 12 },
  todayLabel: {
    paddingHorizontal: spacing.xl,
    paddingTop: 18,
    paddingBottom: 6,
    fontSize: 15,
    fontWeight: '700',
    color: colors.inkSoft,
  },
  todayBold: { color: colors.ink },
  list: { paddingHorizontal: spacing.xl, gap: 16 },
  seeAll: {
    marginHorizontal: spacing.xl,
    marginTop: 22,
    backgroundColor: colors.greenMain,
    paddingVertical: 15,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  seeAllText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
