import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../theme/theme';

// Pictogramas simples (figura de bastão) para cada categoria de exercício.
// Não dependem de nenhuma imagem externa/internet.
const ICONS = {
  respiracao: {
    cx: 32,
    cy: 15,
    r: 6.5,
    d: 'M32 21.5v13M19 44c4-6.5 8-8.5 13-8.5s9 2 13 8.5M21 51c3-3 6-4.2 11-4.2s8 1.2 11 4.2',
  },
  caminhada: {
    cx: 29,
    cy: 12,
    r: 6.5,
    d: 'M29 18.5l-2.5 15M26.5 33.5l-11 16M26.5 33.5l15 7M26.5 33.5l6-11M32.5 22.5l9 6.5',
  },
  alongamento: {
    cx: 32,
    cy: 11,
    r: 6.5,
    d: 'M32 17.5v16M32 17.5l-15-6M32 17.5l15-6M32 33.5l-9 17M32 33.5l9 17',
  },
  equilibrio: {
    cx: 32,
    cy: 11,
    r: 6.5,
    d: 'M32 17.5v14M32 21l-13-4M32 21l13 4M32 31.5v19M32 31.5l15-6.5',
  },
};

export default function ExerciseIcon({ name, size = 38, color = colors.greenDeep }) {
  const icon = ICONS[name] || ICONS.respiracao;
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle cx={icon.cx} cy={icon.cy} r={icon.r} stroke={color} strokeWidth={3.4} />
      <Path
        d={icon.d}
        stroke={color}
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
