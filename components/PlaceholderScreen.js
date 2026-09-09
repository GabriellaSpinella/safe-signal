import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme/theme';

export default function PlaceholderScreen({ title }) {
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.text}>{title} — em breve</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' },
  text: { ...typography.label, color: colors.inkSoft },
});
