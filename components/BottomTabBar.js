import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GREEN, GRAY_TEXT, BORDER } from '../theme/theme';

const tabs = [
  { key: 'inicio', icon: 'home', label: 'Início' },
  { key: 'exercicios', icon: 'swap-horizontal', label: 'Exercícios' },
  { key: 'calendario', icon: 'calendar', label: 'Calendário' },
  { key: 'progresso', icon: 'stats-chart', label: 'Progresso' },
  { key: 'perfil', icon: 'person', label: 'Perfil' },
];

export default function BottomTabBar({ active = 'calendario' }) {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.key} style={styles.tabItem}>
          <Ionicons
            name={tab.icon}
            size={22}
            color={active === tab.key ? GREEN : GRAY_TEXT}
          />
          <Text style={[styles.tabLabel, active === tab.key && { color: GREEN }]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: GRAY_TEXT,
    marginTop: 2,
  },
});
