export type ProfilValues = {
  nama: string;
  email: string;
  hp: string;
  password: string;
  ulangPassword: string;
};

export type FormErrors<Values> = Partial<{ [Field in keyof Values]: string }>;

/** Mengembalikan pesan per field tanpa mengubah nilai form. */
export function validateProfil(values: ProfilValues): FormErrors<ProfilValues> {
  return {
    ...(!values.nama.trim() ? { nama: 'Nama wajib diisi' } : {}),
    ...(!/^\S+@\S+\.\S+$/.test(values.email)
      ? { email: 'Format email tidak valid' } : {}),
    ...(!/^08\d{8,11}$/.test(values.hp)
      ? { hp: 'No. HP diawali 08, total 10-13 digit' } : {}),
    ...(values.password.length < 8
      ? { password: 'Password minimal 8 karakter' } : {}),
    ...(!values.ulangPassword
      ? { ulangPassword: 'Ulangi password wajib diisi' }
      : values.ulangPassword !== values.password
        ? { ulangPassword: 'Ulangi password harus sama dengan password' } : {}),
  };
}
