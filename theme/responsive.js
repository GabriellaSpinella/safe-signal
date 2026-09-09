import { Dimensions, PixelRatio } from 'react-native';

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

function getDimensions() {
  return Dimensions.get('window');
}

export function scaleWidth(size) {
  const { width } = getDimensions();
  const scale = width / BASE_WIDTH;
  // Limita a escala entre 0.85x e 1.3x pra não ficar minúsculo nem gigante
  const clampedScale = Math.min(Math.max(scale, 0.85), 1.3);
  return clampedScale * size;
}

export function scaleHeight(size) {
  const { height } = getDimensions();
  const scale = height / BASE_HEIGHT;
  const clampedScale = Math.min(Math.max(scale, 0.85), 1.3);
  return clampedScale * size;
}

export function scaleFont(size) {
  const newSize = scaleWidth(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function useScreenDimensions() {
  const { width, height } = getDimensions();
  return { SCREEN_WIDTH: width, SCREEN_HEIGHT: height };
}
