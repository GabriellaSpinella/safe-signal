import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ExerciseIcon from './ExerciseIcon';
import PlayButton from './PlayButton';
import { colors, radius, typography } from '../theme/theme';
import { scaleWidth } from '../theme/responsive';

export default function ExerciseCard({ exercise, onPress }) {
  // Se a foto real falhar ao carregar (ex: sem internet), volta pro pictograma.
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = exercise.image && !imageFailed;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => onPress?.(exercise)}>
      <View style={[styles.thumb, { backgroundColor: exercise.bg }]}>
        {showPhoto ? (
          <Image
            source={{ uri: exercise.image }}
            style={styles.thumbImage}
            resizeMode="cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ExerciseIcon name={exercise.icon} size={scaleWidth(38)} />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {exercise.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{exercise.level}</Text>
          <Text style={styles.metaText}>{exercise.duration}</Text>
        </View>
      </View>

      <PlayButton size={38} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.cardBg,
    borderRadius: radius.md,
    padding: 10,
    shadowColor: colors.greenDeep,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  info: { flex: 1 },
  title: { ...typography.cardTitle, color: colors.greenDeep, lineHeight: 19 },
  meta: { flexDirection: 'row', gap: 14, marginTop: 6 },
  metaText: { ...typography.meta, color: colors.inkSoft },
});
