import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/coresApp';

export default function Botao({ titulo, onPress, variante = 'cheio', icone, style }) {
  const estilos = { cheio: s.cheio, contorno: s.contorno, neutro: s.neutro };
  const corTexto =
    variante === 'cheio' ? cores.branco : variante === 'neutro' ? cores.texto : cores.verde;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [s.base, estilos[variante], pressed && { opacity: 0.85 }, style]}
    >
      <View style={s.linha}>
        {icone ? <Ionicons name={icone} size={20} color={corTexto} style={{ marginRight: 8 }} /> : null}
        <Text style={[s.texto, { color: corTexto }]}>{titulo}</Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  base: { height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  cheio: { backgroundColor: cores.verde },
  contorno: { backgroundColor: cores.fundoTela, borderWidth: 1.5, borderColor: cores.verde },
  neutro: { backgroundColor: cores.fundoTela, borderWidth: 1.5, borderColor: cores.borda },
  linha: { flexDirection: 'row', alignItems: 'center' },
  texto: { fontSize: 18, fontWeight: '700' },
});