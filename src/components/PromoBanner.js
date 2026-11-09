import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { COLORS } from '../theme/color';
import { TYPOGRAPHY } from '../theme/typography';

/** @returns {import('react').ReactElement} */
export default function PromoBanner() {
  const { fontScale } = useWindowDimensions();
  const bannerHeight = Math.max(96, Math.ceil(96 * fontScale ** 1.5));

  return (
    <View style={[styles.banner, { height: bannerHeight }]}>
      <View pointerEvents="none" style={styles.accent} />
      <Image
        source={require('../../assets/promo-bag.png')}
        resizeMode="contain"
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.artwork}
      />
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>PROMO KATALOGKU</Text>
        <Text style={styles.title}>Diskon 50%</Text>
        <Text style={styles.description}>Untuk produk pilihan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
  },
  accent: {
    position: 'absolute',
    top: -24,
    bottom: -24,
    right: -10,
    width: '36%',
    backgroundColor: COLORS.secondary,
    transform: [{ skewX: '-20deg' }],
  },
  copy: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    left: 18,
    right: '32%',
    zIndex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  eyebrow: {
    ...TYPOGRAPHY.caption,
    fontFamily: TYPOGRAPHY.heading.fontFamily,
    color: COLORS.highlight,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  title: {
    ...TYPOGRAPHY.heading,
    color: COLORS.onPrimary,
    fontSize: 28,
    lineHeight: 34,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.onPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  artwork: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 12,
    width: 112,
    height: '100%',
  },
});
