import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/theme';

export default function WeekStrip({ days, onSelectDay }) {
  return (
    <View style={styles.row}>
      {days.map((d) => (
        <TouchableOpacity key={d.key} style={styles.col} onPress={() => onSelectDay(d.key)}>
          <Text style={[styles.letter, d.today && styles.letterActive]}>{d.letter}</Text>
          <View style={[styles.numCircle, d.today && styles.numCircleActive]}>
            <Text style={[styles.num, d.today && styles.numActive]}>{d.num}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 4,
  },
  col: { flex: 1, alignItems: 'center', gap: 6 },
  letter: { fontSize: 13, fontWeight: '700', color: colors.inkSoft },
  letterActive: { color: colors.greenMain },
  numCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numCircleActive: { backgroundColor: colors.greenMain },
  num: { fontSize: 15, fontWeight: '800', color: colors.ink },
  numActive: { color: '#fff' },
});
