import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import useThemeColors from '../hooks/useThemeColors';
import { INITIAL_PROFIL } from '../utils/profil';
import type { ProfilData } from '../utils/profil';
import { loadProfil, saveProfil } from '../utils/profilStorage';

type ProfilState = {
  profil: ProfilData;
  updateProfil: (profil: ProfilData) => Promise<void>;
};

const ProfilContext = createContext<ProfilState | null>(null);

/** Membagikan identitas tersimpan antara halaman Profil dan form Edit Profil. */
export function ProfilProvider({ children }: { children: ReactNode }): ReactElement {
  const { colors } = useThemeColors();
  const [profil, setProfil] = useState<ProfilData>({ ...INITIAL_PROFIL });
  const [loaded, setLoaded] = useState<boolean>(false);
  const [storageError, setStorageError] = useState<Error | null>(null);

  useEffect(() => {
    let active: boolean = true;
    loadProfil().then((data: ProfilData): void => {
      if (active) {
        setProfil(data);
        setLoaded(true);
      }
    }).catch((cause: unknown): void => {
      if (active) {
        setStorageError(new Error(`Gagal memuat profil dari perangkat: ${String(cause)}`, { cause }));
      }
    });
    return (): void => { active = false; };
  }, []);

  async function updateProfil(data: ProfilData): Promise<void> {
    const nextProfil: ProfilData = { nama: data.nama, email: data.email, hp: data.hp };
    await saveProfil(nextProfil);
    setProfil(nextProfil);
  }

  if (storageError) {
    throw storageError;
  }
  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} accessibilityLabel="Memuat profil" />
      </View>
    );
  }

  return (
    <ProfilContext.Provider value={{ profil, updateProfil }}>
      {children}
    </ProfilContext.Provider>
  );
}

export function useProfil(): ProfilState {
  const value: ProfilState | null = useContext(ProfilContext);
  if (value === null) {
    throw new Error('useProfil harus dipakai di dalam ProfilProvider pada root aplikasi.');
  }
  return value;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
