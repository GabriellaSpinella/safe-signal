import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/coresApp';

export default function CampoTexto({
  rotulo,
  valor,
  onChangeText,
  placeholder,
  senha = false,
  style,
  ...resto
}) {
  const [oculta, setOculta] = useState(true);

  return (
    <View style={[s.grupo, style]}>
      <Text style={s.rotulo}>{rotulo}</Text>
      <View style={s.caixa}>
        <TextInput
          style={s.input}
          value={valor}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A3ADA8"
          secureTextEntry={senha && oculta}
          {...resto}
        />
        {senha ? (
          <Pressable
            onPress={() => setOculta(!oculta)}
            hitSlop={10}
            style={s.olho}
            accessibilityLabel={oculta ? 'Mostrar senha' : 'Ocultar senha'}
          >
            <Ionicons
              name={oculta ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={cores.textoSuave}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  grupo: { width: '100%', marginBottom: 14 },
  rotulo: { fontSize: 14, fontWeight: '700', color: cores.texto, marginBottom: 6 },
  caixa: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    backgroundColor: cores.branco,
  },
  input: { flex: 1, height: '100%', paddingHorizontal: 14, fontSize: 16, color: cores.texto },
  olho: { paddingHorizontal: 14, height: '100%', justifyContent: 'center' },
});