import { router } from 'expo-router';
import type { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';

export default function ProfilScreen(): ReactElement {
  return (
    <View style={styles.screen}>
      <HeaderBar title="Profil" />
      <View style={styles.content}>
        <Button title="Tentang" onPress={() => router.push('/tentang')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16 },
});
