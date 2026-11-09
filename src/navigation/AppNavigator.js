// @ts-check
import { Stack } from 'expo-router';

import useThemeColors from '../hooks/useThemeColors';

/**
 * Stack aplikasi: tab utama, detail produk, Edit Profil, dan Tentang.
 * @returns {import('react').ReactElement}
 */
export default function AppNavigator() {
  const { colors } = useThemeColors();

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="detail/[id]" />
      <Stack.Screen name="edit-profil" />
      <Stack.Screen name="tentang" />
    </Stack>
  );
}
