import AsyncStorage from '@react-native-async-storage/async-storage';

import { INITIAL_PROFIL } from './profil';
import type { ProfilData } from './profil';

const STORAGE_KEY: string = '@katalogku/profil';

export async function loadProfil(): Promise<ProfilData> {
  const stored: string | null = await AsyncStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    return { ...INITIAL_PROFIL };
  }

  const value: unknown = JSON.parse(stored);
  if (typeof value !== 'object' || value === null
    || !('nama' in value) || typeof value.nama !== 'string' || !value.nama.trim()
    || !('email' in value) || typeof value.email !== 'string'
    || !('hp' in value) || typeof value.hp !== 'string') {
    throw new TypeError(`Data pada ${STORAGE_KEY} harus berisi nama, email, dan nomor HP yang valid.`);
  }
  return { nama: value.nama, email: value.email, hp: value.hp };
}

export async function saveProfil(profil: ProfilData): Promise<void> {
  const data: ProfilData = { nama: profil.nama, email: profil.email, hp: profil.hp };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
