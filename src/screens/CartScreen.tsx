import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

export default function CartScreen(): ReactElement {
  const { colors } = useThemeColors();

  return (
    <View style={styles.screen}>
      <HeaderBar title="Keranjang" />
      <Text style={[TYPOGRAPHY.body, styles.message, { color: colors.muted }]}>
        Belum ada produk di keranjang.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  message: { padding: 16 },
});
