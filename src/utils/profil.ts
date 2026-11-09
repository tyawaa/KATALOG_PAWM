import type { ProfilValues } from './validators';

export type ProfilData = {
  nama: string;
  email: string;
  hp: string;
};

export const STUDENT_IDENTITY: { readonly nama: string; readonly nim: string } = {
  nama: 'Tyara Penelope',
  nim: '18224122',
};

export const INITIAL_PROFIL: ProfilData = {
  nama: STUDENT_IDENTITY.nama,
  email: '',
  hp: '',
};

/** Mengambil data identitas dari form; kedua field password tidak ikut disimpan. */
export function toProfilData(values: ProfilValues): ProfilData {
  return { nama: values.nama.trim(), email: values.email.trim(), hp: values.hp.trim() };
}
