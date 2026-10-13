import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ActivityIndicator, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import { cores } from '../theme/coresApp';

const TEMPO_DE_CARREGAMENTO = 2500; // em milissegundos

export default function SplashScreen({ navigation }) {
  const opacidade = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacidade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(escala, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();

    // replace = tira a splash do histórico (o botão voltar não retorna pra ela)
    const timer = setTimeout(() => {
      navigation.replace('BoasVindas');
    }, TEMPO_DE_CARREGAMENTO);

    return () => clearTimeout(timer);
  }, [navigation, opacidade, escala]);

  return (
    <View style={s.container}>
      <Animated.View style={{ opacity: opacidade, transform: [{ scale: escala }] }}>
        <Logo largura={280} />
      </Animated.View>

      <View style={s.carregando}>
        <ActivityIndicator size="large" color={cores.verde} />
        <Text style={s.texto}>Iniciando o aplicativo...</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundoTela,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carregando: { position: 'absolute', bottom: 90, alignItems: 'center' },
  texto: { marginTop: 14, fontSize: 15, color: cores.textoSuave },
});