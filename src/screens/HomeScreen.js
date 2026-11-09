import { useState } from 'react';
import {
  FlatList, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '../components/Card';
import CategoryChips from '../components/CategoryChips';
import CustomInput from '../components/CustomInput';
import HeaderBar from '../components/HeaderBar';
import PromoBanner from '../components/PromoBanner';
import { DUMMY_PRODUCTS } from '../data/dummy';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

const PADDING = 16;
const GAP = 12;
const categories = ['Semua', ...new Set(DUMMY_PRODUCTS.map((product) => product.category))];
const sortOptions = ['Termurah', 'Termahal'];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColors();
  const [contentWidth, setContentWidth] = useState(width - insets.left - insets.right);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [sort, setSort] = useState(null);
  const [favorites, setFavorites] = useState({ headphone: true, mug: true });

  const columns = width >= 768 ? 4 : width >= 500 ? 3 : 2;
  const cardWidth = Math.max(0, (contentWidth - 2 * PADDING - (columns - 1) * GAP) / columns);
  const keyword = query.trim().toLowerCase();
  const products = DUMMY_PRODUCTS.filter((product) =>
    (category === 'Semua' || product.category === category)
    && product.title.toLowerCase().includes(keyword)
  );

  if (sort) {
    products.sort((first, second) => sort === 'Termurah'
      ? first.price - second.price
      : second.price - first.price);
  }

  return (
    <View style={styles.screen} onLayout={(event) => setContentWidth(event.nativeEvent.layout.width)}>
      <HeaderBar title="KatalogKu" subtitle="Temukan produk favoritmu" />

      <FlatList
        key={columns}
        data={products}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingBottom: 24 + insets.bottom }]}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <View style={styles.header}>
            <CustomInput
              placeholder="Cari produk..."
              icon="search"
              value={query}
              onChangeText={setQuery}
              autoCorrect={false}
            />
            <CategoryChips items={categories} selected={category} onSelect={setCategory} />
            <View style={styles.sort}>
              <Text style={[TYPOGRAPHY.caption, { color: colors.primary }]}>Urutkan</Text>
              <CategoryChips
                items={sortOptions}
                selected={sort}
                onSelect={(option) => setSort((current) => current === option ? null : option)}
              />
            </View>
            <PromoBanner />
            <Text style={[TYPOGRAPHY.body, styles.sectionTitle, { color: colors.primary }]}>
              Pilihan untukmu
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty} accessibilityLiveRegion="polite">
            <Text style={[TYPOGRAPHY.body, { color: colors.text }]}>Produk tidak ditemukan</Text>
            <Text style={[TYPOGRAPHY.caption, { color: colors.muted }]}>
              Coba kata kunci atau kategori lain.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.cardCell, { width: cardWidth }]}>
            <Card
              title={item.title}
              price={item.price}
              image={item.thumbnail}
              isFavorite={Boolean(favorites[item.id])}
              onToggleFavorite={() => setFavorites((current) => ({
                ...current,
                [item.id]: !current[item.id],
              }))}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: PADDING,
  },
  header: {
    gap: GAP,
    marginBottom: GAP,
  },
  sort: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.heading.fontFamily,
  },
  row: {
    gap: GAP,
    marginBottom: GAP,
  },
  cardCell: {
    flexDirection: 'row',
  },
  empty: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 24,
  },
});
