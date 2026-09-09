import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { colors, typography, spacing } from '../theme/theme';

// Vídeo de exemplo — troque por um vídeo real do exercício (local ou remoto).
const PLACEHOLDER_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoPlayerScreen({ route }) {
  const { exercise, day } = route.params || {};
  const source = exercise?.videoUrl || PLACEHOLDER_VIDEO;

  const player = useVideoPlayer(source, (p) => {
    p.loop = false;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <VideoView style={styles.video} player={player} allowsFullscreen nativeControls />

      <View style={styles.info}>
        <Text style={styles.title}>{exercise?.title ?? 'Exercício'}</Text>
        <Text style={styles.meta}>
          {exercise?.level} · {exercise?.duration}
          {day ? ` · ${day.name}` : ''}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  video: { width: '100%', height: 240, backgroundColor: '#000' },
  info: { padding: spacing.xl },
  title: { ...typography.heading, color: colors.greenDeep },
  meta: { ...typography.label, color: colors.inkSoft, marginTop: 8 },
});
