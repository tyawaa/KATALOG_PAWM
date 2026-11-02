import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

export default function CustomInput({
  label,
  error,
  helperText,
  icon,
  secureTextEntry = false,
  onFocus,
  onBlur,
  style,
  ...inputProps
}) {
  const { colors } = useThemeColors();

  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[TYPOGRAPHY.small, { color: colors.text }]}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.field,
          {
            backgroundColor: colors.card,
            borderColor: error
              ? colors.danger
              : focused
                ? colors.primary
                : colors.border,
          },
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color={colors.muted}
          />
        ) : null}

        <TextInput
          {...inputProps}
          accessibilityLabel={
            inputProps.accessibilityLabel
            || label
            || inputProps.placeholder
          }
          placeholderTextColor={colors.muted}
          selectionColor={colors.primary}
          secureTextEntry={secureTextEntry && !visible}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          style={[
            styles.input,
            TYPOGRAPHY.body,
            { color: colors.text },
            style,
          ]}
        />

        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              visible
                ? 'Sembunyikan password'
                : 'Tampilkan password'
            }
            onPress={() => setVisible((previous) => !previous)}
            style={styles.toggle}
          >
            <Ionicons
              name={visible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.muted}
            />
          </Pressable>
        ) : null}
      </View>

      {error || helperText ? (
        <Text
          style={[
            TYPOGRAPHY.caption,
            { color: error ? colors.danger : colors.muted },
          ]}
        >
          {error || helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  field: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    paddingVertical: 0,
  },
  toggle: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});