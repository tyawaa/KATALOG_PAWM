import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

export default function Rating({ value = 0 }) {
  const { colors } = useThemeColors();

  const safeValue = Number.isFinite(value)
    ? Math.min(5, Math.max(0, value))
    : 0;

  const stars = Math.round(safeValue * 2) / 2;

  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`Rating ${safeValue} dari 5`}
    >
      <View style={styles.stars}>
        {[0, 1, 2, 3, 4].map((index) => (
          <Ionicons
            key={index}
            name={
              stars >= index + 1
                ? 'star'
                : stars > index
                  ? 'star-half'
                  : 'star-outline'
            }
            size={14}
            color={colors.highlight}
          />
        ))}
      </View>

      <Text
        style={[
          TYPOGRAPHY.caption,
          { color: colors.muted },
        ]}
      >
        {safeValue.toFixed(1).replace('.', ',')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
  },
});