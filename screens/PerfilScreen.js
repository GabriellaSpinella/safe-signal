import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Calendar from 'expo-calendar';

const colors = {
  primary: '#1F7A4D',
  primaryLight: '#E6F4EC',
  cardBg: '#FFFFFF',
  screenBg: '#F5F7F5',
  textDark: '#1A1A1A',
  textGray: '#7A8580',
  border: '#EAEFEC',
  badge: '#E63946',
};

const MENU_ITEMS = [
  {
    icon: 'person-outline',
    title: 'Dados pessoais',
    subtitle: 'Nome, data de nascimento, e-mail e telefone',
  },
  {
    icon: 'checkmark-circle-outline',
    title: 'Plano e cobertura',
    subtitle: 'Informações do seu plano de saúde',
  },
  {
    icon: 'location-outline',
    title: 'Endereços',
    subtitle: 'Endereço residencial e de correspondência',
  },
  {
    icon: 'document-text-outline',
    title: 'Histórico de saúde',
    subtitle: 'Alergias, condições e medicamentos em uso',
  },
  {
    icon: 'notifications-outline',
    title: 'Notificações',
    subtitle: 'Preferências de comunicação e alertas',
  },
  {
    icon: 'lock-closed-outline',
    title: 'Segurança',
    subtitle: 'Alterar senha e autenticação',
  },
  {
    icon: 'help-circle-outline',
    title: 'Ajuda e suporte',
    subtitle: 'Dúvidas, tutoriais e fale conosco',
  },
  {
    icon: 'log-out-outline',
    title: 'Sair',
    subtitle: 'Encerrar sua sessão',
  },
];

export default function PerfilScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  // ---- Recurso nativo 1: Câmera / Galeria (expo-image-picker) ----
  async function handlePickPhoto() {
    Alert.alert('Foto de perfil', 'Escolha de onde tirar a foto', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Tirar foto', onPress: takePhotoWithCamera },
      { text: 'Escolher da galeria', onPress: pickFromGallery },
    ]);
  }

  async function takePhotoWithCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Precisamos de acesso à câmera para tirar a foto.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function pickFromGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Precisamos de acesso às suas fotos para trocar a imagem de perfil.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  // ---- Recurso nativo 2: Agenda do dispositivo (expo-calendar) ----
  async function handleAddToCalendar() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Precisamos de acesso à sua agenda para marcar o check-up.'
      );
      return;
    }

    try {
      let calendarId;

      if (Platform.OS === 'ios') {
        const defaultCalendar = await Calendar.getDefaultCalendarAsync();
        calendarId = defaultCalendar.id;
      } else {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        const writable =
          calendars.find(
            (cal) => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
          ) || calendars[0];

        if (!writable) {
          Alert.alert('Erro', 'Nenhuma agenda disponível no dispositivo.');
          return;
        }
        calendarId = writable.id;
      }

      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 7);
      startDate.setHours(9, 0, 0);
      const endDate = new Date(startDate);
      endDate.setHours(10, 0, 0);

      await Calendar.createEventAsync(calendarId, {
        title: 'Check-up de saúde - SafeSignal',
        startDate,
        endDate,
        notes: 'Consulta de acompanhamento agendada pelo app SafeSignal.',
      });

      Alert.alert(
        'Compromisso adicionado!',
        'O check-up foi marcado na sua agenda para a próxima semana.'
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o compromisso à agenda.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="menu-outline" size={26} color={colors.textDark} />
          <View style={styles.headerTitleRow}>
            <FontAwesome5 name="heartbeat" size={18} color={colors.primary} />
            <Text style={styles.headerTitle}>SafeSignal</Text>
          </View>
          <View style={styles.bellWrapper}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.textDark}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            activeOpacity={0.7}
            onPress={handlePickPhoto}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatarPlaceholder} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={28} color={colors.textGray} />
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Maria Silva</Text>
            <Text style={styles.profileSubtitle}>56 anos · Feminino</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
        </View>

        <View style={styles.planBanner}>
          <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
          <Text style={styles.planBannerText}>
            Plano Saúde Total ·{' '}
            <Text style={styles.planBannerBold}>Titular do plano</Text>
          </Text>
        </View>

        <View style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statCard}
            activeOpacity={0.7}
            onPress={handleAddToCalendar}
          >
            <Ionicons name="heart-outline" size={20} color={colors.primary} />
            <Text style={styles.statTitle}>Saúde em dia</Text>
            <Text style={styles.statSubtitle}>Último check-up{'\n'}12/03/2024</Text>
          </TouchableOpacity>

          <View style={styles.statCard}>
            <Ionicons name="briefcase-outline" size={20} color={colors.primary} />
            <Text style={styles.statTitle}>Meta de passos</Text>
            <Text style={styles.statSubtitle}>6.482 / 10.000</Text>
          </View>

          <TouchableOpacity style={styles.statCard} activeOpacity={0.7}>
            <View style={styles.statHeaderRow}>
              <Ionicons name="trophy-outline" size={20} color={colors.primary} />
              <Ionicons
                name="chevron-forward"
                size={14}
                color={colors.textGray}
                style={styles.statChevron}
              />
            </View>
            <Text style={styles.statTitle}>Conquistas</Text>
            <Text style={styles.statSubtitle}>3 de 12</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={[
                styles.menuItem,
                index === MENU_ITEMS.length - 1 && styles.menuItemLast,
              ]}
              activeOpacity={0.6}
            >
              <View style={styles.menuIconWrapper}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.menuTextWrapper}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.textGray}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.protectedBanner}>
          <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
          <View style={styles.protectedTextWrapper}>
            <Text style={styles.protectedTitle}>Você está protegido!</Text>
            <Text style={styles.protectedSubtitle}>
              Seu plano de saúde está ativo e em dia.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  bellWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.badge,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.cardBg,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textDark,
  },
  profileSubtitle: {
    fontSize: 13,
    color: colors.textGray,
    marginTop: 2,
  },
  planBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    gap: 8,
  },
  planBannerText: {
    fontSize: 13,
    color: colors.textDark,
  },
  planBannerBold: {
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
  },
  statHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statChevron: {
    marginTop: 2,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 8,
  },
  statSubtitle: {
    fontSize: 11,
    color: colors.textGray,
    marginTop: 4,
  },
  menuCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.textGray,
    marginTop: 2,
  },
  protectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
    gap: 10,
  },
  protectedTextWrapper: {
    flex: 1,
  },
  protectedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  protectedSubtitle: {
    fontSize: 12,
    color: colors.textGray,
    marginTop: 2,
  },
});
