import { Dimensions, StatusBar } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const SIZE = 64;
export const INCO_SIZE = SIZE * 0.6;
export const SPACING = 12;
export const MARGIN_STATUS_BAR = StatusBar.currentHeight;

const aux = width * 0.85;

export const sizeTheme = {
  CARD_WIDTH: aux,
  CARD_HEIGHT: height * 0.8,
  RADIUS: 18,
  SPACING: SPACING,
  FULL_SIZE: aux + SPACING * 2,
  HEIGHT_MODAL_GROUP: 145.71,
}