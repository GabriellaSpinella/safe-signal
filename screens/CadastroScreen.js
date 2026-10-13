import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import Botao from '../components/Botao';
import CampoTexto from '../components/CampoTexto';
import { cores } from '../theme/coresApp';

const formatarTelefone = (texto) => {
  const n = texto.replace(/\D/g, '').slice(0, 11);
  if (n.length > 7) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
  if (n.length > 2) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length > 0) return `(${n}`;
  return '';
};

const formatarData = (texto) => {
  const n = texto.replace(/\D/g, '').slice(0, 8);
  if (n.length > 4) return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
  if (n.length > 2) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return n;
};

export default function CadastroScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [senha, setSenha] = useState('');

  const criarConta = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Principal' }] });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: cores.fundoTela }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          s.conteudo,
          { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={s.topo}>
          <Logo largura={200} />
          <Text style={s.titulo}>Criar conta</Text>
          <Text style={s.subtitulo}>
            Preencha seus dados para começar{'\n'}a cuidar da sua saúde.
          </Text>
        </View>

        <View style={s.formulario}>
          <CampoTexto
            rotulo="Nome completo"
            valor={nome}
            onChangeText={setNome}
            placeholder="Seu nome"
            autoCapitalize="words"
          />

          <CampoTexto
            rotulo="E-mail"
            valor={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CampoTexto
            rotulo="Telefone"
            valor={telefone}
            onChangeText={(t) => setTelefone(formatarTelefone(t))}
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
          />

          <CampoTexto
            rotulo="Data de nascimento"
            valor={nascimento}
            onChangeText={(t) => setNascimento(formatarData(t))}
            placeholder="dd/mm/aaaa"
            keyboardType="number-pad"
          />

          <CampoTexto
            rotulo="Senha"
            valor={senha}
            onChangeText={setSenha}
            placeholder="Crie uma senha"
            senha
            autoCapitalize="none"
          />

          <Botao titulo="Criar conta" onPress={criarConta} style={{ marginTop: 6 }} />

          <View style={s.divisor}>
            <View style={s.linha} />
            <Text style={s.ou}>ou</Text>
            <View style={s.linha} />
          </View>

          <Botao
            titulo="Já tenho uma conta"
            variante="neutro"
            icone="log-in-outline"
            onPress={() => navigation.navigate('Login')}
          />
        </View>

        <Text style={s.termos}>
          Ao criar sua conta, você concorda com nossos{' '}
          <Text style={s.termosLink}>Termos de Uso e Política de Privacidade.</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  conteudo: { flexGrow: 1, paddingHorizontal: 24, alignItems: 'center' },
  topo: { alignItems: 'center' },
  titulo: { marginTop: 20, fontSize: 24, fontWeight: '700', color: cores.texto },
  subtitulo: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: cores.textoSuave,
    textAlign: 'center',
  },
  formulario: { width: '100%', marginTop: 24 },
  divisor: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  linha: { flex: 1, height: 1, backgroundColor: cores.borda },
  ou: { marginHorizontal: 14, fontSize: 14, color: cores.textoSuave },
  termos: {
    marginTop: 'auto',
    paddingTop: 28,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: cores.textoSuave,
  },
  termosLink: { color: cores.verde, fontWeight: '600' },
});