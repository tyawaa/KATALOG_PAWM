import { Pressable, StyleSheet, Text } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) {
  const { colors } = useThemeColors();

  const outline = variant === 'outline';
  const fill = variant === 'danger'
    ? colors.danger
    : colors.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled
            ? colors.border
            : outline
              ? colors.card
              : fill,

          borderColor: disabled ? colors.border : fill,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text
        style={[
          TYPOGRAPHY.body,
          {
            color: disabled
              ? colors.muted
              : outline
                ? colors.primary
                : colors.onPrimary,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});