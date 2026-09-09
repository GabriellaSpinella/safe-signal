import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CalendarStackNavigator from './CalendarStackNavigator';
import PlaceholderScreen from '../components/PlaceholderScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Início: 'home-outline',
  Exercícios: 'barbell-outline',
  Calendário: 'calendar-outline',
  Progresso: 'stats-chart-outline',
  Perfil: 'person-outline',
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.greenMain,
        tabBarInactiveTintColor: colors.inkSoft,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Início">{() => <PlaceholderScreen title="Início" />}</Tab.Screen>
      <Tab.Screen name="Exercícios">{() => <PlaceholderScreen title="Exercícios" />}</Tab.Screen>
      <Tab.Screen name="Calendário" component={CalendarStackNavigator} />
      <Tab.Screen name="Progresso">{() => <PlaceholderScreen title="Progresso" />}</Tab.Screen>
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
