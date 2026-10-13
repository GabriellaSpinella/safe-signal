import React, { useState } from 'react';
import { View, Text, Image, FlatList, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores } from '../theme/coresApp';

const CATEGORIAS = ['Todos', 'Força', 'Equilíbrio', 'Alongamento'];

const EXERCICIOS = [
  {
    id: '1',
    titulo: 'Fortalecimento de Pernas',
    categoria: 'Força',
    duracao: 12,
    imagem: require('../assets/exercicio1.png'),
  },
  {
    id: '2',
    titulo: 'Equilíbrio Dinâmico',
    categoria: 'Equilíbrio',
    duracao: 10,
    imagem: require('../assets/exercicio2.png'),
  },
  {
    id: '3',
    titulo: 'Alongamento Completo',
    categoria: 'Alongamento',
    duracao: 15,
    imagem: require('../assets/exercicio3.png'),
  },
  {
    id: '4',
    titulo: 'Exercícios para Braços',
    categoria: 'Força',
    duracao: 8,
    imagem: require('../assets/exercicio4.png'),
  },
];

export default function ExerciciosScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [categoria, setCategoria] = useState('Todos');

  const lista =
    categoria === 'Todos' ? EXERCICIOS : EXERCICIOS.filter((e) => e.categoria === categoria);

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
        <Pressable onPress={voltar} hitSlop={10} style={s.botaoCabecalho} accessibilityLabel="Voltar">
          <Ionicons name="chevron-back" size={26} color={cores.texto} />
        </Pressable>
        <Text style={s.cabecalhoTitulo}>Exercícios</Text>
        <View style={s.botaoCabecalho}>
          <Ionicons name="options-outline" size={24} color={cores.texto} />
        </View>
      </View>

      <View style={{ height: 52 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.chips}
        >
          {CATEGORIAS.map((nome) => {
            const ativo = nome === categoria;
            return (
              <Pressable
                key={nome}
                onPress={() => setCategoria(nome)}
                style={[s.chip, ativo && s.chipAtivo]}
              >
                <Text style={[s.chipTexto, ativo && s.chipTextoAtivo]}>{nome}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.lista}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={s.cartao}>
            <Image source={item.imagem} style={s.foto} resizeMode="cover" />

            <View style={s.info}>
              <Text style={s.titulo} numberOfLines={2}>
                {item.titulo}
              </Text>
              <View style={s.tag}>
                <Text style={s.tagTexto}>{item.categoria}</Text>
              </View>
              <Text style={s.duracao}>{item.duracao} min</Text>
            </View>

            <Pressable style={s.play} accessibilityLabel={`Iniciar ${item.titulo}`}>
              <Ionicons name="play" size={16} color={cores.branco} style={{ marginLeft: 2 }} />
            </Pressable>
          </View>
        )}
      />
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
  botaoCabecalho: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  cabecalhoTitulo: { fontSize: 18, fontWeight: '700', color: cores.texto },
  chips: { paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' },
  chip: {
    height: 36,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    justifyContent: 'center',
    marginRight: 10,
  },
  chipAtivo: { backgroundColor: cores.verde, borderColor: cores.verde },
  chipTexto: { fontSize: 14, fontWeight: '600', color: cores.texto },
  chipTextoAtivo: { color: cores.branco },
  lista: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24 },
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.branco,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 8,
    marginBottom: 12,
    shadowColor: '#0B3D1E',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  foto: { width: 100, height: 86, borderRadius: 10 },
  info: { flex: 1, marginLeft: 12, marginRight: 8 },
  titulo: { fontSize: 15, fontWeight: '700', color: cores.texto },
  tag: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: cores.verdeClaro,
  },
  tagTexto: { fontSize: 11, fontWeight: '600', color: cores.verdeTexto },
  duracao: { marginTop: 6, fontSize: 12, color: cores.textoSuave },
  play: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: cores.verde,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
});