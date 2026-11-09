import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '../components/Button';
import Card from '../components/Card';
import CustomInput from '../components/CustomInput';
import HeaderBar from '../components/HeaderBar';
import Rating from '../components/Rating';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';

export default function ComponentDemo() {
  const { colors } = useThemeColors();
  const insets = useSafeAreaInsets();

  const [nama, setNama] = useState('');
  const [search, setSearch] = useState('');
  const [password, setPassword] = useState('');

  const [favorites, setFavorites] = useState({
    tote: false,
    headphone: true,
  });

  function toggleFavorite(key) {
    setFavorites((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  function reset() {
    setNama('');
    setSearch('');
    setPassword('');
  }

  return (
    <View
      style={[
        styles.page,
        { backgroundColor: colors.background },
      ]}
    >
      <HeaderBar
        title="KatalogKu"
        subtitle="Uji komponen Modul 3"
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <Text
          style={[
            TYPOGRAPHY.body,
            { color: colors.primary },
          ]}
        >
          Input pencarian dan profil
        </Text>

        <CustomInput
          placeholder="Cari produk..."
          icon="search"
          value={search}
          onChangeText={setSearch}
        />

        <CustomInput
          label="Nama Lengkap"
          placeholder="Tulis nama..."
          value={nama}
          onChangeText={setNama}
          error={nama.trim() ? undefined : 'Nama wajib diisi'}
        />

        <CustomInput
          label="Password"
          placeholder="Minimal 8 karakter"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          error={
            password && password.length < 8
              ? 'Password minimal 8 karakter'
              : undefined
          }
        />

        <Text
          style={[
            TYPOGRAPHY.body,
            { color: colors.primary },
          ]}
        >
          Variant tombol
        </Text>

        <Button
          title="Sapa"
          onPress={() => {
            Alert.alert(
              nama.trim() ? 'Halo' : 'Nama belum diisi',
              nama.trim() || 'Isi nama terlebih dahulu.',
            );
          }}
        />

        <Button
          title="Reset"
          variant="outline"
          onPress={reset}
        />

        <Button
          title="Hapus Favorit"
          variant="danger"
          onPress={() => {
            setFavorites({
              tote: false,
              headphone: false,
            });

            Alert.alert(
              'Favorit dihapus',
              'Kedua produk tidak lagi ditandai sebagai favorit.',
            );
          }}
        />

        <Button title="Tombol nonaktif" disabled />

        <Text
          style={[
            TYPOGRAPHY.body,
            { color: colors.primary },
          ]}
        >
          Kartu produk
        </Text>

        <View style={styles.grid}>
          <Card
            title="Tote Bag Kanvas"
            price={89000}
            image={require('../../assets/Tote.png')}
            discount={10}
            rating={4.8}
            isFavorite={favorites.tote}
            onToggleFavorite={() => toggleFavorite('tote')}
            onPress={() => {
              Alert.alert('Tote Bag Kanvas', 'Harga: Rp89.000');
            }}
          />

          <Card
            title="Headphone Nirkabel"
            price={349000}
            image={require('../../assets/Headphone.png')}
            rating={4.7}
            isFavorite={favorites.headphone}
            onToggleFavorite={() => toggleFavorite('headphone')}
            onPress={() => {
              Alert.alert(
                'Headphone Nirkabel',
                'Harga: Rp349.000',
              );
            }}
          />
        </View>

        <Text
          style={[
            TYPOGRAPHY.caption,
            { color: colors.muted },
          ]}
        >
        </Text>

        <Text
          style={[
            TYPOGRAPHY.body,
            { color: colors.primary },
          ]}
        >
          Tantangan Rating
        </Text>

        <Rating value={0} />
        <Rating value={2.5} />
        <Rating value={5} />

        <Text
          style={[
            TYPOGRAPHY.body,
            { color: colors.primary },
          ]}
        >
          Header dengan tombol kembali
        </Text>

        <HeaderBar
          title="Detail Produk"
          includeSafeArea={false}
          onBack={() => {
            Alert.alert(
              'Kembali',
              'Callback tombol kembali berhasil dipanggil.',
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
});