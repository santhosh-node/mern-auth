import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpDTO, SignUpSchema } from '@/lib/validations/auth';
import { signUpAPI } from '@/lib/api/auth';
import axios from 'axios';

type FormNextHref = '/sign-up' | '/sign-in' | '/forgot-password' | '/' | '';

type FormState = {
  success: boolean;
  data: SignUpDTO;
  href: FormNextHref;
  errorCode?: string;
};

export function useSignUpForm(defaultValues?: Partial<SignUpDTO>) {
  const initialValues: SignUpDTO = {
    name: '',
    email: '',
    password: '',
    ...defaultValues,
  };

  const [formState, setFormState] = useState<FormState>({
    success: false,
    data: initialValues,
    href: '',
    errorCode: '',
  });

  const form = useForm<SignUpDTO>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: SignUpDTO) {
    try {
      console.log('SignUp Form Submitted:', values);
      await signUpAPI(values);
      setFormState({ success: true, data: values, href: '/', errorCode: '' });
    } catch (error) {
      let errorCode = '';

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
