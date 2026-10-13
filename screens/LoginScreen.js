import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import Botao from '../components/Botao';
import CampoTexto from '../components/CampoTexto';
import { cores } from '../theme/coresApp';

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const entrar = () => {
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
          { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={s.topo}>
          <Logo largura={220} />
          <Text style={s.titulo}>Bem-vindo(a)!</Text>
          <Text style={s.subtitulo}>
            Faça login para continuar{'\n'}cuidando da sua saúde.
          </Text>
        </View>

        <View style={s.formulario}>
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
            rotulo="Senha"
            valor={senha}
            onChangeText={setSenha}
            placeholder="••••••••"
            senha
            autoCapitalize="none"
          />

          <Pressable
            onPress={() => setMensagem('A recuperação de senha ainda não está disponível.')}
            style={s.esqueceu}
          >
            <Text style={s.esqueceuTexto}>Esqueceu sua senha?</Text>
          </Pressable>

          {mensagem ? <Text style={s.mensagem}>{mensagem}</Text> : null}

          <Botao titulo="Entrar" onPress={entrar} style={{ marginTop: 8 }} />

          <View style={s.divisor}>
            <View style={s.linha} />
            <Text style={s.ou}>ou</Text>
            <View style={s.linha} />
          </View>

          <Botao
            titulo="Criar nova conta"
            variante="neutro"
            icone="person-add-outline"
            onPress={() => navigation.navigate('Cadastro')}
          />
        </View>

        <Text style={s.termos}>
          Ao continuar, você concorda com nossos{' '}
          <Text style={s.termosLink}>Termos de Uso e Política de Privacidade.</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  conteudo: { flexGrow: 1, paddingHorizontal: 24, alignItems: 'center' },
  topo: { alignItems: 'center' },
  titulo: { marginTop: 24, fontSize: 24, fontWeight: '700', color: cores.texto },
  subtitulo: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: cores.textoSuave,
    textAlign: 'center',
  },
  formulario: { width: '100%', marginTop: 28 },
  esqueceu: { alignSelf: 'flex-end', marginBottom: 14 },
  esqueceuTexto: { fontSize: 13, fontWeight: '600', color: cores.verde },
  mensagem: { color: cores.textoSuave, fontSize: 14, marginBottom: 10, textAlign: 'center' },
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