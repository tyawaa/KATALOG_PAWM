import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './src/theme/color';
export default function App() {
return (
<View style={styles.container}>
<Text style={styles.title}>KatalogKu</Text>
<Text style={styles.sub}>Setup berhasil!</Text>
<StatusBar style="auto" />
</View>
);
}
const styles = StyleSheet.create({
container: { flex: 1, alignItems: 'center',
justifyContent: 'center', backgroundColor: COLORS.background },
title: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary },
sub: { marginTop: 8, color: COLORS.muted },
});
