// memilih warna terang/gelap berdasarkan tema hp
import { useColorScheme } from 'react-native';
import { COLORS, DARK_COLORS } from '../theme/color';

export default function useThemeColors() {
  const isDark = useColorScheme() === 'dark';

  return {
    colors: isDark ? DARK_COLORS : COLORS,
    isDark,
  };
}