// @ts-check
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { useFavorit } from '../context/FavoritContext';
import useThemeColors from '../hooks/useThemeColors';

/** @returns {import('react').ReactElement} */
export default function TabNavigator() {
  const { colors } = useThemeColors();
  const { favorit } = useFavorit();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
      sceneStyle: { backgroundColor: colors.background },
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Beranda',
        tabBarIcon: ({ focused, size }) => <Ionicons name="home" color={focused ? colors.primary : colors.muted} size={size} />,
      }} />
      <Tabs.Screen name="favorit" options={{
        title: 'Favorit',
        tabBarBadge: favorit.length || undefined,
        tabBarIcon: ({ focused, size }) => <Ionicons name="heart" color={focused ? colors.primary : colors.muted} size={size} />,
      }} />
      <Tabs.Screen name="keranjang" options={{
        title: 'Keranjang',
        tabBarIcon: ({ focused, size }) => <Ionicons name="cart" color={focused ? colors.primary : colors.muted} size={size} />,
      }} />
      <Tabs.Screen name="profil" options={{
        title: 'Profil',
        tabBarIcon: ({ focused, size }) => <Ionicons name="person" color={focused ? colors.primary : colors.muted} size={size} />,
      }} />
    </Tabs>
  );
}
