import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyEmailDTO, VerifyEmailSchema } from '@/lib/validations/auth';
import { verifyEmailAPI } from '@/lib/api/auth';
import axios from 'axios';

type FormNextHref = '/sign-up' | '/sign-in' | '/forgot-password' | '/' | '';

type FormState = {
  success: boolean;
  data: VerifyEmailDTO;
  href: FormNextHref;
  errorCode?: string;
};

export function useVerifyEmailForm(defaultValues?: Partial<VerifyEmailDTO>) {
  const initialValues: VerifyEmailDTO = {
    email: '',
    code: '',
    ...defaultValues,
  };

  const [formState, setFormState] = useState<FormState>({
    success: false,
    data: initialValues,
    href: '',
    errorCode: undefined,
  });

  const form = useForm<VerifyEmailDTO>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: VerifyEmailDTO) {
    try {
      console.log('VerifyEmail Form Submitted:', values);
      await verifyEmailAPI(values);
      setFormState({ success: true, data: values, href: '', errorCode: undefined });
    } catch (error) {
      let errorCode = 'UNKNOWN_ERROR';

      if (axios.isAxiosError(error)) {
        errorCode = error.response?.data?.errorCode ?? 'UNKNOWN_AXIOS_ERROR';
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }

      setFormState({ success: false, data: initialValues, href: '', errorCode });
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    formState,
    isSubmitting: form.formState.isSubmitting,
  };
}
