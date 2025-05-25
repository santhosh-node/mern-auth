import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordDTO, ResetPasswordSchema } from '@/lib/validations/auth';
import { resetPasswordAPI } from '@/lib/api/auth';
import axios from 'axios';

type FormNextHref = '/sign-up' | '/sign-in' | '/forgot-password' | '/' | '';

type FormState = {
  success: boolean;
  data: ResetPasswordDTO;
  href: FormNextHref;
  errorCode?: string;
};

export function useResetPasswordForm(defaultValues?: Partial<ResetPasswordDTO>) {
  const initialValues: ResetPasswordDTO = {
    email: '',
    code: '',
    newPassword: '',
    ...defaultValues,
  };

  const [formState, setFormState] = useState<FormState>({
    success: false,
    data: initialValues,
    href: '',
    errorCode: undefined,
  });

  const form = useForm<ResetPasswordDTO>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: ResetPasswordDTO) {
    try {
      console.log('Reset Password Form Submitted:', values);
      await resetPasswordAPI(values);
      setFormState({ success: true, data: values, href: '/sign-in', errorCode: undefined });
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
