import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/theme';

export default function PlayButton({ size = 38 }) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Svg width={size * 0.38} height={size * 0.38} viewBox="0 0 24 24" fill="none">
        <Path d="M6 4l14 8-14 8V4z" fill={colors.greenMain} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 2.4,
    borderColor: colors.greenMain,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
