import { router } from 'expo-router';
import type { ReactElement } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HeaderBar from '../components/HeaderBar';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

export default function TentangScreen(): ReactElement {
  const { colors } = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <HeaderBar title="Tentang" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={[TYPOGRAPHY.heading, { color: colors.primary }]}>KatalogKu</Text>
        <Text style={[TYPOGRAPHY.body, { color: colors.text }]}>Tyara Penelope</Text>
        <Text style={[TYPOGRAPHY.body, { color: colors.muted }]}>NIM: 18224122</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 8 },
});
