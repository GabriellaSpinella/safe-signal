import React from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import { cores } from '../theme/coresApp';

const NOME = 'Maria Silva';
const META_SEMANAL = 75;

const ATALHOS = [
  { rotulo: 'Exercícios', icone: 'barbell-outline', destino: 'Exercícios' },
  { rotulo: 'Calendário', icone: 'calendar-outline', destino: 'Calendário' },
  { rotulo: 'Progresso', icone: 'stats-chart-outline', destino: 'Progresso' },
  { rotulo: 'Perfil', icone: 'person-outline', destino: 'Perfil' },
];

function LinkVer({ texto, onPress }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={s.linkVer}>
      <Text style={s.linkVerTexto}>{texto}</Text>
      <Ionicons name="chevron-forward" size={16} color={cores.verde} />
    </Pressable>
  );
}

function Anel({ percentual }) {
  const tamanho = 54;
  const espessura = 5;
  const raio = (tamanho - espessura) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const centro = tamanho / 2;

  return (
    <View style={{ width: tamanho, height: tamanho, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={tamanho} height={tamanho}>
        <Circle
          cx={centro}
          cy={centro}
          r={raio}
          stroke={cores.verdeClaro}
          strokeWidth={espessura}
          fill="none"
        />
        <Circle
          cx={centro}
          cy={centro}
          r={raio}
          stroke={cores.verde}
          strokeWidth={espessura}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={circunferencia * (1 - percentual / 100)}
          rotation="-90"
          origin={`${centro}, ${centro}`}
        />
      </Svg>
      <Text style={s.anelTexto}>{percentual}%</Text>
    </View>
  );
}

function ItemProgresso({ icone, valor, rotulo, divisor, peso = 1 }) {
  return (
    <View style={[s.itemProgresso, { flex: peso }, divisor && s.itemDivisor]}>
      <Ionicons name={icone} size={24} color={cores.verde} />
      <Text style={s.itemValor}>{valor}</Text>
      <Text style={s.itemRotulo}>{rotulo}</Text>
    </View>
  );
}

export default function InicioScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundoTela }}
      contentContainerStyle={[s.conteudo, { paddingTop: insets.top + 12 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.cabecalho}>
        <View style={s.cabecalhoEsquerda}>
          <Ionicons name="menu" size={30} color={cores.texto} />
          <Logo largura={140} style={{ marginLeft: 12 }} />
        </View>

        <Pressable onPress={() => navigation.navigate('Perfil')} style={s.perfil}>
          <View style={s.avatar}>
            <Ionicons name="person" size={28} color={cores.verde} />
          </View>
          <Ionicons name="chevron-forward" size={20} color={cores.texto} />
        </Pressable>
      </View>

      <Text style={s.saudacao}>Olá, {NOME}</Text>
      <View style={s.saudacaoLinha}>
        <Text style={s.saudacaoSub}>Que bom te ver por aqui!</Text>
        <Ionicons name="heart-outline" size={20} color={cores.verde} style={{ marginLeft: 6 }} />
      </View>

      <View style={s.planoCartao}>
        <View style={s.planoTextos}>
          <View style={s.planoRotuloLinha}>
            <Ionicons name="heart" size={16} color={cores.verde} />
            <Text style={s.planoRotulo}>Seu plano de hoje</Text>
          </View>

          <Text style={s.planoTitulo}>Movimente-se com segurança e propósito</Text>

          <View style={s.planoMeta}>
            <View style={s.metaItem}>
              <Ionicons name="time-outline" size={14} color={cores.verde} />
              <Text style={s.metaTexto}>30min</Text>
            </View>
            <View style={[s.metaItem, { marginLeft: 12 }]}>
              <Ionicons name="bar-chart" size={14} color={cores.verde} />
              <Text style={s.metaTexto}>Nível iniciante</Text>
            </View>
          </View>

          <Pressable
            onPress={() => navigation.navigate('Calendário')}
            style={({ pressed }) => [s.planoBotao, pressed && { opacity: 0.85 }]}
          >
            <Text style={s.planoBotaoTexto}>Ver meu plano</Text>
            <Ionicons name="arrow-forward" size={16} color={cores.branco} style={{ marginLeft: 8 }} />
          </Pressable>
        </View>

        <Image
          source={require('../assets/plano-hoje.png')}
          style={s.planoFoto}
          resizeMode="cover"
        />
      </View>

      <View style={s.atalhos}>
        {ATALHOS.map((atalho) => (
          <Pressable
            key={atalho.rotulo}
            onPress={() => navigation.navigate(atalho.destino)}
            style={({ pressed }) => [s.atalho, pressed && { opacity: 0.85 }]}
          >
            <Ionicons name={atalho.icone} size={28} color={cores.verde} />
            <Text style={s.atalhoTexto} numberOfLines={1}>
              {atalho.rotulo}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={s.secao}>
        <Text style={s.secaoTitulo}>Meu progresso</Text>
        <LinkVer texto="Ver detalhes" onPress={() => navigation.navigate('Progresso')} />
      </View>

      <View style={s.progressoCartao}>
        <ItemProgresso icone="footsteps-outline" valor="12 dias" rotulo="Sequência atual" peso={1.1} />
        <ItemProgresso icone="time-outline" valor="2h 20m" rotulo="Esta semana" divisor />
        <ItemProgresso
          icone="trophy-outline"
          valor="18"
          rotulo="Exercícios concluídos"
          divisor
          peso={1.2}
        />
        <View style={[s.itemProgresso, s.itemDivisor, { flex: 1 }]}>
          <Anel percentual={META_SEMANAL} />
          <Text style={[s.itemRotulo, { marginTop: 6 }]}>Meta semanal</Text>
        </View>
      </View>

      <View style={s.motivacao}>
        <Ionicons name="heart" size={26} color={cores.verde} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={s.motivacaoTitulo}>Você está indo muito bem!</Text>
          <Text style={s.motivacaoTexto}>
            Pequenos hábitos geram grandes resultados. Continue assim!
          </Text>
        </View>
        <Ionicons name="trending-up" size={38} color={cores.verde} />
        <Ionicons name="chevron-forward" size={18} color={cores.textoSuave} style={{ marginLeft: 8 }} />
      </View>

      <View style={s.secao}>
        <Text style={s.secaoTitulo}>Seu próximo exercício</Text>
        <LinkVer texto="Ver tudo" onPress={() => navigation.navigate('Exercícios')} />
      </View>

      <Pressable
        onPress={() => navigation.navigate('Exercícios')}
        style={({ pressed }) => [s.proximo, pressed && { opacity: 0.9 }]}
      >
        <Image source={require('../assets/exercicio3.png')} style={s.proximoFoto} resizeMode="cover" />
        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text style={s.proximoTitulo}>Alongamento para o corpo todo</Text>
          <View style={[s.planoMeta, { marginTop: 8 }]}>
            <View style={s.metaItem}>
              <Ionicons name="time-outline" size={14} color={cores.verde} />
              <Text style={s.metaTexto}>15min</Text>
            </View>
            <View style={[s.metaItem, { marginLeft: 12 }]}>
              <Ionicons name="bar-chart" size={14} color={cores.verde} />
              <Text style={s.metaTexto}>Nível iniciante</Text>
            </View>
          </View>
        </View>
        <Ionicons name="play-circle-outline" size={42} color={cores.verde} />
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  conteudo: { paddingHorizontal: 16, paddingBottom: 24 },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cabecalhoEsquerda: { flexDirection: 'row', alignItems: 'center' },
  perfil: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: cores.verdeClaro,
    borderWidth: 2,
    borderColor: cores.branco,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  saudacao: { marginTop: 20, fontSize: 28, fontWeight: '500', color: cores.texto },
  saudacaoLinha: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  saudacaoSub: { fontSize: 15, color: cores.textoSuave },
  planoCartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.verdeCard,
    borderRadius: 20,
    padding: 16,
    marginTop: 18,
  },
  planoTextos: { flex: 1, paddingRight: 8 },
  planoRotuloLinha: { flexDirection: 'row', alignItems: 'center' },
  planoRotulo: { marginLeft: 6, fontSize: 12, fontWeight: '600', color: cores.verdeTexto },
  planoTitulo: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
    color: cores.texto,
  },
  planoMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaTexto: { marginLeft: 4, fontSize: 11, color: cores.texto },
  planoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 14,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: cores.verde,
  },
  planoBotaoTexto: { fontSize: 14, fontWeight: '600', color: cores.branco },
  planoFoto: { width: 116, height: 116, borderRadius: 14 },
  atalhos: { flexDirection: 'row', marginTop: 16 },
  atalho: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 14,
    backgroundColor: cores.verdeCard,
  },
  atalhoTexto: { marginTop: 8, fontSize: 11, fontWeight: '500', color: cores.verde },
  secao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 10,
  },
  secaoTitulo: { fontSize: 17, fontWeight: '700', color: cores.texto },
  linkVer: { flexDirection: 'row', alignItems: 'center' },
  linkVerTexto: { fontSize: 13, fontWeight: '500', color: cores.verde },
  progressoCartao: {
    flexDirection: 'row',
    backgroundColor: cores.branco,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 14,
  },
  itemProgresso: { paddingHorizontal: 10, justifyContent: 'center' },
  itemDivisor: { borderLeftWidth: 1, borderLeftColor: cores.borda },
  itemValor: { marginTop: 8, fontSize: 15, fontWeight: '500', color: cores.texto },
  itemRotulo: { marginTop: 2, fontSize: 10, color: cores.textoSuave },
  anelTexto: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '600',
    color: cores.texto,
  },
  motivacao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.verdeCard,
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
  },
  motivacaoTitulo: { fontSize: 15, fontWeight: '700', color: cores.verde },
  motivacaoTexto: { marginTop: 4, fontSize: 12, lineHeight: 17, color: cores.textoSuave },
  proximo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.branco,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 8,
  },
  proximoFoto: { width: 96, height: 72, borderRadius: 12 },
  proximoTitulo: { fontSize: 14, fontWeight: '500', color: cores.texto },
});