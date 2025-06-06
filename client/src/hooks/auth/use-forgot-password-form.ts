import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordDTO, ForgotPasswordSchema } from '@/lib/validations/auth';
import { forgotPasswordAPI } from '@/lib/api/auth';
import axios from 'axios';

type FormNextHref = '/sign-up' | '/sign-in' | '/forgot-password' | '/' | '';

type FormState = {
  success: boolean;
  data: ForgotPasswordDTO;
  href: FormNextHref;
  errorCode?: string;
};

export function useForgotPasswordForm(defaultValues?: Partial<ForgotPasswordDTO>) {
  const initialValues: ForgotPasswordDTO = {
    email: '',
    ...defaultValues,
  };

  const [formState, setFormState] = useState<FormState>({
    success: false,
    data: initialValues,
    href: '',
    errorCode: undefined,
  });

  const form = useForm<ForgotPasswordDTO>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: ForgotPasswordDTO) {
    try {
      console.log('Forgot Password Form Submitted:', values);
      await forgotPasswordAPI(values);
      setFormState({
        success: true,
        data: values,
        href: '',
        errorCode: undefined,
      });
    } catch (error) {
      let errorCode = 'UNKNOWN_ERROR';

      if (axios.isAxiosError(error)) {
        errorCode = error.response?.data?.errorCode ?? 'UNKNOWN_AXIOS_ERROR';
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }

      setFormState({
        success: false,
        data: initialValues,
        href: '',
        errorCode,
      });
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    formState,
    isSubmitting: form.formState.isSubmitting,
  };
}
