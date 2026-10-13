import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores } from '../theme/coresApp';

const SEQUENCIA = 5;
const DIAS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
const ALTURAS = [0.55, 0.35, 0.85, 0.5, 1, 0.45, 0.7];

function Cartao({ titulo, valor, legenda, direita }) {
  return (
    <View style={s.cartao}>
      <View style={{ flex: 1 }}>
        <Text style={s.cartaoTitulo}>{titulo}</Text>
        <Text style={s.cartaoValor}>{valor}</Text>
        <Text style={s.cartaoLegenda}>{legenda}</Text>
      </View>
      {direita}
    </View>
  );
}

function IconeCirculo({ nome }) {
  return (
    <View style={s.circulo}>
      <Ionicons name={nome} size={26} color={cores.branco} />
    </View>
  );
}

export default function ProgressoScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const voltar = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Início');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: cores.fundoTela }}>
      <View style={[s.cabecalho, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={voltar} hitSlop={10} style={s.voltar} accessibilityLabel="Voltar">
          <Ionicons name="chevron-back" size={26} color={cores.texto} />
        </Pressable>
        <Text style={s.cabecalhoTitulo}>Meu Progresso</Text>
        <View style={s.voltar} />
      </View>

      <ScrollView contentContainerStyle={s.conteudo} showsVerticalScrollIndicator={false}>
        <View style={s.sequencia}>
          <View>
            <Text style={s.sequenciaRotulo}>Sequência Atual</Text>
            <View style={s.sequenciaLinha}>
              <Ionicons name="flame" size={32} color={cores.amarelo} />
              <Text style={s.sequenciaDias}>{SEQUENCIA} dias</Text>
            </View>
            <Text style={s.sequenciaMensagem}>Continue assim!</Text>
          </View>

          <View style={s.barras}>
            {DIAS.map((dia, i) => (
              <View key={i} style={s.colunaBarra}>
                <View style={s.areaBarra}>
                  <View style={[s.barra, { height: 14 + ALTURAS[i] * 46 }]} />
                </View>
                <Text style={s.barraDia}>{dia}</Text>
              </View>
            ))}
          </View>
        </View>

        <Cartao
          titulo="Conquistas"
          valor={
            <Text>
              12<Text style={s.valorSuave}>/20</Text>
            </Text>
          }
          legenda="conquistas desbloqueadas"
          direita={<Ionicons name="trophy" size={46} color={cores.dourado} />}
        />

        <Cartao
          titulo="Tempo de Atividade"
          valor={
            <Text>
              2<Text style={s.valorSuave}>h</Text> 45<Text style={s.valorSuave}>m</Text>
            </Text>
          }
          legenda="esta semana"
          direita={<IconeCirculo nome="time-outline" />}
        />

        <Cartao
          titulo="Exercícios Concluídos"
          valor="18"
          legenda="esta semana"
          direita={<IconeCirculo nome="checkmark" />}
        />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  voltar: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  cabecalhoTitulo: { fontSize: 18, fontWeight: '700', color: cores.texto },
  conteudo: { paddingHorizontal: 16, paddingBottom: 24 },
  sequencia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: cores.verdeEscuro,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  sequenciaRotulo: { fontSize: 13, fontWeight: '700', color: cores.branco },
  sequenciaLinha: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  sequenciaDias: { marginLeft: 6, fontSize: 26, fontWeight: '500', color: cores.amarelo },
  sequenciaMensagem: { fontSize: 13, color: cores.branco },
  barras: { flexDirection: 'row', alignItems: 'flex-end' },
  colunaBarra: { alignItems: 'center', marginLeft: 8 },
  areaBarra: { height: 62, justifyContent: 'flex-end' },
  barra: { width: 9, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.75)' },
  barraDia: { marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.8)' },
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.branco,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#0B3D1E',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cartaoTitulo: { fontSize: 13, fontWeight: '700', color: cores.texto },
  cartaoValor: { marginTop: 8, fontSize: 28, fontWeight: '500', color: cores.texto },
  valorSuave: { fontSize: 18, fontWeight: '400', color: cores.textoSuave },
  cartaoLegenda: { marginTop: 6, fontSize: 13, color: cores.textoSuave },
  circulo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: cores.verdeEscuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
});