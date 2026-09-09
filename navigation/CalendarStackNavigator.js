import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import DomingoScreen from '../screens/DomingoScreen';
import SegundaScreen from '../screens/SegundaScreen';
import TercaScreen from '../screens/TercaScreen';
import QuartaScreen from '../screens/QuartaScreen';
import QuintaScreen from '../screens/QuintaScreen';
import SextaScreen from '../screens/SextaScreen';
import SabadoScreen from '../screens/SabadoScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator();

// [nome da rota, componente, título mostrado no cabeçalho]
const DAY_SCREENS = [
  ['Domingo', DomingoScreen, 'Domingo'],
  ['Segunda', SegundaScreen, 'Segunda-feira'],
  ['Terca', TercaScreen, 'Terça-feira'],
  ['Quarta', QuartaScreen, 'Quarta-feira'],
  ['Quinta', QuintaScreen, 'Quinta-feira'],
  ['Sexta', SextaScreen, 'Sexta-feira'],
  ['Sabado', SabadoScreen, 'Sábado'],
];

export default function CalendarStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.cream },
        headerTintColor: colors.ink,
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />

      {DAY_SCREENS.map(([name, Component, title]) => (
        <Stack.Screen key={name} name={name} component={Component} options={{ title }} />
      ))}

      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={{ title: 'Exercício' }} />
    </Stack.Navigator>
  );
}
