import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { DUMMY_PRODUCTS } from '../data/dummy';
import useThemeColors from '../hooks/useThemeColors';
import { loadFavorit, saveFavorit } from '../utils/favoritStorage';
import type { Product } from '../utils/product';

type FavoritState = {
  favorit: readonly Product[];
  isFavorit: (id: string) => boolean;
  toggleFavorit: (product: Product) => void;
};

const FavoritContext = createContext<FavoritState | null>(null);

/** Satu sumber favorit untuk Beranda, Detail, daftar Favorit, dan badge tab. */
export function FavoritProvider({ children }: { children: ReactNode }): ReactElement {
  const { colors } = useThemeColors();
  const [favorit, setFavorit] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [storageError, setStorageError] = useState<Error | null>(null);
  const pendingWrite = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active: boolean = true;
    loadFavorit(DUMMY_PRODUCTS).then((products: Product[]): void => {
      if (active) {
        setFavorit(products);
        setLoaded(true);
      }
    }).catch((cause: unknown): void => {
      if (active) {
        setStorageError(new Error(`Gagal memuat favorit dari penyimpanan perangkat: ${String(cause)}`, { cause }));
      }
    });
    return (): void => { active = false; };
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    // Antrean menjaga urutan penyimpanan saat beberapa favorit diubah dengan cepat.
    pendingWrite.current = pendingWrite.current.then(() => saveFavorit(favorit));
    void pendingWrite.current.catch((cause: unknown): void => {
      setStorageError(new Error(`Gagal menyimpan favorit ke penyimpanan perangkat: ${String(cause)}`, { cause }));
    });
  }, [favorit, loaded]);

  function isFavorit(id: string): boolean {
    return favorit.some((product) => product.id === id);
  }

  function toggleFavorit(product: Product): void {
    setFavorit((previous) => previous.some((item) => item.id === product.id)
      ? previous.filter((item) => item.id !== product.id)
      : [...previous, product]);
  }

  if (storageError) {
    throw storageError;
  }
  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} accessibilityLabel="Memuat favorit" />
      </View>
    );
  }

  return (
    <FavoritContext.Provider value={{ favorit, isFavorit, toggleFavorit }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorit(): FavoritState {
  const value: FavoritState | null = useContext(FavoritContext);
  if (value === null) {
    throw new Error('useFavorit harus dipakai di dalam FavoritProvider pada root aplikasi.');
  }
  return value;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
