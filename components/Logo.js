import React from 'react';
import { Image } from 'react-native';

export default function Logo({ largura = 260, style }) {
  return (
    <Image
      source={require('../assets/logo.png')}
      style={[{ width: largura, height: largura * (110 / 380) }, style]}
      resizeMode="contain"
      accessibilityLabel="SafeSignal"
    />
  );
}