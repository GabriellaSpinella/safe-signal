import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import Botao from '../components/Botao';
import { cores } from '../theme/coresApp';

export default function BoasVindasScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const larguraImagem = width - 48;
  const alturaImagem = larguraImagem * (370 / 600);

  const irParaLogin = () => navigation.navigate('Login');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundoTela }}
      contentContainerStyle={[
        s.conteudo,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 20 },
      ]}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.topo}>
        <Logo largura={240} />

        <Text style={s.titulo}>
          Exercícios seguros{'\n'}para uma vida{'\n'}
          <Text style={s.destaque}>mais ativa e saudável</Text>
        </Text>

        <Text style={s.descricao}>
          Programas de exercícios desenvolvidos especialmente para idosos, promovendo mais saúde,
          equilíbrio e qualidade de vida no conforto do seu lar.
        </Text>
      </View>

      <Image
        source={require('../assets/boas-vindas.png')}
        style={{ width: larguraImagem, height: alturaImagem, marginTop: 16 }}
        resizeMode="contain"
      />

      <View style={s.botoes}>
        <Botao titulo="Entrar" onPress={irParaLogin} />

        <View style={s.divisor}>
          <View style={s.linha} />
          <Text style={s.ou}>ou</Text>
          <View style={s.linha} />
        </View>

        <Botao titulo="Cadastrar-se" variante="contorno" onPress={irParaLogin} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  conteudo: { flexGrow: 1, paddingHorizontal: 24, alignItems: 'center' },
  topo: { alignItems: 'center' },
  titulo: {
    marginTop: 18,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: cores.texto,
    textAlign: 'center',
  },
  destaque: { color: cores.verde },
  descricao: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 21,
    color: cores.textoSuave,
    textAlign: 'center',
  },
  botoes: { width: '100%', marginTop: 'auto', paddingTop: 24 },
  divisor: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  linha: { flex: 1, height: 1, backgroundColor: cores.borda },
  ou: { marginHorizontal: 14, fontSize: 15, color: cores.textoSuave },
});