import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Product } from './product';

const STORAGE_KEY: string = '@katalogku/favorit';

function isProductIdList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((id: unknown) => typeof id === 'string');
}

/** Menyimpan ID agar referensi gambar lokal tidak ikut dipersistenkan. */
export async function saveFavorit(favorit: readonly Product[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorit.map((product) => product.id)));
}

/** Memvalidasi data tersimpan dan menghubungkannya kembali dengan katalog. */
export async function loadFavorit(catalog: readonly Product[]): Promise<Product[]> {
  const stored: string | null = await AsyncStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    return [];
  }

  const ids: unknown = JSON.parse(stored);
  if (!isProductIdList(ids)) {
    throw new TypeError(`Data favorit pada ${STORAGE_KEY} harus berupa daftar ID produk.`);
  }
  if (new Set(ids).size !== ids.length) {
    throw new TypeError(`Data favorit pada ${STORAGE_KEY} mengandung ID produk duplikat.`);
  }

  return ids.map((id: string): Product => {
    const product: Product | undefined = catalog.find((item) => item.id === id);
    if (!product) {
      throw new RangeError(`Produk dengan ID ${id} pada ${STORAGE_KEY} tidak ditemukan di katalog.`);
    }
    return product;
  });
}
