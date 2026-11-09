import { useState } from 'react';

import type { FormErrors } from '../utils/validators';

type FormState<Values> = {
  values: Values;
  errors: FormErrors<Values>;
  handleChange: (field: keyof Values) => (text: string) => void;
  handleSubmit: (onValid: (values: Values) => void) => () => void;
  reset: () => void;
};

/** Memisahkan state input, validasi saat submit, dan reset dari tampilan form. */
export default function useForm<Values extends { [Field in keyof Values]: string }>(
  initialValues: Values,
  validate: (values: Values) => FormErrors<Values>,
): FormState<Values> {
  const [values, setValues] = useState<Values>({ ...initialValues });
  const [errors, setErrors] = useState<FormErrors<Values>>({});

  function handleChange(field: keyof Values): (text: string) => void {
    return (text: string): void => {
      setValues((previous) => ({ ...previous, [field]: text }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    };
  }

  function handleSubmit(onValid: (data: Values) => void): () => void {
    return (): void => {
      const nextErrors: FormErrors<Values> = validate(values);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length === 0) {
        onValid({ ...values });
      }
    };
  }

  function reset(): void {
    setValues({ ...initialValues });
    setErrors({});
  }

  return { values, errors, handleChange, handleSubmit, reset };
}
