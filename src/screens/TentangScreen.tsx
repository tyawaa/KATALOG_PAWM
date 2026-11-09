import { router } from 'expo-router';
import type { ReactElement } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HeaderBar from '../components/HeaderBar';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';
import { STUDENT_IDENTITY } from '../utils/profil';

export default function TentangScreen(): ReactElement {
  const { colors } = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <HeaderBar title="Tentang" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={[TYPOGRAPHY.heading, { color: colors.primary }]}>KatalogKu</Text>
        <Text style={[TYPOGRAPHY.body, { color: colors.text }]}>{STUDENT_IDENTITY.nama}</Text>
        <Text style={[TYPOGRAPHY.body, { color: colors.muted }]}>NIM: {STUDENT_IDENTITY.nim}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 8 },
});
