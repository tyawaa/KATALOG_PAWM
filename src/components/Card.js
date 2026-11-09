import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';
import formatRupiah from '../utils/formatRupiah';
import Rating from './Rating';


/**
 * @param {{
 *   title: string,
 *   price: number,
 *   image: string | import('react-native').ImageSourcePropType,
 *   onPress?: () => void,
 *   discount?: number,
 *   rating?: number,
 *   isFavorite?: boolean,
 *   onToggleFavorite?: () => void
 * }} props
 */
export default function Card({
  title,
  price,
  image,
  onPress,
  discount,
  rating,
  isFavorite = false,
  onToggleFavorite,
}) {
  const { colors } = useThemeColors();

  const rupiah = formatRupiah(price);

  const hasDiscount =
    typeof discount === 'number'
    && discount > 0
    && discount <= 100;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={onPress ? `${title}, ${rupiah}` : undefined}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed && onPress ? 0.9 : 1 })}
      >
        <View style={{ backgroundColor: colors.background }}>
          <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={styles.image}
            resizeMode="contain"
          />

          {hasDiscount ? (
            <View
              style={[
                styles.discount,
                { backgroundColor: colors.highlight },
              ]}
            >
              <Text
                style={[
                  TYPOGRAPHY.caption,
                  { color: colors.onHighlight },
                ]}
              >
                -{discount}%
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.body}>
          <Text
            numberOfLines={2}
            style={[
              styles.title,
              TYPOGRAPHY.small,
              { color: colors.text },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              TYPOGRAPHY.small,
              { color: colors.primary },
            ]}
          >
            {rupiah}
          </Text>

          {typeof rating === 'number' ? (
            <Rating value={rating} />
          ) : null}
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite
            ? `Hapus ${title} dari favorit`
            : `Tambah ${title} ke favorit`
        }
        accessibilityState={{ selected: isFavorite }}
        onPress={onToggleFavorite}
        style={[
          styles.favorite,
          { backgroundColor: colors.card },
        ]}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={22}
          color={isFavorite ? colors.accent : colors.muted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: 112,
  },
  body: {
    padding: 12,
    gap: 4,
  },
  title: {
    height: 40,
  },
  favorite: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discount: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
