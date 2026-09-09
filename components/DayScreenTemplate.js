import React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import ExerciseCard from './ExerciseCard';
import { getDayByKey, getExercisesForDay } from '../data/exercises';
import { colors, radius, typography, spacing } from '../theme/theme';

export default function DayScreenTemplate({ dayKey, navigation }) {
  const day = getDayByKey(dayKey);
  const exercises = getExercisesForDay(dayKey);
  const totalMinutes = exercises.reduce((sum, ex) => sum + parseInt(ex.duration, 10), 0);

  const openExercise = (exercise) => {
    navigation.navigate('VideoPlayer', { exercise, day });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <Text style={styles.heroName}>
            {day.name}, {day.num} de maio
          </Text>
          <Text style={styles.heroSub}>Seu plano de hoje foi pensado para o seu ritmo</Text>
          <Text style={styles.heroCount}>
            {exercises.length} exercícios · aprox. {totalMinutes} min no total
          </Text>
        </View>

        <View style={styles.list}>
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} onPress={openExercise} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  scroll: { paddingBottom: 24 },
  hero: {
    margin: spacing.lg,
    backgroundColor: colors.greenDeep,
    borderRadius: radius.lg,
    padding: 20,
  },
  heroName: { ...typography.heading, color: '#fff' },
  heroSub: { fontSize: 13, fontWeight: '600', color: '#fff', opacity: 0.85, marginTop: 4 },
  heroCount: { fontSize: 12.5, fontWeight: '700', color: '#fff', opacity: 0.9, marginTop: 14 },
  list: { paddingHorizontal: spacing.lg, gap: 16 },
});
