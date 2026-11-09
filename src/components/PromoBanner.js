import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../theme/color';
import { TYPOGRAPHY } from '../theme/typography';

/** @returns {import('react').ReactElement} */
export default function PromoBanner() {
  return (
    <View style={styles.banner}>
      <View pointerEvents="none" style={styles.accent} />
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>PROMO KATALOGKU</Text>
        <Text style={styles.title}>Diskon 50%</Text>
        <Text style={styles.description}>Untuk produk pilihan</Text>
      </View>
      <View
        pointerEvents="none"
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.artworkContainer}
      >
        <View style={styles.artwork}>
          <Ionicons name="star" size={18} color={COLORS.highlight} style={styles.star} />
          <View style={styles.shadow} />
          <View style={styles.bagOutline} />
          <View style={styles.bagFill} />
          <View style={styles.handle} />
          <View style={styles.label}>
            <View style={styles.labelLine} />
            <View style={[styles.labelLine, styles.shortLine]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    minHeight: 96,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
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
    width: '68%',
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
  artworkContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 12,
    width: '27%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  artwork: {
    width: 112,
    height: 80,
  },
  star: {
    position: 'absolute',
    left: 0,
    top: 10,
  },
  shadow: {
    position: 'absolute',
    left: 42,
    top: 66,
    width: 66,
    height: 5,
    borderRadius: 33,
    backgroundColor: '#DCC69D',
  },
  bagOutline: {
    position: 'absolute',
    left: 48,
    top: 24,
    width: 54,
    borderTopWidth: 44,
    borderTopColor: '#A68B5A',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  bagFill: {
    position: 'absolute',
    left: 50,
    top: 26,
    width: 50,
    borderTopWidth: 40,
    borderTopColor: '#E8D2AA',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  handle: {
    position: 'absolute',
    left: 60,
    top: 1,
    width: 30,
    height: 28,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: '#A68B5A',
  },
  label: {
    position: 'absolute',
    left: 62,
    top: 45,
    width: 26,
    height: 15,
    paddingHorizontal: 5,
    justifyContent: 'center',
    gap: 2,
    backgroundColor: COLORS.secondary,
  },
  labelLine: {
    width: 15,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: COLORS.onPrimary,
  },
  shortLine: {
    width: 10,
  },
});
