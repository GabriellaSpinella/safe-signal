import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import CalendarStackNavigator from './CalendarStackNavigator';
import InicioScreen from '../screens/InicioScreen';
import ExerciciosScreen from '../screens/ExerciciosScreen';
import ProgressoScreen from '../screens/ProgressoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import SplashScreen from '../screens/SplashScreen';
import BoasVindasScreen from '../screens/BoasVindasScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS = {
  Início: 'home-outline',
  Exercícios: 'barbell-outline',
  Calendário: 'calendar-outline',
  Progresso: 'stats-chart-outline',
  Perfil: 'person-outline',
};

function AbasPrincipais() {
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
      <Tab.Screen name="Início" component={InicioScreen} />
      <Tab.Screen name="Exercícios" component={ExerciciosScreen} />
      <Tab.Screen name="Calendário" component={CalendarStackNavigator} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="BoasVindas" component={BoasVindasScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Principal" component={AbasPrincipais} />
    </Stack.Navigator>
  );
}