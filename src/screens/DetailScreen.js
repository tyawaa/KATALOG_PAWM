// @ts-check
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import Rating from '../components/Rating';
import { DUMMY_PRODUCTS } from '../data/dummy';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';
import formatRupiah from '../utils/formatRupiah';

export default function DetailScreen() {
  const { colors } = useThemeColors();
  const insets = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useLocalSearchParams();
  const product = DUMMY_PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.screen}>
        <HeaderBar title="Produk tidak ditemukan" onBack={() => router.back()} />
        <Text style={[TYPOGRAPHY.body, styles.scroll, { color: colors.danger }]}>
          Produk dengan ID {String(id)} tidak tersedia. Kembali dan pilih produk dari Beranda.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <HeaderBar title={product.title} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <Image
            source={product.thumbnail}
            style={styles.image}
            resizeMode="contain"
            accessible
            accessibilityLabel={product.title}
          />
          <View style={[styles.category, { backgroundColor: colors.highlight }]}>
            <Text style={[TYPOGRAPHY.caption, { color: colors.onHighlight }]}>
              {product.category}
            </Text>
          </View>
          <Text style={[TYPOGRAPHY.heading, { color: colors.text }]}>{product.title}</Text>
          <Text style={[TYPOGRAPHY.heading, { color: colors.primary }]}>
            {formatRupiah(product.price)}
          </Text>
          <Rating value={product.rating} />
          <Text style={[
            TYPOGRAPHY.body,
            styles.descriptionTitle,
            { color: colors.primary },
          ]}>
            Tentang produk
          </Text>
          <Text style={[TYPOGRAPHY.body, { color: colors.muted }]}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={[
        styles.footer,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          paddingBottom: 12 + insets.bottom,
        },
      ]}>
        <View style={styles.content}>
          <Button
            title={isFavorite ? 'Tersimpan di Favorit' : 'Tambah ke Favorit'}
            variant={isFavorite ? 'outline' : 'primary'}
            onPress={() => setIsFavorite((current) => !current)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
    gap: 8,
  },
  image: {
    width: '100%',
    maxWidth: 328,
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 16,
  },
  category: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  descriptionTitle: {
    marginTop: 8,
    fontFamily: TYPOGRAPHY.heading.fontFamily,
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});