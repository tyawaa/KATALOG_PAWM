import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import HeaderBar from '../components/HeaderBar';
import { useProfil } from '../context/ProfilContext';
import useForm from '../hooks/useForm';
import useThemeColors from '../hooks/useThemeColors';
import { TYPOGRAPHY } from '../theme/typography';
import { toProfilData } from '../utils/profil';
import { validateProfil } from '../utils/validators';
import type { ProfilValues } from '../utils/validators';

export default function EditProfilScreen(): ReactElement {
  const { colors } = useThemeColors();
  const insets = useSafeAreaInsets();
  const { profil, updateProfil } = useProfil();
  const initialValues: ProfilValues = { ...profil, password: '', ulangPassword: '' };
  const { values, errors, handleChange, handleSubmit, reset } = useForm(initialValues, validateProfil);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const active = useRef<boolean>(true);
  const incomplete: boolean = Object.values(values).some((value: string) => !value.trim());

  useEffect(() => {
    active.current = true;
    return (): void => { active.current = false; };
  }, []);

  function changeField(field: keyof ProfilValues): (text: string) => void {
    return (text: string): void => {
      setSaveError(null);
      handleChange(field)(text);
    };
  }

  function onProfilValid(data: ProfilValues): void {
    setSaving(true);
    setSaveError(null);
    void updateProfil(toProfilData(data)).then(
      (): void => {
        if (active.current) {
          Keyboard.dismiss();
          reset();
          router.dismissTo('/profil');
        }
      },
      (cause: unknown): void => {
        setSaveError(`Profil belum tersimpan: ${String(cause)}. Silakan coba simpan kembali.`);
        setSaving(false);
      },
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.column}>
        <HeaderBar title="Edit Profil" subtitle="Perbarui informasi profilmu"
          onBack={() => router.back()} />
      </View>
      <KeyboardAvoidingView style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={Platform.OS !== 'web'}>
        <ScrollView keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.column, styles.content, { paddingBottom: insets.bottom + 24 }]}>
          <CustomInput label="Nama Lengkap" placeholder="Nama lengkap"
            value={values.nama} onChangeText={changeField('nama')} error={errors.nama}
            editable={!saving} autoCapitalize="words" />
          <CustomInput label="Email" placeholder="nama@contoh.com"
            value={values.email} onChangeText={changeField('email')} error={errors.email}
            editable={!saving} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
          <CustomInput label="No. HP" placeholder="08xxxxxxxxxx"
            value={values.hp} onChangeText={changeField('hp')} error={errors.hp}
            editable={!saving} keyboardType="phone-pad" />
          <CustomInput label="Password" placeholder="Minimal 8 karakter"
            value={values.password} onChangeText={changeField('password')} error={errors.password}
            editable={!saving} secureTextEntry autoCapitalize="none" autoCorrect={false}
            helperText="Password hanya untuk latihan validasi form dan tidak disimpan." />
          <CustomInput label="Ulangi Password" placeholder="Ketik ulang password"
            value={values.ulangPassword} onChangeText={changeField('ulangPassword')}
            editable={!saving} error={errors.ulangPassword}
            secureTextEntry autoCapitalize="none" autoCorrect={false} />
          {saveError ? (
            <Text style={[TYPOGRAPHY.body, { color: colors.danger }]} accessibilityLiveRegion="polite">
              {saveError}
            </Text>
          ) : null}
          <Button title={saving ? 'Menyimpan...' : 'Simpan Profil'} disabled={incomplete || saving}
            onPress={() => handleSubmit(onProfilValid)()} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  column: { width: '100%', maxWidth: 600, alignSelf: 'center' },
  content: { padding: 16, gap: 16 },
});
