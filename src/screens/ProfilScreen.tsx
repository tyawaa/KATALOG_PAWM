import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ReactElement } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import { useProfil } from '../context/ProfilContext';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';
import { STUDENT_IDENTITY } from '../utils/profil';

export default function ProfilScreen(): ReactElement {
  const { colors } = useThemeColors();
  const insets = useSafeAreaInsets();
  const { profil } = useProfil();

  return (
    <View style={styles.screen}>
      <View style={styles.column}>
        <HeaderBar title="Profil" subtitle="Informasi akunmu" />
      </View>
      <ScrollView contentContainerStyle={[
        styles.column, styles.content, { paddingBottom: insets.bottom + 24 },
      ]}>
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.identity}>
            <View style={[styles.avatar, { backgroundColor: colors.background }]}>
              <Ionicons name="person-outline" size={28} color={colors.primary} accessible={false} />
            </View>
            <View style={styles.identityCopy}>
              <Text style={[TYPOGRAPHY.heading, { color: colors.text }]}>{profil.nama}</Text>
              <Text style={[TYPOGRAPHY.small, { color: colors.muted }]}>
                NIM: {STUDENT_IDENTITY.nim}
              </Text>
            </View>
          </View>
          <View style={[styles.contact, { borderColor: colors.border }]}>
            <View style={styles.detail}>
              <Text style={[TYPOGRAPHY.caption, { color: colors.muted }]}>Email</Text>
              <Text style={[TYPOGRAPHY.body, { color: colors.text }]} selectable>
                {profil.email.length > 0 ? profil.email : 'Belum ditambahkan'}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={[TYPOGRAPHY.caption, { color: colors.muted }]}>No. HP</Text>
              <Text style={[TYPOGRAPHY.body, { color: colors.text }]} selectable>
                {profil.hp.length > 0 ? profil.hp : 'Belum ditambahkan'}
              </Text>
            </View>
          </View>
          <Button title="Edit Profil" onPress={() => router.push('/edit-profil')} />
        </View>

        <View style={styles.information}>
          <Text style={[TYPOGRAPHY.body, styles.sectionTitle, { color: colors.text }]}>Informasi</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tentang KatalogKu"
            onPress={() => router.push('/tentang')}
            style={({ pressed }) => [
              styles.menu,
              { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Ionicons name="information-circle-outline" size={24} color={colors.primary} accessible={false} />
            <View style={styles.identityCopy}>
              <Text style={[TYPOGRAPHY.body, { color: colors.text }]}>Tentang KatalogKu</Text>
              <Text style={[TYPOGRAPHY.caption, { color: colors.muted }]}>
                Informasi aplikasi dan pengembang
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} accessible={false} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  column: { width: '100%', maxWidth: 600, alignSelf: 'center' },
  content: { padding: 16, gap: 24 },
  profileCard: { borderWidth: 1, borderRadius: 16, padding: 20, gap: 20 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  identityCopy: { flex: 1, minWidth: 0, gap: 4 },
  contact: { borderTopWidth: 1, paddingTop: 20, gap: 16 },
  detail: { gap: 4 },
  information: { gap: 12 },
  sectionTitle: { fontFamily: TYPOGRAPHY.heading.fontFamily },
  menu: { minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderRadius: 12, padding: 16 },
});
