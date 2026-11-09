import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';

import useThemeColors from './src/hooks/useThemeColors';

/**
 * @param {{ children: import('react').ReactNode }} props
 * @returns {import('react').ReactElement}
 */
export default function App({ children }) {
  const [loaded, error] = useFonts({ Inter_400Regular, Inter_700Bold });
  const { colors, isDark } = useThemeColors();

  if (!loaded) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        {error ? (
          <Text style={{ color: colors.danger }}>
            Font tidak dapat dimuat: {error.message}
          </Text>
        ) : <ActivityIndicator color={colors.primary} />}
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView edges={['left', 'right']} style={[styles.page, { backgroundColor: colors.background }]}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
});
