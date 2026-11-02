import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

export default function HeaderBar({
  title,
  subtitle,
  onBack,
  includeSafeArea = true,
}) {
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColors();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          paddingTop: (includeSafeArea ? insets.top : 0) + 16,
        },
      ]}
    >
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          onPress={onBack}
          style={styles.back}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.primary}
          />
        </Pressable>
      ) : null}

      <View style={styles.copy}>
        <Text
          style={[
            TYPOGRAPHY.heading,
            { color: colors.primary },
          ]}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            style={[
              TYPOGRAPHY.small,
              { color: colors.muted },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  back: {
    width: 44,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});