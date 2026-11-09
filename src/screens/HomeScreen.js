import { useState } from 'react';
import {
  FlatList, Image, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '../components/Card';
import CategoryChips from '../components/CategoryChips';
import CustomInput from '../components/CustomInput';
import HeaderBar from '../components/HeaderBar';
import { DUMMY_PRODUCTS } from '../data/dummy';
import useThemeColors from '../hooks/useThemeColors';
import { COLORS } from '../theme/color';
import { TYPOGRAPHY } from '../theme/typography';

const PADDING = 16;
const GAP = 12;
const categories = ['Semua', ...new Set(DUMMY_PRODUCTS.map((product) => product.category))];
const sortOptions = ['Termurah', 'Termahal'];

export default function HomeScreen() {
  const { width, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColors();
  const [contentWidth, setContentWidth] = useState(width - insets.left - insets.right);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [sort, setSort] = useState(null);
  const [favorites, setFavorites] = useState({ headphone: true, mug: true });

  const columns = width >= 768 ? 4 : width >= 500 ? 3 : 2;
  const bannerHeight = Math.max(96, Math.ceil(72 * fontScale ** 1.5) + 24);
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
            <View style={[styles.banner, { height: bannerHeight, backgroundColor: colors.primary }]}>
              <View style={[styles.bannerArt, { backgroundColor: colors.secondary }]}>
                <View style={styles.bannerImageFrame}>
                  <Image
                    source={DUMMY_PRODUCTS[0].thumbnail}
                    style={styles.bannerImage}
                    resizeMode="contain"
                    accessible={false}
                  />
                </View>
              </View>
              <View style={styles.bannerCopy}>
                <Text style={[TYPOGRAPHY.caption, { color: colors.onPrimary }]}>
                  PROMO KATALOGKU
                </Text>
                <Text style={[TYPOGRAPHY.heading, { color: colors.onPrimary }]}>Diskon 50%</Text>
                <Text style={[TYPOGRAPHY.caption, { color: colors.onPrimary }]}>
                  Untuk produk pilihan
                </Text>
              </View>
            </View>
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
  banner: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerArt: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '32%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImageFrame: {
    width: '86%',
    height: '78%',
    maxWidth: 104,
    maxHeight: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerCopy: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 16,
    right: '32%',
    justifyContent: 'center',
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
