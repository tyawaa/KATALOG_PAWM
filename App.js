import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import { COLORS, DARK_COLORS } from './src/theme/color';

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = isDark ? DARK_COLORS : COLORS;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.primary }]}>
        KatalogKu
      </Text>

      <Text style={[styles.sub, { color: colors.muted }]}>
        Setup berhasil!
      </Text>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  sub: {
    marginTop: 8,
    fontSize: 15,
  },
});