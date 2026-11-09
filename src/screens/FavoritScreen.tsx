import { router } from 'expo-router';
import type { ReactElement } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '../components/Card';
import HeaderBar from '../components/HeaderBar';
import { useFavorit } from '../context/FavoritContext';
import useProductGrid, { PRODUCT_GRID_GAP, PRODUCT_GRID_PADDING } from '../hooks/useProductGrid';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

export default function FavoritScreen(): ReactElement {
  const { colors } = useThemeColors();
  const { favorit, isFavorit, toggleFavorit } = useFavorit();
  const { columns, cardWidth, onLayout } = useProductGrid();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen} onLayout={onLayout}>
      <HeaderBar title="Favorit" subtitle={`${favorit.length} produk`} />
      <FlatList
        key={columns}
        data={favorit}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={[TYPOGRAPHY.body, styles.message, { color: colors.muted }]}
            accessibilityLiveRegion="polite">
            Belum ada produk favorit. Ketuk ikon hati di Beranda atau tambah dari Detail.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.cell, { width: cardWidth }]}>
            <Card
              title={item.title}
              price={item.price}
              image={item.thumbnail}
              isFavorite={isFavorit(item.id)}
              onToggleFavorite={() => toggleFavorit(item)}
              onPress={() => router.push({ pathname: '/detail/[id]', params: { id: item.id } })}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: { paddingHorizontal: PRODUCT_GRID_PADDING },
  row: { gap: PRODUCT_GRID_GAP, marginBottom: PRODUCT_GRID_GAP },
  cell: { flexDirection: 'row' },
  message: { textAlign: 'center', paddingVertical: 32 },
});
